import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('category/:category')
  async findByCategorie(@Param('category') category: string) {
    return await this.productService.findByCategory(category);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('seller/:seller')
  async findBySeller(@Param('seller') seller: string) {
    return await this.productService.findBySeller(seller);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch('id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete('id')
  async remove(@Param('id') id: number) {
    return await this.productService.remove(id);
  }
}

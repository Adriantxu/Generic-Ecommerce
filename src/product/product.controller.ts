import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { IdFromJwt } from 'src/middleware/middleware.id';
import { UserService } from 'src/user/user.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @IdFromJwt() id: number,
  ) {
    const user = await this.userService.findMe(id);
    if (+user.dataValues['role'] !== 0) {
      throw new BadRequestException(
        `This user with role ${user.dataValues['role']} cannot create products.`,
      );
    }
    return this.productService.create(createProductDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('category/:category')
  async findByCategorie(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async findBySeller(@IdFromJwt() id: number) {
    return this.productService.findBySeller(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @IdFromJwt() user_id: number,
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const products = await this.productService.findBySeller(user_id);
    const existsProd: boolean = products.some((product) => product.id == id);
    if (!existsProd) {
      throw new BadRequestException('Product does not exist');
    }
    return this.productService
      .update(id, updateProductDto)
      .then(() => this.productService.findBySeller(user_id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@IdFromJwt() user_id: number, @Param('id') id: number) {
    const products = await this.productService.findBySeller(user_id);
    const existsProd: boolean = products.some((product) => product.id == id);
    if (!existsProd) {
      throw new BadRequestException('Product does not exist');
    }
    return await this.productService.remove(id);
  }
}

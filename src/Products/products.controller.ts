import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./products.service";
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/role.enum";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { updateProductsDto } from "./Dto/productsDTO";

@ApiTags('Product')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOperation({ summary: 'Products list' })
    @ApiCreatedResponse({
        description: 'Products list',
        schema: {
            example: {
                "id": "32ec3181-3b1f-4843-9d96-56ab4d5143fa",
                "name": "Iphone 15",
                "description": "The best smartphone in the world",
                "price": "199.99",
                "stock": 12,
                "imgUrl": "https://example.com/default-image.jpg"
            }
        }
    })
    getProducts() {
        return this.productService.getProducts();
    }

    @Get('seeder')
    @ApiOperation({ summary: 'Add Products' })
    @ApiCreatedResponse({
        description: 'Add Products',
        schema: {
            example: {
                "message": "Productos agregados"
            }
        }
    })
    addProducts() {
        return this.productService.addProducts();
    }

    @Get(':id')
    @ApiOperation({ summary: 'product search by ID' })
    @ApiCreatedResponse({
        description: 'product search by ID',
        schema: {
            example: {
                "id": "32ec3181-3b1f-4843-9d96-56ab4d5143fa",
                "name": "Iphone 15",
                "description": "The best smartphone in the world",
                "price": "199.99",
                "stock": 12,
                "imgUrl": "https://example.com/default-image.jpg"
            }
        }
    })
    getProductsById(@Param('id') id: string) {
        return this.productService.getProductsById(id)
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    @Put(':id')
    @ApiOperation({ summary: 'Modify product' })
    @ApiOkResponse({
        description: 'Modified product',
        schema: {
            example: {
                "id": "32ec3181-3b1f-4843-9d96-56ab4d5143fa",
                "name": "Iphone 15",
                "description": "The best smartphone in the world",
                "price": "199.99",
                "stock": 12,
                "imgUrl": "https://example.com/default-image.jpg"
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Not Authorized',
        schema: {
            example: {
                "message": "Not Authorized",
                "error": "Unauthorized",
                "statusCode": 401
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'your request has incorrect parameters.',
        schema: {
            example: {
                "message": "Unexpected token \n in JSON at position 26",
                "error": "Bad Request",
                "statusCode": 400
            },
        },
    })
    updateProducts(@Param('id') id: string, @Body() updateProductsDto: updateProductsDto) {
        return this.productService.updateProducts(id, updateProductsDto)
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete product' })
    @ApiOkResponse({
        description: 'Deleted product',
        schema: {
            example: {
                "message": "Producto Eliminado"
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'your request has incorrect parameters.',
        schema: {
            example: {
                "message": "Unexpected token \n in JSON at position 26",
                "error": "Bad Request",
                "statusCode": 400
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: 'Not Authorized',
        schema: {
            example: {
                "message": "Not Authorized",
                "error": "Unauthorized",
                "statusCode": 401
            }
        }
    })
    @UseGuards(AuthGuard)
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id)
    }
}
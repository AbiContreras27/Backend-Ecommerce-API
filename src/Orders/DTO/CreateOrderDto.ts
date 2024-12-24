import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";


export class CreateOrderDto {

    @ApiProperty({
        type: String,
        description: "Esta propiedad es un string que asocia el usuario con la Orden",
        example: '54b246e6-ff01-4397-a11f-eb67e60a1673'
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        type: [String],
        minLength: 1,
        description: "El array debe de tener al menos 1 producto",
        example: [{ "id": "54b246e6-ff01-4397-a11f-eb67e60a1673" }]
    })
    @IsArray()
    @ArrayMinSize(1, { message: 'El array debe de tener al menos 1 producto' })
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[]
}

export class ProductDto {
    @IsUUID()
    id: string;

}
import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './Repository/file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileCloudinaryService {
    constructor(private fileUploadRepository: FileUploadRepository,
        @InjectRepository(Products) private productsRepository: Repository<Products>
    ) { }

    async uploadProductImage(file: Express.Multer.File, productId: string) {

        const product = await this.productsRepository.findOneBy({ id: productId })

        if (!product) {
            throw new NotFoundException('Producto no encontrado')
        }

        const uploadImage = await this.fileUploadRepository.uploadImage(file)

        await this.productsRepository.update(product.id, {
            imgUrl: uploadImage.secure_url,
        })

        return await this.fileUploadRepository.uploadImage(file);


    }
}

import { FileUploadRepository } from './Repository/file-upload.repository';
import { Products } from 'src/Entities/products.entity';
import { Repository } from 'typeorm';
export declare class FileCloudinaryService {
    private fileUploadRepository;
    private productsRepository;
    constructor(fileUploadRepository: FileUploadRepository, productsRepository: Repository<Products>);
    uploadProductImage(file: Express.Multer.File, productId: string): Promise<import("cloudinary").UploadApiResponse>;
}

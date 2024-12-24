import { FileCloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private readonly fileCloudinaryService;
    constructor(fileCloudinaryService: FileCloudinaryService);
    uploadImagen(productId: string, file: Express.Multer.File): Promise<import("cloudinary").UploadApiResponse>;
}

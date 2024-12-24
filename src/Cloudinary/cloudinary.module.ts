import { Module } from '@nestjs/common';
import { FileCloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryConfig } from '../config/cloudinary'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/Entities/products.entity';
import { FileUploadRepository } from './Repository/file-upload.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [CloudinaryController],
  providers: [FileCloudinaryService, CloudinaryConfig, FileUploadRepository],
})
export class CloudinaryModule { }

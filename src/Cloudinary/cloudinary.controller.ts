import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileCloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class CloudinaryController {
  constructor(private readonly fileCloudinaryService: FileCloudinaryService) { }

  @ApiBearerAuth()
  @Post('uploadImage/:productId')
  @ApiOperation({ summary: 'Add Files' })
  @ApiCreatedResponse({
    description: 'file added successfully',
    schema: {
      example: {
        "id": "1f452184-8889-4caa-989a-494e5b7a1e2c",
        "fullname": "Liam Moore",
        "username": "liammoore",
        "profile_image": "https://res.cloudinary.com/dz24lee3x/image/upload/v1734988502/hu44vzsmfgyrtd068nfu.png"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'User Not Found ',
    schema: {
      example: {
        "message": "User not found.",
        "error": "Not Found",
        "statusCode": 404
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Error: Bad Request',
    schema: {
      example: {
        "message": "File must be maximum 200kb",
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary', } } }
  })
  async uploadImagen(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024,
            message: 'Archivo admite maximo 200kb'
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/, })
        ],
      })

    ) file: Express.Multer.File,
  ) {
    return this.fileCloudinaryService.uploadProductImage(file, productId)
  }

}
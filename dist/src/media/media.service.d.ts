import { ConfigService } from '@nestjs/config';
import { SignUploadDto } from './dto/sign-upload.dto';
export declare class MediaService {
    private readonly config;
    constructor(config: ConfigService);
    generateSignedUrl(dto: SignUploadDto): Promise<{
        uploadUrl: string;
        signature: string;
        timestamp: number;
        apiKey: any;
        folder: string;
    }>;
    uploadFile(file: Express.Multer.File, folder: string): Promise<{
        imageUrl: string;
        publicId: string;
    }>;
    uploadMultipleFiles(files: Express.Multer.File[], folder: string): Promise<{
        imageUrl: string;
        publicId: string;
    }[]>;
    deleteFile(publicId: string): Promise<{
        deleted: string;
        result: string;
    }>;
    private validateFile;
    private uploadToCloudinary;
}

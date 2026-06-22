import { MediaService } from './media.service';
import { SignUploadDto } from './dto/sign-upload.dto';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    signUpload(dto: SignUploadDto): Promise<{
        uploadUrl: string;
        signature: string;
        timestamp: number;
        apiKey: any;
        folder: string;
    }>;
    uploadFile(file: Express.Multer.File, folder?: string): Promise<{
        imageUrl: string;
        publicId: string;
    }>;
    uploadMultiple(files: Express.Multer.File[], folder?: string): Promise<{
        imageUrl: string;
        publicId: string;
    }[]>;
    deleteFile(publicId: string): Promise<{
        deleted: string;
        result: string;
    }>;
    uploadBlogImage(file: Express.Multer.File): Promise<{
        imageUrl: string;
        publicId: string;
    }>;
}

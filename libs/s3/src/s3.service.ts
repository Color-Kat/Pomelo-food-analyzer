import {Injectable, NotFoundException, StreamableFile} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import {v4 as uuidv4} from 'uuid';
import {microserviceUrls} from "@app/config";

@Injectable()
export class S3Service {
    private s3Client: S3Client;
    private bucketName: string;

    constructor(private configService: ConfigService) {
        this.s3Client = new S3Client({
            endpoint: this.configService.get<string>('S3_ENDPOINT', ''),
            region: this.configService.get<string>('S3_REGION', 'auto'),
            credentials: {
                accessKeyId: this.configService.get<string>('S3_ACCESS_KEY', ''),
                secretAccessKey: this.configService.get<string>('S3_SECRET_KEY', ''),
            },
            forcePathStyle: true, // Important for MinIO compatibility
        });
        this.bucketName = this.configService.get<string>('S3_BUCKET_NAME', '');
    }

    /**
     * Upload a file to S3 bucket.
     * @param file - The file to upload.
     * @param pathPrefix - Optional prefix for the file path in the bucket (don't forget / for directory).
     */
    async uploadFile(
        file: Express.Multer.File,
        pathPrefix: string = '',
    ): Promise<{ filePath: string; url: string }> {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = `${pathPrefix}${fileName}`;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: filePath,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await this.s3Client.send(command);

        // const url = `${this.s3Client.config.bucketEndpoint}/${this.bucketName}/${filePath}`;
        const url = `${microserviceUrls.apiGateway}/storage/${filePath}`;
        return {filePath, url};
    }

    async getFileStream(filePath: string) {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: filePath,
        });

        const response = await this.s3Client.send(command);
        return new StreamableFile(
            response.Body as any,
            {
                type: response.ContentType || 'application/octet-stream',
                disposition: 'inline'
            }
        );
    };

    /**
     * Get a file from S3 bucket like bytes array.
     * @param filePath
     */
    // async getFile(filePath: string): Promise<Buffer> {
    //     const command = new GetObjectCommand({
    //         Bucket: this.bucketName,
    //         Key: filePath,
    //     });
    //
    //     const response = await this.s3Client.send(command);
    //     console.log(response.Body);
    //     const stream = response.Body as ReadableStream;
    //     return Buffer.from(await stream.transformToByteArray());
    // }

    async deleteFile(filePath: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: filePath,
        });

        await this.s3Client.send(command);
    }
}
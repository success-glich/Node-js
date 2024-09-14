import { v2 as cloudinary, ResourceType } from "cloudinary";
import fs from "node:fs";
import { config } from "../config/config";

cloudinary.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
});

type resourceType = "auto" | "image" | "video"

class CloudinaryService {

    private folder;
    private resourceType: resourceType;
    constructor(folder: string = config.cloudinaryFolder, resourceType: resourceType = "auto") {
        this.folder = folder;
        this.resourceType = resourceType;
    }

    async uploadFile(localFilePath: string) {
        if (!localFilePath) {
            console.log("No File path provided");
            return null;
        }
        try {
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: this.resourceType,
                folder: this.folder
            });
            console.log("File uploaded to cloudinary::", response.url);
            return response;
        } catch (err: any) {
            console.log("Error uploading file to cloudinary::", err.message);

            return null;
        } finally {
            await this.removeLocalFile(localFilePath);
        }

    }
    async removeFile(publicId: string): Promise<{ result: string } | null> {
        if (!publicId) {
            return null;
        }
        try {
            const result: { result: string } = await cloudinary.uploader.destroy(publicId);
            console.log("File removed from Cloudinary:", result);
            return result;
        } catch (error) {
            console.error("Error while removing file from Cloudinary:", error);
            return null;
        }
    }
    private async removeLocalFile(localFilePath: string) {
        try {
            fs.unlinkSync(localFilePath);
        } catch (err: any) {
            console.log("Error removing file from local storage::", err.message);
        }
    }

}

export default new CloudinaryService();
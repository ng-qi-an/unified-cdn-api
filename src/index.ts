import deleteGrantCode from "./methods/deleteGrantCode.js";
import deleteFile from "./methods/deleteFile.js";
import deleteFiles from "./methods/deleteFiles.js";
import generateGrantCode from "./methods/generateGrantCode.js";
import getFileContent from "./methods/getFileContent.js";
import getFileDetails from "./methods/getFileDetails.js";
import getFiles from "./methods/getFiles.js";
import renameFile from "./methods/renameFile.js";
import uploadFiles from "./methods/uploadFiles.js";
import { apiRequest, apiRequestData } from "./request.js";

export class UnifiedCDN {
    readonly apiKey: string;
    readonly apiUrl: string;
    constructor (private readonly options?: {apiKey?: string, apiUrl?: string}) {
        const apiKey = this.options?.apiKey || process.env.UNIFIED_CDN_API_KEY;
        const apiUrl = this.options?.apiUrl || process.env.UNIFIED_CDN_API_URL;
        if (!apiUrl || !apiKey) {
            throw new Error("API key API URL are required");
        }
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }
    async request(path: string, options: RequestInit = {}) {
        return apiRequest(this, path, options);
    }
    async requestData(path: string, options: RequestInit = {}) {
        return apiRequestData(this, path, options);
    }
    async uploadFiles(files: File[]) {
        return uploadFiles(files, this);
    }
    async deleteFiles(fileIds: string[]) {
        return deleteFiles(fileIds, this);
    }
    async getFiles(fileIds: string[]) {
        return getFiles(fileIds, this);
    }
    async getFileDetails(fileId: string) {
        return getFileDetails(fileId, this);
    }
    async getFileContent(fileId: string) { 
       return getFileContent(fileId, this);
    }
    async renameFile(fileId: string, newName: string) {
        return renameFile(fileId, newName, this);
    }
    async deleteFile(fileId: string) {
        return deleteFile(fileId, this);
    }
    async generateGrantCode(action: string, data: Record<string, any>, expiresIn: number) {
        return generateGrantCode(action, data, expiresIn, this);
    }
    async deleteGrantCode(codeId: string) {
        return deleteGrantCode(codeId, {apiUrl: this.apiUrl, code: codeId});
    }
}


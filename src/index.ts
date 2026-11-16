import deleteFile from "./methods/deleteFile.js";
import deleteFiles from "./methods/deleteFiles.js";
import getFileContent from "./methods/getFileContent.js";
import getFileDetails from "./methods/getFileDetails.js";
import getFiles from "./methods/getFiles.js";
import renameFile from "./methods/renameFile.js";
import uploadFiles from "./methods/uploadFiles.js";
import { request, requestData } from "./request.js";

export class UnifiedCDN {
    private readonly apiKey: string;
    readonly apiUrl: string;
    constructor (private readonly options: {apiKey: string, apiUrl: string}) {
        this.apiKey = this.options.apiKey;
        this.apiUrl = this.options.apiUrl;
    }
    async request(path: string, options: RequestInit = {}) {
        return request(this.apiUrl, this.apiKey, path, options);
    }
    async requestData(path: string, options: RequestInit = {}) {
        return requestData(this.apiUrl, this.apiKey, path, options);
    }
    async upload(files: File[]) {
        return uploadFiles(this, files);
    }
    async delete(fileIds: string[]) {
        return deleteFiles(this, fileIds);
    }
    async get(fileIds: string[]) {
        return getFiles(this, fileIds);
    }
    async getFileDetails(fileId: string) {
        return getFileDetails(this, fileId);
    }
    async getFileContent(fileId: string) { 
       return getFileContent(this, fileId);
    }
    async renameFile(fileId: string, newName: string) {
        return renameFile(this, fileId, newName);
    }
    async deleteFile(fileId: string) {
        return deleteFile(this, fileId);
    }
}


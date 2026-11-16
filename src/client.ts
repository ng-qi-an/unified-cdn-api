import { UnifiedCDNClientGrantCode } from "./classes.js";
import deleteFile from "./methods/deleteFile.js";
import deleteFiles from "./methods/deleteFiles.js";
import deleteGrantCode from "./methods/deleteGrantCode.js";
import getFileDetails from "./methods/getFileDetails.js";
import getFiles from "./methods/getFiles.js";
import renameFile from "./methods/renameFile.js";
import uploadFiles from "./methods/uploadFiles.js";
import type { RawUnifiedCDNGrantCode } from "./types.js";

export class UnifiedCDNClient {
    readonly apiUrl: string;
    readonly baseUrl: string;
    constructor (private readonly options?: {apiUrl: string, baseUrl?: string}) {
        const apiUrl = this.options?.apiUrl || process.env.UNIFIED_CDN_API_URL;
        const baseUrl = this.options?.baseUrl || "/api";
        if (!apiUrl) {
            throw new Error("API key API URL are required");
        }
        this.apiUrl = apiUrl;
        this.baseUrl = baseUrl;
    }
    async generateGrantCode(action: string) {
        const response = await fetch(`${this.baseUrl}/grant-codes/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ action })
        })
        if (!response.ok) {
            try {
                const errorData = await response.json();
                throw new Error(`Failed to generate grant code: ${errorData.message || 'Unknown error'}`);
            } catch (e) {
                throw new Error(`Failed to generate grant code: ${response.statusText}`);
            }
        }
        const responseData: RawUnifiedCDNGrantCode = await response.json();
        return new UnifiedCDNClientGrantCode(responseData as RawUnifiedCDNGrantCode, this.apiUrl);
    }
    async deleteGrantCode(codeId: string) {
        return deleteGrantCode(codeId, {apiUrl: this.apiUrl, code: codeId});
    }
    async uploadFiles(files: File[]) {
        const code = await this.generateGrantCode("UPLOAD_FILES");
        return uploadFiles(files, {apiUrl: this.apiUrl, code: code.code});
    }
    async deleteFiles(fileIds: string[]) {        
        const code = await this.generateGrantCode("DELETE_FILES");
        return deleteFiles(fileIds, {apiUrl: this.apiUrl, code: code.code});
    }
    async getFiles(fileIds: string[]) {
        const code = await this.generateGrantCode("GET_FILES");
        return getFiles(fileIds, {apiUrl: this.apiUrl, code: code.code});
    }
    async getFileDetails(fileId: string) {
        const code = await this.generateGrantCode("GET_FILE");
        return getFileDetails(fileId, {apiUrl: this.apiUrl, code: code.code});
    }
    async renameFile(fileId: string, newName: string) {
        const code = await this.generateGrantCode("RENAME_FILE");
        return renameFile(fileId, newName, {apiUrl: this.apiUrl, code: code.code});
    }
    async deleteFile(fileId: string) {
        const code = await this.generateGrantCode("DELETE_FILE");
        return deleteFile(fileId, {apiUrl: this.apiUrl, code: code.code});
    }
}


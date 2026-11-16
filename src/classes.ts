import deleteFile from "./methods/deleteFile.js";
import deleteFiles from "./methods/deleteFiles.js";
import deleteGrantCode from "./methods/deleteGrantCode.js";
import getFileContent from "./methods/getFileContent.js";
import getFileDetails from "./methods/getFileDetails.js";
import getFiles from "./methods/getFiles.js";
import renameFile from "./methods/renameFile.js";
import uploadFiles from "./methods/uploadFiles.js";
import type { FlexibleAPI, RawUnifiedCDNFile, RawUnifiedCDNGrantCode } from "./types.js";

export class UnifiedCDNFile {
    public readonly id: string;
    public readonly name: string;
    public readonly viewUrl: string;
    public readonly contentType: string;
    public readonly size: number;
    public readonly expiresAt: Date | null;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    public readonly details: RawUnifiedCDNFile;

    constructor (private readonly options: RawUnifiedCDNFile, private readonly api: FlexibleAPI) {
        this.id = this.options.id;
        this.name = this.options.name;
        this.viewUrl = `${this.api?.apiUrl || process.env.UNIFIED_CDN_API_URL}/files/${this.options.id}/view`;
        this.contentType = this.options.contentType;
        this.size = this.options.size;
        this.expiresAt = this.options.expiresAt ? new Date(this.options.expiresAt) : null;
        this.createdAt = new Date(this.options.createdAt);
        this.updatedAt = new Date(this.options.updatedAt);
        this.details = this.options;
    }
    async rename(newName: string) {
        return renameFile(this.id, newName, this.api);
    }
    async delete(){
        return deleteFile(this.id, this.api);
    }
    async getContent() {
        return getFileContent(this.id, this.api);
    }
}

export class UnifiedCDNClientGrantCode {
    public readonly code: string;
    public readonly action: string;
    public readonly data: Record<string, any>;
    public readonly expiresAt: Date;
    public readonly createdAt: Date;
    public readonly details: RawUnifiedCDNGrantCode;

    constructor (private readonly options: RawUnifiedCDNGrantCode, private readonly apiUrl: string) {
        this.code = this.options.code;
        this.action = this.options.action;
        this.data = this.options.data;
        this.expiresAt = new Date(this.options.expiresAt);
        this.createdAt = new Date(this.options.createdAt);
        this.details = this.options;
    }
    async delete(){
        return deleteGrantCode(this.code, {apiUrl: this.apiUrl, code: this.code});
    }
    async uploadFiles(files: File[]) {
        return uploadFiles(files, {apiUrl: this.apiUrl, code: this.code});
    }
    async deleteFiles(fileIds: string[]) {
        return deleteFiles(fileIds, {apiUrl: this.apiUrl, code: this.code});
    }
    async getFiles(fileIds: string[]) {
        return getFiles(fileIds, {apiUrl: this.apiUrl, code: this.code});
    }
    async getFileDetails(fileId: string) {
        return getFileDetails(fileId, {apiUrl: this.apiUrl, code: this.code});
    }
    async renameFile(fileId: string, newName: string) {
        return renameFile(fileId, newName, {apiUrl: this.apiUrl, code: this.code});
    }
    async deleteFile(fileId: string) {
        return deleteFile(fileId, {apiUrl: this.apiUrl, code: this.code});
    }
}
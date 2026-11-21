import deleteGrantCode from "./methods/deleteGrantCode.js";
import uploadFiles from "./methods/uploadFiles.js";
import type { RawUnifiedCDNGrantCode, UnifiedCDNFileJSON } from "./types.js";

export class UnifiedCDNClient {
    readonly apiUrl: string;
    readonly baseUrl: string;
    constructor (private readonly options?: {apiUrl?: string, baseUrl?: string}) {
        const apiUrl = this.options?.apiUrl || process.env.UNIFIED_CDN_API_URL || process.env.NEXT_PUBLIC_UNIFIED_CDN_API_URL;
        const baseUrl = this.options?.baseUrl || "/api/unified-cdn";
        if (!apiUrl) {
            throw new Error("API URL is required");
        }
        this.apiUrl = apiUrl;
        this.baseUrl = baseUrl;
    }
    async deleteGrantCode(codeId: string) {
        return deleteGrantCode(codeId, {apiUrl: this.apiUrl, code: codeId});
    }
    async uploadFiles(files: File[], customRouteBody: Record<string, any> = {}): Promise<{uploads: UnifiedCDNFileJSON[], failed: {filename: string, reason: string}[]}> {
        if (!this.baseUrl){
            throw new Error("Base URL is required for client upload. This should correspond to the API route of the Unified CDN handler you've attached.");
        }
        const response = await fetch(`${this.baseUrl}/client/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileCount: files.length,
                ...customRouteBody
            })
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to generate grant code: ${response.status} ${response.statusText}`);
        }
        const code: RawUnifiedCDNGrantCode = await response.json();
        const uploadResponse = await uploadFiles(files, {apiUrl: this.apiUrl, code: code.code});
        return {uploads: uploadResponse.uploads.map((file)=> file.toJSON()), failed: uploadResponse.failed};
    }
}


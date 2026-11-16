import { APIError, UnknownError } from "../errors.js";
import { apiRequest } from "../request.js";
import type { FlexibleAPI } from "../types.js";

export default async function getFileContent(fileId: string, api: FlexibleAPI) {
    try {
        const response = await apiRequest(api, `/files/${fileId}/view`, {
            method: "GET",
        });
        const blob = await response.blob();
        const contentType = response.headers.get("content-type") || blob.type || "application/octet-stream";
        const disposition = response.headers.get("content-disposition");
        let filename = fileId;
        if (disposition) {
            const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
            const quotedMatch = disposition.match(/filename="([^"]+)"/i);
            const bareMatch = disposition.match(/filename=([^;]+)/i);
            const raw = utf8Match?.[1] ?? quotedMatch?.[1] ?? bareMatch?.[1];
            if (raw) {
                try {
                    filename = decodeURIComponent(raw.trim());
                } catch {
                    filename = raw.trim();
                }
            }
        }
        return new File([blob], filename, { type: contentType });
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        } else if (error instanceof Error) {
            throw new UnknownError(`An unknown error occurred: ${error.message}`);
        } else {
            throw new UnknownError('An unknown error occurred. No message is available.');
        }
    }
}
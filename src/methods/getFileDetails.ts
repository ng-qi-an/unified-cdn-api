import type { UnifiedCDN } from "../index.js";
import type { RawUnifiedCDNFile } from "../types.js";

export default async function getFileDetails(ucdn: UnifiedCDN, fileId: string) {
    const data = await ucdn.requestData(`/files/${fileId}/get`, {
        method: "GET",
    })
    return data as RawUnifiedCDNFile;
}
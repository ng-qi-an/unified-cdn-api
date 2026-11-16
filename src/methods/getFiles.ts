import { UnifiedCDNFile } from "../classes.js";
import type { UnifiedCDN } from "../index.js";
import type { RawUnifiedCDNFile } from "../types.js";

export default async function getFiles(ucdn: UnifiedCDN, fileIds: string[]) {
    const data = await ucdn.requestData(`/files/get?ids=${fileIds.map((uri)=> encodeURIComponent(uri)).join(",")}`, {
        method: "GET",
    })
    return data.files.map((file: RawUnifiedCDNFile)=> new UnifiedCDNFile({...file}, ucdn)) as UnifiedCDNFile[];
}
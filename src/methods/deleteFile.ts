import type { UnifiedCDN } from "../index.js";

export default async function deleteFile(ucdn: UnifiedCDN, fileId: string) {
    const data = await ucdn.requestData(`/files/${fileId}/delete`, {
        method: "DELETE",
    })
    return data;
}
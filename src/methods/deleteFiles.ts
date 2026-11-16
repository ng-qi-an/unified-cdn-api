import type { UnifiedCDN } from "../index.js";

export default async function deleteFiles(ucdn: UnifiedCDN, fileIds: string[]) {
    const data = await ucdn.requestData(`/files/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ files: fileIds })
    })
    return { deleted: data.deleted as string[], failed: data.failed as {id: string, reason: string}[]};
}
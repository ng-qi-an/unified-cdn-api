import type { UnifiedCDN } from "../index.js";

export default async function renameFile(ucdn: UnifiedCDN, fileId: string, newName: string) {
    const data = await ucdn.requestData(`/files/${fileId}/rename`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newName })
    })
    return (data as {newName: string}).newName;
}
import { apiRequestData } from "../request.js";
import type { FlexibleAPI } from "../types.js";

export default async function deleteFiles(fileIds: string[], api: FlexibleAPI) {
    const data = await apiRequestData(api, `/files/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ files: fileIds })
    })
    return { deleted: data.deleted as string[], failed: data.failed as {id: string, reason: string}[]};
}
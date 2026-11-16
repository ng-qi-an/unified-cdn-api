import { apiRequestData } from "../request.js";
import type { FlexibleAPI } from "../types.js";


export default async function renameFile(fileId: string, newName: string, api: FlexibleAPI) {
    const data = await apiRequestData(api, `/files/${fileId}/rename`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newName })
    })
    return (data as {newName: string}).newName;
}
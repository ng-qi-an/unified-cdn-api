import { apiRequestData } from "../request.js";
import type { FlexibleAPI } from "../types.js";

export default async function deleteFile(fileId: string, api: FlexibleAPI) {
    const data = await apiRequestData(api, `/files/${fileId}/delete`, {
        method: "DELETE",
    })
    return data;
}
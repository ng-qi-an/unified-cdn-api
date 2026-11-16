import { apiRequestData } from "../request.js";
import type { FlexibleAPI, RawUnifiedCDNFile } from "../types.js";

export default async function getFileDetails(fileId: string, api: FlexibleAPI) {
    const data = await apiRequestData(api, `/files/${fileId}/get`, {
        method: "GET",
    })
    return data as RawUnifiedCDNFile;
}
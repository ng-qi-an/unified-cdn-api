import { UnifiedCDNFile } from "../classes.js";
import { apiRequestData } from "../request.js";
import type { FlexibleAPI, RawUnifiedCDNFile } from "../types.js";


export default async function getAllFiles(api: FlexibleAPI) {
    const data = await apiRequestData(api, `/files/get`, {
        method: "GET",
    })
    return data.files.map((file: RawUnifiedCDNFile)=> new UnifiedCDNFile({...file}, api)) as UnifiedCDNFile[];
}
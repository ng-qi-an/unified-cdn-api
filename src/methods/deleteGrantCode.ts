import { apiRequest } from "../request.js";
import type { FlexibleAPI } from "../types.js";

export default async function deleteGrantCode(code: string, api: {apiUrl: string, code: string}) {
    const data = await apiRequest(api, `/codes/${code}/delete`, {
        method: "DELETE",
        headers: {
            "Authorization": `Code ${code}`
        }
    })
    return data;
}
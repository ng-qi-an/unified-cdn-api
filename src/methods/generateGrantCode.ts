import { apiRequestData } from "../request.js";
import type { RawUnifiedCDNGrantCode } from "../types.js";

export default async function generateGrantCode(action: string, data: Record<string, any>, expiresIn: number | undefined, api: {apiUrl: string, apiKey: string}) {
    const response: RawUnifiedCDNGrantCode = await apiRequestData(api, `/grant-codes/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ action, data, expiresIn })
    })
    return response;
}
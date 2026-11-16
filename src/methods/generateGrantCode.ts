import { apiRequestData } from "../request.js";
import type { FlexibleAPI, RawUnifiedCDNGrantCode } from "../types.js";

export default async function generateGrantCode(action: string, data: Record<string, any>, expiresIn: number, api: {apiUrl: string, apiKey: string}) {
    if (!api) {
        throw new Error("api is required to construct a UnifiedCDNGrantCode");
    }
    const response: RawUnifiedCDNGrantCode = await apiRequestData(api, `/grant-codes/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ action, data, expiresIn })
    })
    return response;
}
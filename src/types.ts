import type { UnifiedCDNClient } from "./client.js";
import type { UnifiedCDN } from "./index.js";

export type FlexibleAPI = { apiUrl: string, apiKey?: string, code?: string } | undefined;

export type RawUnifiedCDNFile = {
    id: string,
    applicationId: string,
    databaseId: string,
    key: string,
    name: string,
    contentType: string,
    size: number,
    expiresAt: string | null,
    createdAt: string,
    updatedAt: string,
}

export type RawUnifiedCDNGrantCode = {
    code: string,
    action: string,
    data: Record<string, any>,
    applicationId: string,
    apiKeyId: string,
    expiresAt: string,
    createdAt: string,
}
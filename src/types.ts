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

export type UnifiedCDNFileJSON = {
    id: string,
    viewUrl: string,
    name: string,
    contentType: string,
    size: number,
    expiresAt: Date | null,
    createdAt: Date,
    updatedAt: Date,
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


export type NextUnifiedCDNHandlerOptions = {
    client?: {
        uploads?: {
            before?: (req: Request) => Promise<Response | void> | Response | void,
            data?: {maximumFileSize?: number, maximumTotalSize?: number, allowedFileTypes?: string[]},
            calculateFileCount?: (fileCount: number) => number,
            expiresIn?: number
        }
    }
}
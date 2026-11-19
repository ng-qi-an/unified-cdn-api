import { APIError, InvalidConfigurationError } from "../../errors.js";
import type { UnifiedCDN } from "../../index.js";
import generateGrantCode from "../generateGrantCode.js";

type NextUnifiedCDNHandlerOptions = {
    client?: {
        uploads?: {
            before?: (req: Request) => Promise<Response | void> | Response | void,
            data?: {maximumFileSize?: number, maximumTotalSize?: number, allowedFileTypes?: string[]},
            calculateFileCount?: (fileCount: number) => number,
            expiresIn?: number
        }
    }
}
export function toNextHandler(unifiedCDN: UnifiedCDN, options: NextUnifiedCDNHandlerOptions): (req: Request, {params}: {params: Promise<{all: string[]}>})=> Promise<Response> {
    return async (req: Request, {params}: {params: Promise<{all: string[]}>}) => {
        const { all } = await params;
        if (all.at(0) == "client" && all.at(1) == "upload"){
            const before = options?.client?.uploads?.before && await options.client.uploads.before(req.clone());
            if (before instanceof Response) {
                return before;
            }
            try {
                const data = await req.json();
                let fileCount = data.fileCount;
                if (typeof fileCount !== "number" || fileCount < 1) {
                    return Response.json({message: "Invalid file count", error: "InvalidConfiguration"}, {status: 400});
                }
                try {
                    if (options?.client?.uploads?.calculateFileCount){
                        fileCount = options.client.uploads.calculateFileCount(data.fileCount);
                    }
                } catch (error) {
                    console.error("Error in calculating file count:", error);
                    if (error instanceof Error) {
                        return Response.json({message: error.message, error: error.name}, {status: 500});
                    }
                    return Response.json({message: "Unknown error in calculating file count", error: "InternalError"}, {status: 500});
                }
                const code = await generateGrantCode("UPLOAD_FILES", {
                    fileCount,
                    ...(options?.client?.uploads?.data || {})
                }, options.client?.uploads?.expiresIn, unifiedCDN)
                return Response.json(code, {status: 200});
            } catch (error){
                console.error("Error in generating client upload grant code:", error);
                if (error instanceof APIError) {
                    return Response.json({message: error.message, error: error.name}, {status: error.status_code});
                } else if (error instanceof Error) {
                    return Response.json({message: error.message, error: error.name}, {status: 500});
                } else {
                    return Response.json({message: "Unknown error", error: "UnknownError"}, {status: 500});
                }
            }
        } else {
            return Response.json({message: "Not Found", error: "NotFound"}, {status: 404});
        }        
    }
}
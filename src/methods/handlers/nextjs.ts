import { APIError, InvalidConfigurationError } from "../../errors.js";
import type { UnifiedCDN } from "../../index.js";

type GrantCodeHandlerOptions = {
    before?: (req: Request) => Promise<Response | void> | Response | void,
    actions: Record<string, {data: (req: Request) => Promise<Record<string, any>> | Record<string, any>, expiresIn: number}>,
}

export function toGrantCodeHandler(unifiedCDN: UnifiedCDN, options: GrantCodeHandlerOptions): (req: Request)=> Promise<Response> {
    return async (req: Request) => {
        const before = options.before && await options.before(req);
        if (before instanceof Response) {
            return before;
        }
        try {
            const { action } = await req.json();
            if (!action || typeof action !== "string") {
                throw new InvalidConfigurationError("Action is required and must be a string");
            }
            if (!options.actions[action]) {
                throw new InvalidConfigurationError(`Action ${action} is not configured`);
            }
            return await unifiedCDN.requestData("/codes/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action,
                    data: await options.actions[action].data(req),
                    expiresIn: options.actions[action].expiresIn
                })
            })
        } catch (error){
            console.error("Error in toGrantCodeHandler:", error);
            if (error instanceof APIError) {
                return Response.json({message: error.message, error: error.name}, {status: error.status_code});
            } else if (error instanceof Error) {
                return Response.json({message: error.message, error: error.name}, {status: 500});
            } else {
                return Response.json({message: "Unknown error", error: "UnknownError"}, {status: 500});
            }
        }
    }
}
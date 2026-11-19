import { APIError, InsufficientPermissionsError, InvalidConfigurationError, NotFoundError, RateLimitedError, UnauthorisedError, UnknownError } from "./errors.js";
import type { FlexibleAPI } from "./types.js";

export async function request(api: {apiUrl: string, apiKey: string | undefined, code: string | undefined}, path: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${api.apiUrl}/api${path}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: api.apiKey ? `Bearer ${api.apiKey}` : api.code ? `Code ${api.code}` : '',
            },
        });
        if (!response.ok) {
            let errorData: {error?: string, message?: string} | null = null;
            try {
                errorData = await response.json();
            } catch (e) {
                throw new UnknownError('An error occurred while fetching the error data.');
            }
            const errorMessage = errorData?.message || 'An error occurred';
            if (response.status === 401) {
                throw new UnauthorisedError(errorMessage);
            } else if (response.status === 403) {
                throw new InsufficientPermissionsError(errorMessage);
            } else if (response.status === 429){
                console.log("Error data", errorData);
                throw new RateLimitedError(errorMessage, (errorData as any)?.retryIn || 0);
            } else if (response.status === 404) {
                throw new NotFoundError(errorMessage);
            } else if (response.status === 400) {
                throw new InvalidConfigurationError(errorMessage);
            } else {
                throw new UnknownError(errorMessage);
            }
        }
        return response;
    } catch (error) {
        if (error instanceof APIError){
            throw error
        } else if (error instanceof Error){
            throw new UnknownError(`An unknown error occurred: ${error.message}`);
        } else {
            throw new UnknownError('An unknown error occurred. No message is available.');
        }
    }
}

export async function apiRequest(api: FlexibleAPI, path: string, options: RequestInit = {}) {
    const apiUrl = api?.apiUrl || process.env.UNIFIED_CDN_API_URL;
    const apiKey = api?.apiKey || process.env.UNIFIED_CDN_API_KEY;
    const code = api?.code;
    if (!apiUrl) {
        throw new InvalidConfigurationError('API URL is not provided. Please provide it either in the constructor or as an environment variable.');
    }
    if (!code && !apiKey) {
        throw new InvalidConfigurationError('Either an API Key or a Grant Code must be provided.');
    }
    return request({ apiUrl, apiKey, code }, path, options);
}
export async function apiRequestData(api: FlexibleAPI, path: string, options: RequestInit = {}) {
    try {
        const response = await apiRequest(api, path, options);
        return await response.json();
    } catch (error) {
        if (error instanceof APIError){
            throw error
        } else if (error instanceof Error){
            throw new UnknownError(`An unknown error occurred: ${error.message}`);
        } else {
            throw new UnknownError('An unknown error occurred. No message is available.');
        }
    }
}

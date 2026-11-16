import { APIError, InsufficientPermissionsError, InvalidConfigurationError, NotFoundError, UnauthorisedError, UnknownError } from "./errors.js";

export async function request(apiUrl: string, apiKey: string, path: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${apiUrl}/api${path}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${apiKey}`,
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
export async function requestData(apiUrl: string, apiKey: string, path: string, options: RequestInit = {}) {
    try {
        const response = await request(apiUrl, apiKey, path, options);
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

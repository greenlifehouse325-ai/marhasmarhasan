/**
 * API Client for Backend Communication
 * 
 * This module provides a configured fetch wrapper for making requests
 * to the NestJS backend API with proper error handling.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: 'include', // Include cookies for auth
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
                response.status,
                response.statusText,
                errorData.message || 'An error occurred'
            );
        }

        // Handle empty response
        const text = await response.text();
        return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new Error('Network error: Unable to connect to server');
    }
}

/**
 * API Methods
 */
export const api = {
    /**
     * GET request
     */
    get: <T>(endpoint: string, options?: RequestInit) =>
        fetchApi<T>(endpoint, { ...options, method: 'GET' }),

    /**
     * POST request
     */
    post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
        fetchApi<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }),

    /**
     * PUT request
     */
    put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
        fetchApi<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        }),

    /**
     * PATCH request
     */
    patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
        fetchApi<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        }),

    /**
     * DELETE request
     */
    delete: <T>(endpoint: string, options?: RequestInit) =>
        fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api;

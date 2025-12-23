
import { useCallback, useEffect, useState } from "react";
import Constants from "expo-constants";

// Production API URL
// This points to the live Vercel backend
const getBaseUrl = () => {
    // For production (APK/Preview builds), always use the live server
    return "https://uber-clone-e2w1.vercel.app";
};

const BASE_URL = getBaseUrl();

console.log("🔗 API Base URL:", BASE_URL); // Debug log to verify the URL

export const fetchAPI = async (url: string, options?: RequestInit) => {
    try {
        // Construct full URL by prepending BASE_URL if url is a path
        const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

        const response = await fetch(fullUrl, options);
        if (!response.ok) {
            // Try to parse error message from server
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorBody = await response.json();
                if (errorBody.error) {
                    errorMessage = errorBody.error;
                }
            } catch (e) {
                // If parsing JSON fails, fall back to status text
                console.error("Failed to parse error response", e);
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchAPI(url, options);
            setData(result.data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

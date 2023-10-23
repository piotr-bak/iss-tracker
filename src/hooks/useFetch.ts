import { useEffect, useState } from "react";
import serverErrorCodes from "../utils/serverErrorCodes.ts";

type FetchArguments = {
    url: string;
    options?: RequestInit;
    logErrors: boolean;
};
type FetchResult<T> = {
    data: T | undefined;
    isError: boolean;
    isLoading: boolean;
};
export function useFetch<T>({
    url,
    options,
    logErrors = true,
}: FetchArguments): FetchResult<T> {
    const [data, setData] = useState<string | undefined>(undefined);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setData(undefined);
        setIsError(false);

        const controller = new AbortController();

        (async () => {
            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                    ...options,
                });
                if (!response.ok) {
                    const message = `Invalid server response. Error ${
                        response.status
                    }: ${serverErrorCodes.get(response.status)}`;
                    throw new Error(message);
                } else {
                    //expects a plain text here (and not JSON) because TLE orbital data
                    //is provided as a plain text
                    const text = await response.text();
                    setData(text);
                }
            } catch (error) {
                if (error instanceof Error) {
                    if ("AbortError" === error.name) return;
                    setIsError(true);
                    if (logErrors) console.error(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();
        return () => controller.abort();
    }, [url]);

    return { data, isError, isLoading };
}

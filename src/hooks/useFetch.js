import { useEffect, useState } from 'react';
import serverErrorCodes from '../utils/serverErrorCodes';

export function useFetch (url, options, logErrors = true) {
  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setData(undefined);
    setIsError(false);

    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(url, { signal: controller.signal, ...options });
        if (!response.ok) {
          const message = `Invalid server response. Error ${response.status}: ${serverErrorCodes.get(response.status)}`;
          throw new Error(message);
        } else {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        if ("AbortError" === error.name) return;
        setIsError(true);
        if (logErrors) console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort();
  }, [url])

  return { data, isError, isLoading }
}

import {useCallback, useEffect, useState} from 'react';

type PollingOptions = {
    interval: number;
    onError?: (error: Error) => void;
};

type PollingResult<Data> = {
    data: Data | null;
    loading: boolean;
    error: Error | null;
};

function usePolling<Data>(
    callback: () => Promise<Data>,
    options: PollingOptions
): PollingResult<Data> {
    const { interval, onError } = options;
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const onErrorCallback = onError && useCallback(onError, []);
    const memoizedCallback = useCallback(callback, []);

    useEffect(() => {
        async function pollData() {
            try {
                const result = await memoizedCallback();
                setData(result);
                setError(null);
            } catch (err) {
                if(err instanceof Error) {
                    setError(err);
                    if (onErrorCallback) {
                        onErrorCallback(err);
                    }
                }
            } finally {
                setLoading(false);
            }
        }

        const pollInterval = setInterval(pollData, interval);

        pollData(); // Call immediately when hook is first used.

        return () => {
            clearInterval(pollInterval);
        };
    }, [memoizedCallback, interval, onErrorCallback]);

    return { data, loading, error };
}

export default usePolling;

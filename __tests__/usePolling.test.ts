/**
 * @jest-environment jsdom
 */
import { renderHook} from '@testing-library/react-hooks';
import usePolling from '../index';


describe('usePolling', () => {
    it('should declare and use the usePolling hook', async () => {

        const { result, waitForNextUpdate } = renderHook(() =>
            usePolling<string>(async () => 'Test Data', { interval: 1000 })
        );

        await waitForNextUpdate();

        expect(result.current.data).toBe('Test Data');
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);

    });

    it('should pass and execute the error callback', async () => {
        const errorCallback = jest.fn();

        const { result, waitForNextUpdate } = renderHook(() =>
            usePolling<string>(
                async () => {
                    throw new Error('Test Error');
                },
                {
                    interval: 1000,
                    onError: errorCallback,
                }
            )
        );

        // Wait for the error callback to be executed
        await waitForNextUpdate();
        expect(result.current.data).toBe(null);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toEqual(new Error('Test Error'));

        // Ensure the error callback was executed
        expect(errorCallback).toHaveBeenCalledWith(new Error('Test Error'));
    });
});

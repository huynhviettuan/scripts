import { APIResponse, Response } from 'playwright-core';
import { BrowserInstance } from 'src/common/browser';

export async function syncForEach<T, R>(
    iterable: T[],
    callback: (item: T, index: number, iterable: T[]) => Promise<R>
): Promise<R[]> {
    const results: R[] = [];
    for (let index = 0; index < iterable.length; index++) {
        const result = await callback(iterable[index], index, iterable);
        results.push(result);
    }
    return results;
}

export async function asyncForEach<T, R>(
    iterable: T[],
    callback: (item: T, index: number, iterable: T[]) => Promise<R>
): Promise<R[]> {
    const promises = iterable.map((item, index, array) => callback(item, index, array));
    return Promise.all(promises);
}

export async function resolveAll<T extends readonly unknown[]>(
    promises: [...T]
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> {
    return Promise.all(promises);
}

export async function fetchJsonResponse<T>(fetchPromiseResponse: { response: APIResponse }): Promise<T> {
    const { response } = fetchPromiseResponse;
    return (await response.json()) as T;
}

export async function fetchInterceptedJsonResponse<T>(response: Response): Promise<T> {
    return (await response.json()) as T;
}

export async function waitForResponse(url: string, timeout?: number): Promise<Response> {
    const regex = new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return await BrowserInstance.currentPage.waitForResponse((response) => regex.test(response.url()), {
        timeout
    });
}

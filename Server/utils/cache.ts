import { GraphValue } from "../actions/useraction";

interface CachedData {
    timestamp: number;
    data: GraphValue[];
}

const cache = new Map<string, CachedData>();
const CACHE_TTL = 60 * 1000; // 1 minute cache TTL

export function getFromCache(userId: string): GraphValue[] | null {
    const cachedData = cache.get(userId);
    if (!cachedData) return null;

    // Check if cache is still valid
    if (Date.now() - cachedData.timestamp > CACHE_TTL) {
        cache.delete(userId);
        return null;
    }

    return cachedData.data;
}

export function setToCache(userId: string, data: GraphValue[]): void {
    cache.set(userId, {
        timestamp: Date.now(),
        data
    });
}

export function clearCache(userId?: string): void {
    if (userId) {
        cache.delete(userId);
    } else {
        cache.clear();
    }
}

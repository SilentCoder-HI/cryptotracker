import { GraphValue } from "../actions/useraction";

interface CacheItem {
    value: any;
    expiry: number;
}

const cache: Record<string, CacheItem> = {};

export function setCache(key: string, value: any, ttl: number) {
    const expiry = Date.now() + ttl;
    cache[key] = { value, expiry };
}

export function getCache(key: string) {
    const item = cache[key];
    if (item && item.expiry > Date.now()) {
        return item.value;
    }
    delete cache[key]; // Remove expired item
    return null;
}

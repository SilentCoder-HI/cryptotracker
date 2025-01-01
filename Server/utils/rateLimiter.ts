interface RateLimitData {
    count: number;
    lastRequest: number;
}

const rateLimitStore = new Map<string, RateLimitData>();
const RATE_LIMIT = 100; // Max requests per window
const WINDOW_SIZE = 60 * 1000; // 1 minute window

export function checkRateLimit(userId: string): { allowed: boolean, remaining: number } {
    const currentTime = Date.now();
    const userData = rateLimitStore.get(userId) || { count: 0, lastRequest: currentTime };

    // Reset count if window has passed
    if (currentTime - userData.lastRequest > WINDOW_SIZE) {
        userData.count = 0;
        userData.lastRequest = currentTime;
    }

    // Check if limit is exceeded
    if (userData.count >= RATE_LIMIT) {
        return { allowed: false, remaining: 0 };
    }

    // Increment count and update store
    userData.count++;
    rateLimitStore.set(userId, userData);

    return { 
        allowed: true, 
        remaining: RATE_LIMIT - userData.count 
    };
}

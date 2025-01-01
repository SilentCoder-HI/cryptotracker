interface ErrorDetails {
    message: string;
    stack?: string;
    context?: Record<string, unknown>;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
}

const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 1000; // 1 second
const FETCH_TIMEOUT = 5000; // 5 seconds

export function trackError(error: Error | unknown, context?: Record<string, unknown>, severity?: 'low' | 'medium' | 'high'): void {
    const errorDetails: ErrorDetails = {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        context,
        severity: severity || 'medium',
        timestamp: new Date().toISOString()
    };

    // Validate error details
    if (!errorDetails.message || errorDetails.message.trim() === '') {
        errorDetails.message = 'Empty error message';
    }

    // Log to console with timestamp
    console.error(`[${errorDetails.timestamp}] Tracked Error:`, errorDetails);
    
    // Send to external error tracking service with retries
    sendToErrorTrackingServiceWithRetry(errorDetails);
}

async function sendToErrorTrackingServiceWithRetry(error: ErrorDetails, attempt = 1): Promise<void> {
    try {
        const ERROR_TRACKING_URL = process.env.ERROR_TRACKING_URL || 'https://api.error-tracking.com/v1/errors';
        const ERROR_TRACKING_KEY = process.env.ERROR_TRACKING_KEY;

        if (!ERROR_TRACKING_KEY) {
            console.warn('Error tracking key not configured');
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        const response = await fetch(ERROR_TRACKING_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ERROR_TRACKING_KEY}`
            },
            body: JSON.stringify(error),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (err) {
        console.error(`Attempt ${attempt} failed:`, err);
        
        if (attempt < MAX_RETRIES) {
            const delay = INITIAL_TIMEOUT * Math.pow(2, attempt - 1);
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return sendToErrorTrackingServiceWithRetry(error, attempt + 1);
        }
        
        console.error('Max retries reached. Giving up.');
    }
}

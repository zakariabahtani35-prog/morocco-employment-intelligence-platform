/**
 * Backend-for-Frontend (BFF) Proxy Interface
 * Completely isolates sensitive keys (Gemini API / Supabase Service Key) from client bundle.
 */

export interface BffProxyRequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export interface BffProxyResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

/**
 * Proxy API requests through local server endpoint or serverless function
 * to prevent exposing high-privilege keys in browser context.
 */
export async function executeBffProxyRequest<T = any>(
  options: BffProxyRequestOptions
): Promise<BffProxyResponse<T>> {
  const { endpoint, method = 'GET', headers = {}, body } = options;

  try {
    const proxyBase = import.meta.env.VITE_BFF_PROXY_URL || '/api/v1/proxy';
    const targetUrl = `${proxyBase}?target=${encodeURIComponent(endpoint)}`;

    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-MEIP-BFF-Client': 'web-v1',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      return {
        success: false,
        error: `BFF Proxy Request Failed: HTTP ${response.status} ${response.statusText}`,
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
      statusCode: response.status,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error during BFF proxy execution',
      statusCode: 500,
    };
  }
}

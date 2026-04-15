/* Copyright (c) 2026, Yao Zeran 
 * 
 * The http api wrapper file. */


/* Helper: Return the base url for the backend server */
function getBackendBaseUrl() {
  const DEFAULT_BACKEND_URL = "http://localhost:8080";
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.BACKEND_URL ??
    process.env.API_BASE_URL ??
    DEFAULT_BACKEND_URL
  );
}


/* Helper: Parse and build url into the form like:
 *   https://api.com/users?page=1&size=10&sort=name 
 * 
 * params:
 *   b: base 
 *   p: path
 *   q: query  */ 
function parseUrl(b: string, p: string, q?: Record<string, any>) {
  const base = b.replace(/\/$/, ""); // remove last slash '/'
  const path = p.startsWith("/") ? p : `/${p}`; // form as '/..'
  const url = new URL(base + path);
  if (q) {
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== null) { url.searchParams.append(k, String(v)); }
    });
  }
  return url.toString();
}


/* Helper: Parse the response body and print it in the http error */
function parseResponseBody(response: Response) {
  const contentType = response.headers.get("content-type");
  if (response.status === 204) return undefined;
  if (contentType?.includes("application/json")) { return response.json(); }
  return response.text(); 
}


class HttpError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}


type FetchOptions = RequestInit & {
  query?: Record<string, any>;
  timeout?: number;
};


/* Fetch from the backend api: base + path url, 
 *   */
async function fetchJson<T>(path: string, options: FetchOptions = { timeout: 10000 }): Promise<T> {

  const { query, timeout, ...init } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(parseUrl(getBackendBaseUrl(), path, query), 
    {
      ...init,
      signal: init.signal ?? controller.signal,
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
    }
  ).finally(() => clearTimeout(id));

  const body = await parseResponseBody(response);
  
  if (!response.ok) {
    throw new HttpError(
      (body as any)?.message ?? `HTTP ${response.status}`,
      response.status,
      body
    );
  }
  if (response.status === 204) { return undefined as T; }

  return body as T;
}


const api = {
  get: <T>(path: string, options?: FetchOptions) =>
    fetchJson<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: FetchOptions) =>
    fetchJson<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(path: string, body?: unknown, options?: FetchOptions) =>
    fetchJson<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, options?: FetchOptions) =>
    fetchJson<T>(path, { ...options, method: "DELETE" }),

  patch: <T>(path: string, body?: unknown, options?: FetchOptions) =>
    fetchJson<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};


export { api, fetchJson, type FetchOptions, HttpError };

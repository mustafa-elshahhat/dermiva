// API configuration. The app runs in mock mode until a backend base URL is
// provided via NEXT_PUBLIC_API_BASE_URL. The env var is optional while mocking,
// and nothing secret is exposed here (the value is a public base URL).

/** Base URL of the future .NET backend. Empty while running on mock data. */
export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * True when no API base URL is configured — services read from local mock data.
 * Flip to a real backend simply by setting NEXT_PUBLIC_API_BASE_URL.
 */
export const USE_MOCK: boolean = API_BASE_URL.length === 0;

/**
 * An array of routes that are accessible to the publuv
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification", "/api/uploadthing"];

/**
 * An array of routes that are accessible to the publuv
 * These routes will redirect logged in users to /setings
 * @type {string[]}
 */

export const authRoutes = ["/auth/sign-in", "/auth/sign-out", "/auth/sign-up", "/auth/error", "/auth/reset", "/auth/new-password"];

export const SIGN_IN_LINK = "/auth/sign-in";

/**
 * The prefix for api authentication routes
 * Routes tat starts with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

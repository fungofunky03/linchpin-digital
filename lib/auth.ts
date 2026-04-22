/**
 * Lazy Clerk auth helpers.
 *
 * Clerk's SDK validates CLERK_SECRET_KEY at module instantiation.
 * During Next.js build, server-side page data collection runs in worker
 * processes that may not have access to encrypted env vars. By deferring
 * the import until runtime call, we avoid the build-time validation error.
 */

export async function getAuth() {
  const { auth } = await import("@clerk/nextjs/server")
  return auth()
}

export async function getCurrentUser() {
  const { currentUser } = await import("@clerk/nextjs/server")
  return currentUser()
}

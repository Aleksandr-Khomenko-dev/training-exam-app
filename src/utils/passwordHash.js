// Lightweight client-side password hashing. This is a personal, single-device study app with
// no backend — there is no server to verify credentials against, so this can never be "real"
// authentication (anyone with access to this browser's localStorage could inspect it). This
// hash exists purely so the password isn't sitting in localStorage as plain text; it is not a
// substitute for a proper server-side auth system with salting/bcrypt/etc.
export async function hashPassword(username, password) {
  const data = new TextEncoder().encode(`certbrew::${username.toLowerCase()}::${password}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

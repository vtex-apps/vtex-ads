export async function hashEmail(email: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(email.trim().toLowerCase())

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // ArrayBuffer → byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // byte array → hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

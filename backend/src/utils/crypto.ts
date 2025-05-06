const encode = (str: string) => new TextEncoder().encode(str);
const decode = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const decodeBase64 = (b64: string) => Uint8Array.from(atob(b64), c => c.charCodeAt(0));

export async function hashPassword(password: string, salt?: Uint8Array) {
    salt = salt ?? crypto.getRandomValues(new Uint8Array(16)); // generates random salt if not provided
  
    const key = await crypto.subtle.importKey(
      "raw",
      encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
  
    const derived = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt, // ✅ this is a proper Uint8Array, which is a valid BufferSource
        iterations: 100000,
        hash: "SHA-256"
      },
      key,
      256
    );
  
    return {
      salt: decode(salt.buffer as ArrayBuffer), // ✅ Cast ArrayBufferLike to ArrayBuffer
      hash: decode(derived)
    };
  }

// Verify password
export async function verifyPassword(password: string, hashBase64: string, saltBase64: string) {
  const salt = decodeBase64(saltBase64);
  const { hash } = await hashPassword(password, salt);
  return hash === hashBase64;
}
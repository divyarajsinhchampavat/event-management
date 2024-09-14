export interface JwtPayload {
    sub: number; // The subject (usually the user ID)
    username: string; // Username or email, depending on your payload structure
    iat?: number; // Issued at (optional)
    exp?: number; // Expiration time (optional)
  }
// Protected WhatsApp launcher using Base64 obfuscation to prevent web scraping bots from extracting personal phone numbers
const ENCODED_WA = "aHR0cHM6Ly93YS5tZS85MTk3Nzg3NjkwNzA/dGV4dD1IZWxsbyUyMEFkbmFuLCUyMEklMjB3b3VsZCUyMGxpa2UlMjB0byUyMGRpc2N1c3MlMjBhJTIwRnVsbC1TdGFjayUyMG9wcG9ydHVuaXR5Lg==";

export const openProtectedWhatsApp = () => {
  try {
    if (typeof window !== 'undefined') {
      const target = window.atob(ENCODED_WA);
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    console.error('Error opening chat', err);
  }
};


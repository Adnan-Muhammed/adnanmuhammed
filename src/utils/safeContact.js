// Protected WhatsApp launcher using Base64 obfuscation to prevent web scraping bots from extracting personal phone numbers
// Message: "Hi, I reviewed your portfolio and think there may be a fit for an upcoming role. Would you be open to hearing more about it?"
const ENCODED_WA = "aHR0cHM6Ly93YS5tZS85MTk3Nzg3NjkwNzA/dGV4dD1IaSUyQyUyMEklMjByZXZpZXdlZCUyMHlvdXIlMjBwb3J0Zm9saW8lMjBhbmQlMjB0aGluayUyMHRoZXJlJTIwbWF5JTIwYmUlMjBhJTIwZml0JTIwZm9yJTIwYW4lMjB1cGNvbWluZyUyMHJvbGUuJTIwV291bGQlMjB5b3UlMjBiZSUyMG9wZW4lMjB0byUyMGhlYXJpbmclMjBtb3JlJTIwYWJvdXQlMjBpdCUzRg==";

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

export const openFollowUpWhatsApp = (customText) => {
  try {
    if (typeof window !== 'undefined') {
      const phone = window.atob("OTE5Nzc4NzY5MDcw");
      const text = customText || "Hi Adnan, I recently sent an inquiry through your portfolio and would like to connect directly on WhatsApp.";
      const target = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    console.error('Error opening chat', err);
  }
};


export const sendContactMessage = async (data) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      ok: false,
      error: payload?.error || 'Something went wrong. Please try again.',
    };
  }

  return { ok: true };
};
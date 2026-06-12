const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body: { email?: string } = await request.json().catch(() => ({}));
  if (typeof body.email === "string" && EMAIL_REGEX.test(body.email)) {
    return Response.json({ ok: true });
  }
  return Response.json(
    { ok: false, error: "Enter a valid email address." },
    { status: 400 },
  );
}

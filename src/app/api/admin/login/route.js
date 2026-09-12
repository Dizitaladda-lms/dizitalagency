import { NextResponse } from "next/server";
import { setAdminSessionCookie, validateAdminCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/blog-validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { recordAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-info";
import { signToken } from "@/lib/auth-jwt";

const LOGIN_WINDOW_MS = 60_000;
const LOGIN_ATTEMPT_LIMIT = 5;

export async function POST(request) {
  return NextResponse.json(
    { error: "This login endpoint is retired. Use /api/auth/login." },
    { status: 410 }
  );

  const ip = await getClientIp(request);
  const rateCheck = checkRateLimit(`admin-login:${ip}`, LOGIN_ATTEMPT_LIMIT, LOGIN_WINDOW_MS);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: `Too many login attempts. Please wait ${rateCheck.retryAfter} seconds before trying again.`,
        retryAfter: rateCheck.retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateCheck.retryAfter),
        },
      }
    );
  }

  try {
    const payload = await request.json();
    const parsed = loginSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid credentials" }, { status: 400 });
    }

    const { username, password } = parsed.data;

    if (!validateAdminCredentials(username, password)) {
      await recordAudit("admin.login.failed", { actor: username, ip });
      return NextResponse.json({ error: "Invalid credentials", attemptsRemaining: rateCheck.remaining }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    
    // Set both JWT admin_token and legacy session cookie
    const token = await signToken({ email: username, role: 'admin' });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    setAdminSessionCookie(response);

    await recordAudit("admin.login.success", { actor: username, ip });
    return response;
  } catch (error) {
    console.error("POST /api/admin/login failed", error);
    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

/* Waitlist signup. Inserts into Supabase `waitlist` via the REST API with the
   service-role key — the table has RLS enabled and no policies, so this route
   is the only writer. Plain fetch instead of supabase-js: one insert doesn't
   need a client library. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let email: unknown;
  let source: unknown;
  try {
    ({ email, source } = await req.json());
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  const cleaned = email.trim().toLowerCase();
  if (cleaned.length > 254 || !EMAIL_RE.test(cleaned)) {
    return NextResponse.json({ error: "That doesn't look like an email." }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("waitlist: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured");
    return NextResponse.json({ error: "Signup is not available right now." }, { status: 500 });
  }

  // on_conflict=email: without it, ignore-duplicates only covers the uuid PK,
  // so a repeat signup surfaces as a 409 instead of being silently accepted.
  const res = await fetch(`${url}/rest/v1/waitlist?on_conflict=email`, {
    method: "POST",
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      // Duplicate signups are a success from the user's point of view.
      prefer: "resolution=ignore-duplicates",
    },
    body: JSON.stringify([
      {
        email: cleaned,
        source: typeof source === "string" ? source.slice(0, 64) : "lp",
      },
    ]),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("waitlist: supabase insert failed", res.status, await res.text());
    return NextResponse.json({ error: "Something went wrong. Try again?" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

"use client";

import { useState, type FormEvent } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Mascot } from "../brand/Mascot";

/* design.md §11 — Input + Primary side by side inside one pill container (desktop),
   stacked under 520px. Max width 440px. On submit the form is REPLACED in place by a
   success message — never a page transition.
   Submits to /api/waitlist (Supabase behind it). Success only flips after the
   server confirms — an optimistic flip here would lie to the user when the
   insert fails, and a waitlist has no way to recover that email later. */
export interface WaitlistFormProps {
  buttonLabel?: string;
  microcopy?: string;
  stacked?: boolean;
  /** Where on the page this form sits — stored alongside the email. */
  source?: string;
  onSubmit?: (email: string) => void;
  successMessage?: string;
}

export function WaitlistForm({
  buttonLabel = "Notify me",
  microcopy,
  stacked = false,
  source = "lp",
  onSubmit,
  successMessage = "You're on the list. We'll email you once — the day it's ready.",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes("@") || busy) return;
    setBusy(true);
    setError(null);
    // Fold UTM params from the landing URL into the stored source, so signups
    // can be traced back to the post that brought them: "tiktok/demo-1/hero".
    // Read at submit time — this is a one-page site, the URL never changes.
    let fullSource = source;
    try {
      const p = new URLSearchParams(window.location.search);
      const utm = [p.get("utm_source"), p.get("utm_campaign")]
        .filter((v): v is string => !!v?.trim())
        .map((v) => v.trim().slice(0, 24));
      if (utm.length) fullSource = [...utm, source].join("/");
    } catch {
      /* URL parsing never blocks a signup */
    }
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: fullSource }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "Something went wrong. Try again?");
        return;
      }
      setDone(true);
      onSubmit?.(email);
    } catch {
      setError("Network hiccup — try again?");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div
        style={{
          maxWidth: "var(--form-max)",
          width: "100%",
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-l)",
          padding: "var(--card-pad)",
          display: "flex",
          gap: "var(--space-4)",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <Mascot pose="proud" size={84} style={{ flex: "0 0 auto" }} />
        <div style={{ display: "grid", gap: "var(--space-2)" }}>
          <div
            style={{
              font: "800 var(--display-s-size)/var(--display-s-lh) var(--font-display)",
              color: "var(--warm)",
            }}
          >
            You&apos;re in.
          </div>
          <div
            style={{
              font: "500 var(--body-s-size)/var(--body-s-lh) var(--font-body)",
              color: "var(--sub)",
            }}
          >
            {successMessage}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "var(--form-max)", width: "100%", display: "grid", gap: "var(--space-3)" }}>
      <form
        onSubmit={submit}
        style={{
          display: stacked ? "grid" : "flex",
          gap: stacked ? "var(--space-3)" : "var(--space-2)",
          alignItems: "center",
        }}
      >
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" disabled={busy} style={stacked ? { width: "100%" } : undefined}>
          {busy ? "Joining…" : buttonLabel}
        </Button>
      </form>
      {error && (
        <p
          role="alert"
          style={{
            margin: 0,
            font: "500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)",
            color: "var(--ink)",
          }}
        >
          {error}
        </p>
      )}
      {microcopy && (
        <p
          style={{
            margin: 0,
            font: "500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)",
            color: "var(--sub)",
          }}
        >
          {microcopy}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Mascot } from "../brand/Mascot";

/* design.md §11 — Input + Primary side by side inside one pill container (desktop),
   stacked under 520px. Max width 440px. On submit the form is REPLACED in place by a
   success message — never a page transition. */
export interface WaitlistFormProps {
  buttonLabel?: string;
  microcopy?: string;
  stacked?: boolean;
  onSubmit?: (email: string) => void;
  successMessage?: string;
}

export function WaitlistForm({
  buttonLabel = "Notify me",
  microcopy,
  stacked = false,
  onSubmit,
  successMessage = "You're on the list. We'll email you once — the day it's ready.",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    onSubmit?.(email);
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
        <Button type="submit" style={stacked ? { width: "100%" } : undefined}>
          {buttonLabel}
        </Button>
      </form>
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

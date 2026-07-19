"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Minus, Plus, AlertTriangle, Send } from "lucide-react";
import type { Dict } from "@/lib/content";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "phone", string>>;

export function LeadForm({ t, locale }: { t: Dict; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [quantity, setQuantity] = useState(1);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    city: "",
    message: "",
    company: "", // honeypot
  });

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  function validate(): Errors {
    const next: Errors = {};
    const name = values.name.trim();
    const phone = values.phone.trim();

    if (!name) next.name = t.form.errors.nameRequired;
    else if (name.length < 2) next.name = t.form.errors.nameShort;

    if (!phone) next.phone = t.form.errors.phoneRequired;
    else if (phone.replace(/\D/g, "").length < 9)
      next.phone = t.form.errors.phoneInvalid;

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`lead-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          quantity,
          locale,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus("success");
      setValues({ name: "", phone: "", city: "", message: "", company: "" });
      setQuantity(1);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id="lead-form"
      className="scroll-mt-28 overflow-hidden rounded-[var(--radius-xl)] bg-wine-800 shadow-[var(--shadow-deep)]"
    >
      <div className="p-7 sm:p-10">
        <h3 className="font-display text-2xl text-bone-50 sm:text-3xl">
          {t.form.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-bone-200/75">
          {t.form.lead}
        </p>

        <AnimatePresence mode="wait">
          {/* ---------- SUCCESS ---------- */}
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="status"
              aria-live="polite"
              className="mt-8 rounded-[var(--radius-lg)] border border-gold-500/40 bg-gold-500/10 p-8 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 220 }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-500 text-wine-950"
              >
                <Check size={30} strokeWidth={3} aria-hidden />
              </motion.span>
              <p className="mt-5 font-display text-2xl text-bone-50">
                {t.form.successTitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-bone-200/80">
                {t.form.successText}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-[var(--radius-sm)] border border-bone-50/25 px-5 py-2.5 text-sm font-semibold text-bone-100 transition-colors hover:bg-bone-50/10"
              >
                {t.form.successAgain}
              </button>
            </motion.div>
          ) : (
            /* ---------- FORM ---------- */
            <motion.form
              key="form"
              onSubmit={onSubmit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-5"
            >
              {/* Honeypot — hidden from humans and assistive tech. */}
              <div aria-hidden className="hidden">
                <label htmlFor="lead-company">Company</label>
                <input
                  id="lead-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(e) => set("company")(e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="lead-name"
                  label={t.form.name.label}
                  placeholder={t.form.name.placeholder}
                  value={values.name}
                  onChange={set("name")}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <Field
                  id="lead-phone"
                  label={t.form.phone.label}
                  placeholder={t.form.phone.placeholder}
                  value={values.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="lead-city"
                  label={t.form.city.label}
                  placeholder={t.form.city.placeholder}
                  value={values.city}
                  onChange={set("city")}
                  autoComplete="address-level2"
                  optionalTag={t.form.optionalTag}
                />

                {/* Quantity stepper */}
                <div>
                  <span className="mb-2 block text-sm font-semibold text-bone-100">
                    {t.form.quantity.label}
                  </span>
                  <div className="flex h-13 items-center justify-between rounded-[var(--radius-md)] border border-bone-50/20 bg-wine-900/50 px-2 py-2">
                    <StepButton
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      label="−"
                    >
                      <Minus size={17} aria-hidden />
                    </StepButton>
                    <span
                      aria-live="polite"
                      className="font-display text-xl text-bone-50"
                    >
                      {quantity}
                    </span>
                    <StepButton
                      onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                      disabled={quantity >= 20}
                      label="+"
                    >
                      <Plus size={17} aria-hidden />
                    </StepButton>
                  </div>
                </div>
              </div>

              <Field
                id="lead-message"
                label={t.form.message.label}
                placeholder={t.form.message.placeholder}
                value={values.message}
                onChange={set("message")}
                optionalTag={t.form.optionalTag}
                textarea
              />

              {/* ---------- ERROR ---------- */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-start gap-3.5 rounded-[var(--radius-md)] border border-wine-300/40 bg-wine-500/20 p-4"
                >
                  <AlertTriangle
                    size={19}
                    className="mt-0.5 shrink-0 text-wine-200"
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-semibold text-bone-50">
                      {t.form.errorTitle}
                    </p>
                    <p className="mt-1 text-sm text-bone-200/80">
                      {t.form.errorText}
                    </p>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] bg-gold-500 font-semibold text-wine-950 shadow-[var(--shadow-lift)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={19} className="animate-spin" aria-hidden />
                    {t.form.submitting}
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden />
                    {status === "error" ? t.form.retry : t.form.submit}
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-relaxed text-bone-200/50">
                {t.form.consent}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] text-bone-100 transition-colors hover:bg-bone-50/12 disabled:opacity-35 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  textarea,
  optionalTag,
  required,
  ...rest
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  optionalTag?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "text";
}) {
  const describedBy = error ? `${id}-error` : undefined;

  const shared = {
    id,
    value,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChange(e.target.value),
    className: cn(
      "w-full rounded-[var(--radius-md)] border bg-wine-900/50 px-4 text-bone-50 placeholder:text-bone-200/35",
      "transition-colors duration-200 focus:border-gold-500 focus:bg-wine-900/70 focus:outline-none",
      textarea ? "min-h-28 resize-y py-3.5" : "h-13 py-0",
      error ? "border-wine-300" : "border-bone-50/20 hover:border-bone-50/35"
    ),
    ...rest,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-2 text-sm font-semibold text-bone-100"
      >
        {label}
        {optionalTag && (
          <span className="text-xs font-normal text-bone-200/45">
            {optionalTag}
          </span>
        )}
      </label>

      {textarea ? (
        <textarea rows={3} {...shared} />
      ) : (
        <input type={type} required={required} {...shared} />
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs font-medium text-wine-200"
        >
          {error}
        </p>
      )}
    </div>
  );
}

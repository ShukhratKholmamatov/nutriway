import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
}: Props) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <p
          className={cn(
            "text-[11px] font-bold uppercase tracking-[0.28em]",
            dark ? "text-gold-300" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
        <div
          className={cn(
            "rule-gold mt-4 h-px w-24",
            centered && "mx-auto"
          )}
        />
      </Reveal>

      <Reveal i={1}>
        <h2
          className={cn(
            "mt-6 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.9rem]",
            dark ? "text-bone-50" : "text-wine-900"
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal i={2}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              dark ? "text-bone-200/80" : "text-ink-500"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

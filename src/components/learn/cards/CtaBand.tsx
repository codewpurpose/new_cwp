import Link from "next/link";
import { PageSection } from "@/components/PageHero";

interface CtaAction {
  href: string;
  label: string;
  variant: "primary" | "secondary";
  external?: boolean;
}

interface CtaBandProps {
  title: string;
  body: React.ReactNode;
  actions: readonly CtaAction[];
}

/** Was copy-pasted verbatim across three pages. */
export function CtaBand({ title, body, actions }: CtaBandProps) {
  return (
    <PageSection className="learn-on-inverse border-t-[0.5px] border-[var(--home-grey-500)] bg-learn-inverse">
      <div className="mx-auto max-w-3xl text-center text-learn-on-inverse">
        <h2 className="home-serif text-[1.75rem] text-learn-heading-on-inverse md:text-[2.25rem]">
          {title}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] opacity-90">{body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {actions.map((action) => {
            const className =
              action.variant === "primary"
                ? "home-btn home-btn-fill learn-focusable !border-learn-quiet !bg-learn-quiet !text-learn-strong"
                : "home-btn home-btn-outline learn-focusable !border-learn-quiet !text-learn-on-inverse";

            return action.external ? (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {action.label}
              </a>
            ) : (
              <Link key={action.href} href={action.href} className={className}>
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}

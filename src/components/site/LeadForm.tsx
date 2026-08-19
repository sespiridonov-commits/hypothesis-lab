import { useState, type FormEvent } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "./Section";
import { track } from "@/lib/analytics";

export type LeadPayload = {
  site: string;
  product: string;
  problem: string;
  contact: string;
  consent: boolean;
};

async function submitLead(payload: LeadPayload) {
  if (import.meta.env.DEV) console.debug("[lead]", payload);
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true as const };
}

const DELIVERABLES = [
  "3 приоритетных направления, которые имеет смысл проверить",
  "для каждой гипотезы — аудитория, рекламный угол и логика связки",
  "понимание, что я бы не запускал в первую очередь и почему",
];

const FIELDS = [
  { name: "site", label: "Сайт", placeholder: "example.ru", type: "url" },
  { name: "product", label: "Что продаёте?", placeholder: "Коротко о продукте", type: "text" },
  {
    name: "problem",
    label: "Что сейчас не устраивает в рекламе?",
    placeholder: "Дорогие заявки, мало обращений, непонятно что работает…",
    type: "textarea",
  },
  {
    name: "contact",
    label: "Ваш Telegram / телефон",
    placeholder: "@username или +7…",
    type: "text",
  },
] as const;

export function LeadForm() {
  const [values, setValues] = useState<Record<string, string>>({
    site: "",
    product: "",
    problem: "",
    contact: "",
  });
  const [consent, setConsent] = useState(false);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const onFieldFocus = () => {
    if (!started) {
      setStarted(true);
      track("form_start");
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent || status === "sending") return;
    setStatus("sending");
    track("form_submit", { has_site: Boolean(values["site"]) });
    await submitLead({
      site: values["site"] ?? "",
      product: values["product"] ?? "",
      problem: values["problem"] ?? "",
      contact: values["contact"] ?? "",
      consent,
    });
    setStatus("done");
  };

  return (
    <section id="lead" className="scroll-mt-24 border-t border-border px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="label-mono">первый шаг</p>
          <h2 className="mt-4 text-[clamp(1.75rem,4.4vw,3rem)] leading-[1.05] font-medium text-ink">
            Получите 3 рекламные гипотезы для своего бизнеса
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Это не автоматический аудит и не «созвон на знакомство». Сначала я смотрю на продукт и задачу, а затем возвращаюсь с конкретными направлениями, которые имеет смысл обсуждать и тестировать.
          </p>

          <div className="mt-8 space-y-4">
            {DELIVERABLES.map((item, i) => (
              <div key={item} className="flex items-start gap-3">
                <span className="label-mono mt-0.5 shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[15px] leading-relaxed text-ink">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-secondary p-5">
            <p className="label-mono">что не входит</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Не обещаю заранее CPL, количество заявок или «рост в X раз». Цель первого шага — понять, что именно стоит проверять до того, как увеличивать рекламный бюджет.
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            {status === "done" ? (
              <div className="flex min-h-[360px] flex-col items-start justify-center">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent-soft">
                  <Check className="size-5 text-accent" />
                </span>
                <h3 className="mt-6 text-2xl font-medium text-ink">Заявка получена.</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                  Посмотрю продукт и задачу. Следующий шаг — вернуться с первыми рекламными гипотезами, а не сразу продавать вам ведение рекламы.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="label-mono">
                      {f.label}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={f.name}
                        name={f.name}
                        rows={4}
                        placeholder={f.placeholder}
                        value={values[f.name] ?? ""}
                        onFocus={onFieldFocus}
                        onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                        className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/10"
                      />
                    ) : (
                      <input
                        id={f.name}
                        name={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={values[f.name] ?? ""}
                        onFocus={onFieldFocus}
                        onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/10"
                      />
                    )}
                  </div>
                ))}

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--accent)]"
                  />
                  Согласен на обработку персональных данных
                </label>

                <button
                  type="submit"
                  disabled={!consent || status === "sending"}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? "Отправляю…" : "Получить 3 гипотезы"}
                  {status !== "sending" && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
                </button>
                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                  Сначала разбор задачи. Решение о дальнейшей работе — только после него.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { track } from "@/lib/analytics";
import { ProcessFlow } from "./ProcessFlow";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-14 pb-16 sm:px-8 md:pt-20 md:pb-24">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="label-mono animate-rise">Performance-маркетинг · рекламные гипотезы</p>
          <h1 className="animate-rise mt-6 max-w-[20ch] text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.04] font-medium tracking-tight text-ink">
            Найдём, что именно стоит тестировать в рекламе
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Разберу продукт, спрос и текущую рекламу. На выходе — 3–5 приоритетных связок с понятной логикой: кому показываем, с каким сообщением и что проверяем первым.
          </p>

          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#lead"
              onClick={() => track("hero_cta_click", { location: "hero_primary" })}
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-accent-foreground shadow-lift transition-transform duration-200 hover:-translate-y-0.5"
            >
              Получить 3 рекламные гипотезы
            </a>
            <a
              href="#cases"
              className="inline-flex items-center justify-center rounded-full px-5 py-4 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Посмотреть, как я думаю
            </a>
          </div>

          <div className="animate-rise mt-5 flex max-w-xl flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>Без обещаний «100 заявок»</span>
            <span aria-hidden>·</span>
            <span>Без запуска всего подряд</span>
            <span aria-hidden>·</span>
            <span>Сначала — гипотезы и тест</span>
          </div>

          <p className="label-mono mt-8 border-t border-border pt-6">
            Яндекс Директ · VK Ads · РСЯ · Креативы · Квизы · Воронки
          </p>
        </div>

        <div>
          <ProcessFlow />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Не начинаю с вопроса «какую кампанию создать?». Сначала определяем, что в этом бизнесе вообще имеет смысл проверять.
          </p>
        </div>
      </div>
    </section>
  );
}

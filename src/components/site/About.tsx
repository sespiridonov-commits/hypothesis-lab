import { Section, Reveal } from "./Section";

const SKILLS = [
  "Performance marketing",
  "Yandex Direct",
  "VK Ads",
  "РСЯ",
  "Creative strategy",
  "Demand research",
  "Landing pages",
  "Quizzes",
  "Funnels",
  "A/B testing",
];

const PROJECT_AREAS = [
  "туризм",
  "недвижимость",
  "психология",
  "локальный бизнес",
  "мероприятия",
  "нишевые продукты",
];

export function About() {
  return (
    <Section id="about" label="обо мне" title="Я не начинаю с рекламного кабинета">
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal className="space-y-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Мне интереснее понять, почему человек должен обратить внимание на продукт, чем просто настроить ещё одну рекламную кампанию.
          </p>
          <p>
            В работе я регулярно сталкиваюсь с очень разными задачами — от локального спроса до узких услуг и продуктов, которые сложно объяснить одним объявлением.
          </p>
          <p className="text-ink">
            Повторяющаяся логика почти всегда одна: понять спрос → разложить аудиторию и интенты → найти рекламные углы → выбрать, что тестировать первым → проверить цифрами.
          </p>
          <p>
            Поэтому мой продукт — не «настройка кабинета». Кабинет — это только место, где проверяется гипотеза.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="space-y-7">
            <div>
              <p className="label-mono">задачи из практики</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PROJECT_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-border bg-card px-3.5 py-2 text-sm text-ink"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="label-mono">инструменты</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-card px-3.5 py-2 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

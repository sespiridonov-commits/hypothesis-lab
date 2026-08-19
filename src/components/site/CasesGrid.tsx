import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section, Reveal } from "./Section";
import { CaseModal, type CaseItem } from "./CaseModal";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const CASES: CaseItem[] = [
  {
    id: "vietnam",
    n: "01",
    category: "TOURISM / SEARCH",
    title: "Вьетнам: как не конкурировать с общим запросом",
    description:
      "Вместо широкого продвижения туров во Вьетнам — разделение спроса по направлениям и пользовательским интентам: Нячанг, Дананг, отдых, отели, путёвки.",
    tag: "Demand segmentation",
    task: "Продвигать туры во Вьетнам при ограниченном локальном спросе и высокой конкуренции по общим формулировкам.",
    hypothesis:
      "Широкий запрос смешивает разные намерения. Если разделить спрос по направлениям и сценариям выбора, объявления станут точнее.",
    solution:
      "Разделение структуры по направлениям и интентам: Нячанг, Дананг, отдых, отели, путёвки; отдельные сообщения под каждый сценарий.",
    tested: ["структуру спроса", "курортные интенты", "формулировки объявлений", "посадочные смыслы"],
    takeaway:
      "При небольшом спросе задача не в том, чтобы собрать больше ключей, а в том, чтобы не смешивать разные намерения в одной рекламной связке.",
  },
  {
    id: "land",
    n: "02",
    category: "REAL ESTATE / LEAD GENERATION",
    title: "Участки: продаём не землю, а сценарий будущего",
    description:
      "Разные рекламные углы для одного продукта: цена, близость к Рязани, лес, место для дома, образ будущей жизни.",
    tag: "Creative angles",
    task: "Получать обращения на земельные участки, не сводя всю коммуникацию к цене за сотку.",
    hypothesis:
      "Один и тот же объект может быть интересен по разным причинам: рациональным, эмоциональным и ситуационным.",
    solution:
      "Разложить продукт на несколько рекламных углов и не заставлять один креатив одновременно продавать цену, природу, близость и будущий дом.",
    tested: ["цена", "близость к городу", "лес и природа", "место для дома", "образ будущей жизни"],
    takeaway:
      "Для недвижимости рекламная единица — не только объект. Часто сильнее работает конкретный сценарий, который человек связывает с этим объектом.",
  },
  {
    id: "psychology",
    n: "03",
    category: "PSYCHOLOGY / SEARCH",
    title: "Почему «психолог» — слишком широкий запрос",
    description:
      "Декомпозиция широкой услуги на конкретные проблемы, методы и пользовательские интенты.",
    tag: "Intent segmentation",
    task: "Привлекать обращения на психологические услуги из поиска без смешивания слишком разных запросов в одной группе.",
    hypothesis:
      "Человек чаще ищет решение своей ситуации или конкретный метод, а не абстрактную услугу «психолог».",
    solution:
      "Разделить рекламу по проблемам, методам и поисковым сценариям: отдельные связки под конкретное намерение пользователя.",
    tested: ["проблемные интенты", "методы терапии", "поисковые формулировки", "отдельные офферы"],
    takeaway:
      "Чем чувствительнее и сложнее услуга, тем опаснее говорить со всеми одним сообщением. Релевантность начинается с точного интента.",
  },
  {
    id: "oka",
    n: "04",
    category: "EVENT / CREATIVE",
    title: "Oka River Trail: продукт без очевидного спроса",
    description:
      "Тестирование разных мотивационных заходов: эмоция, вызов, близость, статус, история и дедлайн.",
    tag: "Creative strategy",
    task: "Привлекать участников на трейловый забег, где одного горячего поискового спроса недостаточно.",
    hypothesis:
      "Когда человек не ищет продукт прямо сейчас, результат сильнее зависит от правильного рекламного угла, чем от формальной настройки кампании.",
    solution:
      "Сформировать набор разных мотивационных концепций и приоритизировать их для последовательного теста.",
    tested: ["эмоция", "вызов", "это рядом", "статус", "дедлайн", "история"],
    takeaway:
      "Для продуктов без сформированного спроса сначала нужно найти причину остановить внимание, и только потом оптимизировать рекламный кабинет.",
  },
  {
    id: "japan-china",
    n: "05",
    category: "TRAVEL / PRODUCT",
    title: "Япония и Китай: как рекламировать сложный турпродукт",
    description:
      "Разбор насыщенной программы тура → ключевые преимущества → рекламные интенты → поисковые связки.",
    tag: "Product packaging",
    task: "Упаковать сложную программу тура так, чтобы рекламное сообщение оставалось понятным за несколько секунд.",
    hypothesis:
      "Пользователь не покупает «программу на 7 дней» целиком в одном объявлении. Ему нужны несколько ясных причин заинтересоваться.",
    solution:
      "Разложить программу на понятные рекламные смыслы и связать их с конкретными поисковыми намерениями.",
    tested: ["ключевые преимущества", "географические интенты", "события программы", "поисковые связки"],
    takeaway:
      "Чем сложнее продукт, тем важнее не перечислять всё, а выбрать один понятный смысл для каждого рекламного контакта.",
  },
  {
    id: "niche",
    n: "06",
    category: "NICHE PRODUCT / PERFORMANCE",
    title: "Когда широкая реклама вообще не нужна",
    description:
      "Работа с продуктом, у которого потенциальная аудитория ограничена, но ценность покупки высокая.",
    tag: "Niche performance",
    task: "Продвигать специализированный продукт без бессмысленной гонки за широким охватом.",
    hypothesis:
      "В узкой нише важнее точность попадания в ситуацию пользователя, чем масштаб аудитории и количество показов.",
    solution:
      "Сузить сегменты, точнее сформулировать сообщения и контролировать тесты по качеству трафика, а не по объёму охвата.",
    tested: ["сегменты по ситуации", "точечные сообщения", "узкая семантика", "ограниченные тесты"],
    takeaway:
      "Широкий охват не является целью сам по себе. В нишевом продукте несколько точных связок могут быть ценнее десятков массовых креативов.",
  },
];

export function CasesGrid() {
  const [active, setActive] = useState<CaseItem | null>(null);

  return (
    <Section
      id="cases"
      label="кейсы"
      title="Не рассказываю о маркетинге. Показываю, как принимаю решения."
      subtitle="Реальные задачи из практики — без выдуманных CPL, ROAS и красивых цифр ради кейса."
    >
      <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c, i) => {
          const featured = i === 0 || i === 3;
          return (
            <Reveal key={c.id} delay={i * 60} className={featured ? "lg:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => {
                  setActive(c);
                  track("case_open", { case_id: c.id });
                }}
                className={cn(
                  "group flex h-full w-full flex-col rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-lift sm:p-7",
                  featured ? "border-border-strong bg-secondary" : "border-border bg-card",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="label-mono">
                    {c.n} · {c.category}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </div>
                <h3
                  className={cn(
                    "mt-6 leading-snug font-medium text-ink",
                    featured ? "text-xl sm:text-2xl" : "text-lg",
                  )}
                >
                  {c.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 flex-1 leading-relaxed text-muted-foreground",
                    featured ? "max-w-xl text-[15px]" : "text-sm",
                  )}
                >
                  {c.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex w-fit rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                    {c.tag}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground/70">
                    задача · гипотеза · решение · вывод
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      <CaseModal item={active} onClose={() => setActive(null)} />
    </Section>
  );
}

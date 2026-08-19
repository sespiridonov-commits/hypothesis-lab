import { X } from "lucide-react";
import { useEffect } from "react";

export type CaseItem = {
  id: string;
  n: string;
  category: string;
  title: string;
  description: string;
  tag: string;
  task: string;
  hypothesis: string;
  solution: string;
  tested: string[];
  takeaway: string;
};

export function CaseModal({ item, onClose }: { item: CaseItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-rise max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-border bg-card p-6 shadow-lift sm:rounded-3xl sm:p-9"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="label-mono">
              {item.n} · {item.category}
            </p>
            <h3 className="mt-4 text-2xl leading-tight font-medium text-ink sm:text-3xl">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X className="size-4" />
          </button>
        </div>

        <dl className="mt-8 space-y-6">
          <Row term="Задача" value={item.task} />
          <Row term="Гипотеза" value={item.hypothesis} />
          <Row term="Решение" value={item.solution} />
          <div>
            <dt className="label-mono">Что проверяли</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {item.tested.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-ink"
                >
                  {t}
                </span>
              ))}
            </dd>
          </div>
          <div className="rounded-2xl border border-accent bg-accent-soft p-5">
            <dt className="label-mono text-accent">Вывод</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink">{item.takeaway}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Здесь не публикую неподтверждённые цифры. Кейс показывает, как была разложена задача и что именно имело смысл проверять.
        </p>

        <a
          href="#lead"
          onClick={onClose}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground sm:w-auto"
        >
          Разобрать мою задачу
        </a>
      </div>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="label-mono">{term}</dt>
      <dd className="mt-2 text-[15px] leading-relaxed text-ink">{value}</dd>
    </div>
  );
}

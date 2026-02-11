import { cn } from "./utils";

export function BackgroundFX({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="ui-blob ui-blob-a" />
      <div className="ui-blob ui-blob-b" />
      <div className="ui-blob ui-blob-c" />
      <div className="ui-noise" />
    </div>
  );
}

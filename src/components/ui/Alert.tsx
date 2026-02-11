import { cn } from "./utils";

export function Alert({
  tone = "info",
  children,
  className,
}: {
  tone?: "info" | "success" | "error";
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("ui-alert", `ui-alert-${tone}`, className)}>{children}</div>;
}

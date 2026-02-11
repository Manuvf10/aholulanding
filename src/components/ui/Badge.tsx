import { cn } from "./utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("ui-badge", className)}>{children}</span>;
}

export function StatusBadge({ status }: { status: "enviado" | "aceptado" | "rechazado" }) {
  return <span className={cn("ui-badge-status", `status-${status}`)}>{status}</span>;
}

import { cn } from "./utils";

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("ui-input", className)} {...props} />;
}

import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        "ui-button",
        variant === "primary" && "ui-button-primary",
        variant === "secondary" && "ui-button-secondary",
        variant === "ghost" && "ui-button-ghost",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return (
    <a
      className={cn(
        "ui-button",
        variant === "primary" && "ui-button-primary",
        variant === "secondary" && "ui-button-secondary",
        variant === "ghost" && "ui-button-ghost",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

import { cn } from "./utils";

export function Input({ icon, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon?: string }) {
  return (
    <div className="ui-field-wrap">
      {icon && <span className="ui-field-icon" aria-hidden>{icon}</span>}
      <input className={cn("ui-input", icon && "ui-input-with-icon", className)} {...props} />
    </div>
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("ui-input", className)} {...props} />;
}

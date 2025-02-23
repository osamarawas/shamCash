import { Languages } from "@/app/utils/enums";
import { setDirction } from "@/app/utils/helperServer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "next-intl";
import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  Path,
  UseFormRegister,
} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InputFieldProps<T extends Record<string, any>> {
  register: UseFormRegister<T>;
  label?: string;
  type: string;
  name: keyof T;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  defaultValue?: string;
  maxLength?: number;
  readOnly?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InputField = <T extends Record<string, any>>({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
  register,
  maxLength,
}: InputFieldProps<T>) => {
  const locale = useLocale() as Languages;

  return (
    <div dir={setDirction(locale)}>
      <label
        className="block text-sm font-medium text-foreground  "
        htmlFor={String(name)}
      >
        {label}
      </label>
      {type === "text" || type === "email" || type === "password" ? (
        <Input
          {...register(name as Path<T>)}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          name={String(name)}
          id={String(name)}
          defaultValue={defaultValue}
          readOnly={readOnly}
          maxLength={maxLength}
          className="placeholder-muted-foreground !border-border_input focus:!border-border_focus_input w-full"
        />
      ) : (
        <Textarea
          {...register(name as Path<T>)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          name={String(name)}
          id={String(name)}
          defaultValue={defaultValue}
          className="placeholder-muted-foreground !border-border_input focus:!border-border_focus_input w-full"
        />
      )}

      {error && error.message && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error.message ? "text-destructive" : ""
          }`}
        >
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;

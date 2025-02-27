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
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  defaultValue?: string;
  maxLength?: number;
  readOnly?: boolean;
  classNameExtra?: string;
  valueAsNumber?: boolean;
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
  classNameExtra,
  valueAsNumber,
}: InputFieldProps<T>) => {
  const locale = useLocale() as Languages;

  return (
    <div dir={setDirction(locale)}>
      {/* عرض التسمية */}
      {label && (
        <label
          className="block text-sm font-medium text-foreground"
          htmlFor={String(name)}
        >
          {label}
        </label>
      )}

      {/* الحقل بناءً على نوعه */}
      {type === "text" || type === "email" || type === "password" ? (
        <Input
          {...register(name, { valueAsNumber: valueAsNumber })}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          name={String(name)}
          id={String(name)}
          defaultValue={defaultValue}
          readOnly={readOnly}
          maxLength={maxLength}
          className={`placeholder-muted-foreground placeholder:text-sm !border-border_input focus:!border-border_focus_input w-full text-sm ${
            error?.message && "border-destructive"
          }  ${classNameExtra}`}
        />
      ) : (
        <Textarea
          {...register(name, { valueAsNumber: valueAsNumber })}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          name={String(name)}
          id={String(name)}
          defaultValue={defaultValue}
          className={`placeholder-muted-foreground placeholder:text-sm !border-border_input focus:!border-border_focus_input w-full text-sm ${
            error?.message && "border-destructive"
          }  ${classNameExtra}`}
        />
      )}

      {/* عرض الخطأ إذا كان موجودًا */}
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

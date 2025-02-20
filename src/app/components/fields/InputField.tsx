import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps {
  register: UseFormRegister<FieldValues>;
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  defaultValue?: string;
  maxLength?: number;
  readOnly?: boolean;
}
const InputField = ({
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
}: InputFieldProps) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-foreground  "
        htmlFor={name}
      >
        {label}
      </label>
      {type === "text" || type === "email" || type === "password" ? (
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          name={name}
          id={name}
          defaultValue={defaultValue}
          readOnly={readOnly}
          maxLength={maxLength}
          className="placeholder-muted-foreground !border-border_input focus:!border-border_focus_input w-full"
        />
      ) : (
        <Textarea
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          name={name}
          id={name}
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

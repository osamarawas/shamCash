import { Languages } from "@/app/utils/enums";
import { setDirction } from "@/app/utils/helperServer";
import { Input } from "@/components/ui/input";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import { Upload } from "lucide-react";

interface FilleFieldProps {
  register: UseFormRegister<FieldValues>;
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  defaultValue?: string;
  readOnly?: boolean;
  onchangeFile?: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  fileName?: string;
}

const FilleField = ({
  label,
  name,
  type,
  disabled,
  autoFocus,
  error,
  readOnly,
  register,
  onchangeFile,
  placeholder,
  fileName,
}: FilleFieldProps) => {
  const locale = useLocale() as Languages;
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploaded(true);
    } else {
      setIsUploaded(false);
    }

    if (onchangeFile) {
      onchangeFile(e, name);
    }
  };

  return (
    <div>
      <div className="flex flex-col" dir={setDirction(locale)}>
        <label className="justify-between flex items-center gap-2 border !border-border_input rounded-lg p-2 cursor-pointer hover:bg-hover">
          <span className="text-sm text-muted-foreground">
            {fileName || placeholder}
          </span>

          {isUploaded ? (
            <IoIosCheckmarkCircleOutline  className="w-5 h-5 success" />
          ) : (
            <Upload className="w-5 h-5 text-muted-foreground" />
          )}

          <Input
            type={type}
            className="hidden"
            {...register(name, {
              onChange: handleFileChange,
            })}
            disabled={disabled}
            autoFocus={autoFocus}
            readOnly={readOnly}
          />
        </label>

        {error && error.message && (
          <p className="text-destructive mt-2 text-sm font-medium">
            {error.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default FilleField;

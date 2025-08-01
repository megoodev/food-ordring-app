import { Input } from "@/components/ui/input";
import { IFormField } from "@/lib/types/app";

import { ValidationErrors } from "@/validations/auth";
import { Label } from "@radix-ui/react-label";

interface Props extends IFormField {
  error: ValidationErrors;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize text-black mb-4">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        name={name}
        id={name}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
      {error && error[name] && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${error[name] ? "text-destructive" : ""
            }`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
};

export default TextField;
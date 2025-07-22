 


import { ValidationErrors } from "@/validations/auth";
import { InputTypes } from "@/app/constants/enums";
import { IFormField } from "@/lib/types/app";
import PasswordField from "./password-field";
import TextField from "./text-field";

interface Props extends IFormField {
  error: ValidationErrors;
}

const FormFields = (props: Props) => {
  const { type } = props;
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;
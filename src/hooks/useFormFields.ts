import { Pages, Routes } from "@/app/constants/enums"
import { IFormField, IFormFieldsVariables } from "@/lib/types/app"


const useFormFields = ({ slug }: IFormFieldsVariables) => {
  const loginFaileds = () : IFormField[] => [
    {
      label: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      autoFocus: true
    },
    {
      label: 'password',
      type: 'password',
      name: 'password',
      placeholder: 'Enter your password',
    },
  ]
  const signUpFeilds = (): IFormField[] => [
    {
      label: 'name',
      name: 'name',
      type: 'text', 
      placeholder: 'Enter your name',
      autoFocus: true
    }, {
      label: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      autoFocus: true
    },
    {
      label: 'password',
      type: 'password',
      name: 'password',
      placeholder: 'Enter your password',
    },{
      label: 'confirm Password',
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'confirm Password'
    }
  ]
  const profileFields = (): IFormField[] => [
    {
      label: 'Name',
      name: "name",
      type: "text",
      placeholder: 'Enter your name',
      autoFocus: true,
    },
    {
      label: 'Email',
      name: "email",
      type: "email",
      placeholder: 'Enter your email',
    },
    {
      label: 'Phone',
      name: "phone",
      type: "text",
      placeholder: 'Enter your phone number ',
    },
    {
      label: 'Street Address',
      name: "streetAddress",
      type: "text",
      placeholder: 'Enter your street address',
    },
    {
      label: 'Postal Code',
      name: "postalCode",
      type: "text",
      placeholder:'Enter your postal code',
    },
    {
      label: 'City Name',
      name: "city",
      type: "text",
      placeholder: 'Enter your city name',
    },
    {
      label: 'State Name',
      name: "country",
      type: "text",
      placeholder: 'Enter your state name',
    },
  ];
  const getFormFaileds = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN : 
        return loginFaileds();
      case Pages.Register: 
        return signUpFeilds();
      case Routes.PROFILE: 
        return profileFields();
      default : 
        return [];
    }
  }
  return {getFormFaileds}

}


export default useFormFields
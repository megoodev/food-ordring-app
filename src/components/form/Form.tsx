'use client'

import { InputTypes, Routes } from "@/app/constants/enums"
import { Button } from "../ui/button"
import useFormFields from "@/hooks/useFormFields"
import FormFields from "@/app/_components/form-fields/form-fields"
import { IFormField } from "@/lib/types/app"
import { useActionState, useEffect, useState } from "react"
import { updateProfile } from "@/app/profile/_actions/profile"
import { ValidationErrors } from "@/validations/auth"

import { Session } from "next-auth"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { Label } from "../ui/label"
import { CameraIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { UserRole } from "@prisma/client"
import Checkbox from "@/app/_components/form-fields/checkbox"




const Form = ({ user }: { user: Session['user'] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(user?.image ?? '')
  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);
  const formData = new FormData()
  const session = useSession();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData,
  };
  const { getFormFaileds } = useFormFields({ slug: Routes.PROFILE })

  const [state, action, pending] = useActionState(updateProfile.bind(null, isAdmin), initialState)



  useEffect(() => {
    if (state.status === 200) {
      toast.success(state?.message as string || "Profile updated successfully");
    }
  }, [state.status, state?.message]);
  useEffect(() => {
    setSelectedImage(user.image as string);
  }, [user.image]);
  return (
    <form action={action}>
      <div className='flex  items-start mt-5 gap-10'>
        <div className='mt-5 rounded-full overflow-hidden relative w-32 h-32'>
          <Image src={selectedImage} alt="user-image" fill />
          <div className="absolute -top-2 -right-2 hover:opacity-100 opacity-20 transition-opacity duration-300">
            <UploadImage setSelectedImage={setSelectedImage} />
          </div>
        </div>


        <div className='flex-1 w-full p-5 rounded-lg'>
          {getFormFaileds().map((field: IFormField) => {
            const fieldValue = state?.formData?.get(field.name) ?? formData.get(field.name) as FormDataEntryValue | undefined;
            return (
              <div key={field.name} className="mb-4">
                <FormFields {...field} error={state?.error} defaultValue={fieldValue as string} readOnly={field.type === InputTypes.EMAIL} />
              </div>
            )
          })}
          {session.data?.user.role === UserRole.ADMIN && (
            <div className="flex items-center gap-2 my-4">
              <Checkbox
                name="admin"
                checked={isAdmin}
                onClick={() => setIsAdmin(!isAdmin)}
                label="Admin"
              />
            </div>
          )}


          <Button type="submit" className="w-full" disabled={pending}>{pending ? 'loading...' : 'Save'}</Button>
        </div>
      </div>
    </form>

  )
}

export default Form



const UploadImage = ({ setSelectedImage }: { setSelectedImage: (image: string) => void }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage(url);

    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        name="image"
        id="image-upload"
      />
      <Label htmlFor="image-upload" className="cursor-pointer rounded-full w-36 h-36 hover:bg-gray-50/10 element-center">
        <CameraIcon />
      </Label>
    </>
  );
}
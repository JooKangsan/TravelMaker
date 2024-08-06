import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import getInputColorStatus from "./getInputColorStatus";

interface TextAreaProps extends React.PropsWithChildren {
  register: UseFormRegisterReturn;
  name: string;
  placeholder: string;
  error: FieldError | undefined;
  touched: boolean | undefined;
}

export default function TextArea({ register, name, placeholder, error, touched }: TextAreaProps) {
  return (
    <div className="flex-col gap-[10px]">
      <textarea
        {...register}
        id={name}
        placeholder={placeholder}
        className={`h-[200px] w-full resize-none rounded-10 bg-gray-200 px-[10px] py-[10px] outline-none ${getInputColorStatus(error, touched)}`}
      />
      {error && <p className="text-[12px] font-normal leading-[18px] text-red">{error.message}</p>}
    </div>
  );
}
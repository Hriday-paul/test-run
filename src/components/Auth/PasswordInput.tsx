import React, { useCallback, useRef, useState } from "react";
import { UseFormRegister, FieldErrors, RegisterOptions, Path } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PasswordInputProps<T extends Record<string, any>> {
    name: Path<T>;
    label: string;
    placeholder?: string;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    isLarge?: boolean;
    validationRules: RegisterOptions<T, Path<T>>;
}

const PasswordInput = <T extends Record<string, any>>({
    name,
    label,
    placeholder = "Enter password",
    register,
    errors,
    isLarge = false,
    validationRules,
}: PasswordInputProps<T>) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleVisible = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    return (
        <div className="w-full mx-auto">
            <label htmlFor={name} className={`mb-1.5 font-popin block text-black ${!isLarge ? "text-sm" : ""}`}>
                {label}
                <span className="text-red-500 text-base ml-1">*</span>
            </label>
            <div className="relative">
                <input
                    type={isVisible ? "text" : "password"}
                    id={name}
                    placeholder={placeholder}
                    {...register(name, validationRules)}
                    ref={(e) => {
                        register(name).ref(e);
                        inputRef.current = e;
                    }}
                    className={`pr-10 w-full ${!isLarge ? "rounded-sm" : "rounded-md"} border bg-white py-2.5 px-4 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input font-figtree placeholder:font-poppins ${errors?.[name]
                        ? "border-danger"
                        : "border-stroke"
                        } ${!isLarge ? "text-sm" : ""}`}
                />
                <div className="absolute right-0 inset-y-0 flex items-center cursor-pointer" onClick={handleVisible}>
                    {!isVisible ? (
                        <IoEyeOffOutline className="text-gray-800 text-xl mr-3" />
                    ) : (
                        <IoEyeOutline className="text-gray-800 text-xl mr-3" />
                    )}
                </div>
            </div>
            {errors?.[name] && (
                <p className="text-orange-500 text-sm col-span-2 font-figtree">{errors?.[name]?.message as string}</p>
            )}
        </div>
    );
};

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

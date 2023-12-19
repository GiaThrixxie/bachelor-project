import React, { useState } from "react";

export default function Input({
    label,
    type = "text",
    placeholder = "",
    name,
    onChange,
    updateFields,
    defaultValue,
    errorMessage,
    maxLength,
    description,
    children,
    ...inputProps
  }) {
    // Update the value state to the value of the input field.
    const [value, setValue] = useState(defaultValue || "");
    const handleChange = (e) => {
      setValue(e.target.value);
      onChange?.(e);
    };
  
    return (
        <div className="group w-full relative">
        {label && (
          <label
            className={
              "first-letter:uppercase relative text-sm w-auto  group-focus-within:text-red-light text-white transform duration-300 z-10 font-bold h-min pl-4 " +
              (errorMessage ? "text-red-light " : "text-white ")
            }
          >
            {label}
            {/* if character exceeds max limit, it will turn red*/}
            {maxLength && (
              <span className={value?.length > maxLength ? "text-red-light" : ""}>
                {value?.length} / {maxLength}
              </span>
              )}
          </label>
        )}
        {children ? (
          children
        ) : type === "textarea" ? (
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={`min-h-[4rem] w-[680px] max-w-full bg-grey-dark rounded-lg border-2 px-2 py-2 ${errorMessage && "border-red-medium"}`}
            {...inputProps}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={`w-full bg-grey-dark rounded-lg border-b-2 px-2 py-2 ${errorMessage ? "border-red-light" : "border-grey-medium"}`}
            {...inputProps}
          />
        )}
        {errorMessage && <p className="my-1 text-red-light">{errorMessage}</p>}
      </div>
    );
  }

  /*<div className="mb-4 w-full last:mb-0">
        {label && (
          <label
            htmlFor={name}
            className={`flex justify-between font-semibold ${!description && "mb-1"}`}
          >
            <span>{label}</span>

            {maxLength && (
              <span className={value?.length > maxLength ? "text-red-500" : ""}>
                {value?.length} / {maxLength}
              </span>
            )}
          </label>
        )}
        {description && (
          <p className="mb-1 text-sm text-secondaryDark">{description}</p>
        )}
        {children ? (
          children
        ) : type === "textarea" ? (
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={updateFields | handleChange}
            className={`min-h-[4rem] w-[680px] max-w-full rounded-lg border-2 px-2 py-2 ${errorMessage && "border-red-500"}`}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={updateFields | handleChange}
            className={`w-full rounded-lg border-2 px-2 py-2 ${errorMessage && "border-red-500"}`}
          />
        )}
        {errorMessage && <p className="my-1 text-red-500">{errorMessage}</p>}
      </div> */
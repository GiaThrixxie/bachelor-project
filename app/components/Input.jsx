import useState from "react";

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
              "first-letter:uppercase rounded-full relative text-sm w-auto group-focus-within:text-text-500 transform duration-300 z-10 font-bold h-min pl-4 " +
              (errorMessage ? "text-alert_red-500 " : "text-secondary-500 ")
            }
          >
            {label}
            {/* if character exceeds max limit, it will turn red*/}
            {maxLength && (
              <span className={value?.length > maxLength ? "text-red-500" : ""}>
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
            onChange={updateFields | handleChange}
            className={`min-h-[4rem] w-[680px] max-w-full rounded-lg border-2 px-2 py-2 ${errorMessage && "border-red-500"}`}
            {...inputProps}
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
            {...inputProps}
          />
        )}
        {errorMessage && <p className="my-1 text-red-500">{errorMessage}</p>}


        <div className="w-full flex items-center relative">
          <input
            type={type}
            value={value}
            name={name}
            id={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={
              (className
                ? className
                : "bg-primary-200 border-2 focus:outline-none rounded-lg py-1 h-8 block w-full mb-1 ") +
              (errorMessage
                ? "border-alert_red-500 placeholder-alert_red-500 "
                : "border-primary-300 focus:border-primary-600 placeholder-primary-500 ")
            }
            placeholder={errorMessage ? errorMessage : placeholder && placeholder}
            onChange={updateFields | onChange}
          ></input>
          {required === true && (
            <TbAsterisk
              size={16}
              className={
                "absolute right-4 top-2 " +
                (errorMessage ? "stroke-alert_red-500" : "stroke-primary-500")
              }
            />
          )}
        </div>
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
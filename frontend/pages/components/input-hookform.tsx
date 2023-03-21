const InputHookform = ({
    entries,
    placeholder,
    register,
    errors,
    name,
    RegisterOptions,
    type,
  }: {
    entries: string;
    placeholder: string;
    register: any;
    name: string;
    RegisterOptions: any;
    errors: any;
    type: string;
  }) => {
    return (
      <div className="mt-5">
        <div className="flex justify-between">
          <h1 className="text-gray-700 ml-8">{entries}</h1>
        </div>
        <input
          type={type}
          className="block w-10/12 p-2 pl-2 text-sm mx-8 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-700 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          placeholder={placeholder}
          {...register(name, RegisterOptions)}
        />
        {errors && <p className="ml-8 text-red-500">{errors.message}</p>}
      </div>
    );
  };
  
  export default InputHookform;
  
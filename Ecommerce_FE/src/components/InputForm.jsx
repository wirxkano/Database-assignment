
function InputForm({ id, name, type, placeholder }) {
  return (
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="block w-full h-11 rounded-xl border-none bg-gray-100 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm/6"
      />
    </div>
  );
}

export default InputForm;
export default function Button ({ title, id, type="button", onClick, disabled=false, children }) {
    

    return (
        <button id={id} type={type} onClick={onClick} disabled={disabled} className="text-white font-bold py-2 px-4 rounded-lg bg-red-light m-4 hover:bg-red-medium transform duration-300">
            {title}
            {children}
        </button>
    )
}
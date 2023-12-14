export default function InfoWLabel (
    title,
    body,
    highlightedBodyStart,
    marginBottom = true,
    margin = "mb-4"
) {
    
    return (
        <div className={`${marginBottom == true && margin}`}>
            <h4>{title}</h4>
            {highlightedBodyStart && <p className="font-bold">{highlightedBodyStart}</p>}
            <p>{body}</p>
        </div>
    )
}
import { TbHexagon, TbHexagonFilled, TbDroplet, TbDropletFilled } from "react-icons/tb";

export default function Dots (
    maxTotalDots = 5,
    currentAmount = 0,
    currentTotal = 0,
    iconType = "hexagon" || "droplet",
    title,
    filledColour = "bg-red-500" || "bg-grey-light",
    emptyColour = "bg-red-500" || "bg-white"
) {
    let FilledIcon;
    let EmptyIcon;

    switch (iconType) {
        case "droplet":
            FilledIcon = TbDropletFilled;
            EmptyIcon = TbDroplet;
            break;
        case "hexagon":
            FilledIcon = TbHexagonFilled;
            EmptyIcon = TbHexagon;
            break;
        default:
            break;
    }
    
    return (
        <div className="flex flex-column justify-center">
            <p>{title}</p>
            <div className="flex flex-row justify-center">
                {[...Array(maxTotalDots)].map((e, index) => {

                    return (
                        <>
                            {index < currentAmount ? 
                            <FilledIcon key={index} size={20} className={filledColour? filledColour : "bg-white"}/>
                            : 
                            index < currentTotal ? 
                            <EmptyIcon key={index} size={20} className={filledColour? filledColour : "bg-white"}/>
                            : 
                            <EmptyIcon key={index} size={20} className={emptyColour? emptyColour : "bg-grey-light"}/>}
                        </>
                    )
                })}
            </div>
        </div>
    )
}

/*
    let filledIcon;
    let emptyIcon;
    let drainedIcon;

    switch (iconType) {
        case "drop":
            filledIcon = <TbDropletFilled size={20} color={dotColour}/>;
            emptyIcon = <TbDroplet size={20} color={outlineColour}/>;
            drainedIcon = <TbDroplet size={20} color={dotColour}/>;
            break;
        case "hexagon":
            filledIcon = <TbHexagonFilled size={20} color={dotColour}/>;
            emptyIcon = <TbHexagon size={20} color={outlineColour}/>;
            drainedIcon = <TbHexagon size={20} color={dotColour}/>;
            break;
        default:
            break;
    }

    {index <= currentAmount ? 
    <TbHexagonFilled key={index} size={20} color="red"/> 
    : 
    index <= currentTotal ? 
    <TbHexagon key={index} size={20} color="red"/> 
    : 
    <TbHexagon key={index} size={20} color="grey"/>}

    <div key={index} >
    {index <= currentAmount ? 
    filledIcon
    : 
    index <= currentTotal ? 
    drainedIcon
    : 
    emptyIcon}
</div>
<>
    {index <= currentAmount ? 
    <FilledIcon key={index} size={20} color={filledColour? filledColour : "red"}/>
    : 
    index <= currentTotal ? 
    <EmptyIcon key={index} size={20} color={filledColour? filledColour : "red"}/>
    : 
    <EmptyIcon key={index} size={20} color={emptyColour? emptyColour : "grey"}/>}
</>

*/
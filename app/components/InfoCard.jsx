import Dots from './Dots';

export default function InfoCard ({
    title = "",
    subtitle = "",
    description ="",
    subDescription ="",
    type = "",
    subType ="",
    parentBackgroundColour = "bg-grey-dark" || "bg-grey-darkest" || "bg-red-medium" || "other",
    customBorderColour,
    customTopColour,
    customBottomColour,

    hasDots = true,
    maxTotalDots = 5,
    currentAmount = 1,
    currentTotal = 0,
    iconType = "hexagon" || "droplet",
    filledColour = "bg-red-500" || "bg-grey-light",
    emptyColour = "bg-red-500" || "bg-white",
}) {
    let borderColour;
    let topColour;
    let bottomColour;

    switch (parentBackgroundColour) {
        case "bg-grey-dark":
            borderColour = "border-red-medium";
            topColour = "bg-grey-darkest";
            bottomColour = "bg-grey-dark";
            break;

        case "bg-red-medium":
            borderColour = "border-grey-light";
            topColour = "bg-grey-dark";
            bottomColour = "bg-grey-darkest";
            break;
        default:
            borderColour = "border-red-medium";
            topColour = "bg-grey-dark";
            bottomColour = "bg-grey-darkest";
            break;
    }

    switch (Array.isArray(subtitle)) {
        case true:
            subtitle = subtitle.join(", ");
            break;
        case false: 
            break;
        default:
            break;
    }
    
    return (
        <div className={`flex flex-col border-l-2 ${customBorderColour? customBorderColour : borderColour}`}>
            <div className={`w-full max-h-min p-2 ${customTopColour? customTopColour : topColour}`}>
                {hasDots === true ? 
                    <Dots title={title} currentAmount={currentAmount} currentTotal={currentTotal} maxTotalDots={maxTotalDots} iconType={iconType} filledColour={filledColour} emptyColour={emptyColour}/>
                 : <h3 className="text-white">{title}</h3>}
                {subtitle && <h4>{subtitle}</h4>}
            </div>
            <div className={`w-full max-h-min p-4 flex flex-col space-y-2 ${customBottomColour? customBottomColour : bottomColour}`}>
                {description !== "" && <p>{description}</p>}
                {subDescription !== "" && <h4>{subDescription}</h4>}
                {type !== "" && subType !== ""? 
                    <div className="flex flex-row justify-between">
                        <h4>{type}</h4>
                        <h4 className="text-red-light">{subType}</h4>
                    </div> 
                : 
                type !=="" && 
                    <h4>{type}</h4>
                }
            
            </div>
        </div>
    )
}

/*    switch (parentBackgroundColour) {
        case "bg-grey-dark":
            borderColour = "bg-red-medium";
            topColour = "bg-grey-medium";
            bottomColour = "bg-grey-darker";
            break;

        case "bg-red-medium":
            borderColour = "bg-grey-light";
            topColour = "bg-grey-darker";
            bottomColour = "bg-grey-dark";
            break;
        default:
            borderColour = "bg-red-medium";
            topColour = "bg-grey-darker";
            bottomColour = "bg-grey-dark";
            break;
    }
     */

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
import { TbHexagon, TbHexagonFilled, TbDroplet, TbDropletFilled, TbChevronRight } from "react-icons/tb";
import Tooltip from '@components';
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

export default function Dots (
    maxTotalDots = 5,
    currentAmount = 0,
    defaultValue,
    currentTotal = 0,
    iconType = "hexagon" || "droplet",
    title,
    additionalClassNames,
    specialties,
    filledColour = "bg-red-500" || "bg-grey-light",
    emptyColour = "bg-red-500" || "bg-white",
    editable = false,
    radioGroupName,
    pointsAvailable,
    onChange
) {
    let dotAmount;
    const [value, setValue] = useState(defaultValue || "");
    const handleChange = (e) => {
      setValue(e.target.value);
      dotAmount = e.target.value;
      onChange(radioGroupName, dotAmount);
    };

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
            FilledIcon = TbHexagonFilled;
            EmptyIcon = TbHexagon;
            break;
    }
    
    return (
        <div className={`flex flex-column justify-center ${additionalClassNames}`}>
            {title && <p>{title}</p>}
            {editable===true ? 
                <RadioGroup defaultValue={value} onChange={handleChange} name={`${radioGroupName}`} className="flex flex-row justify-center">
                    {[...Array(maxTotalDots)].map((e, index) => (
                        <RadioGroup.Option key={index} value={index+1} className="flex flex-row justify-center" disable={pointsAvailable[index] == 0 ? true : false}>
                            {index < dotAmount ? 
                            <FilledIcon key={index} size={20} className={filledColour? filledColour : "bg-white"}/>
                            : 
                            index < currentTotal ? 
                            <EmptyIcon key={index} size={20} className={filledColour? filledColour : "bg-white"}/>
                            : 
                            <EmptyIcon key={index} size={20} className={emptyColour? emptyColour : "bg-grey-light"}/>
                            }
                        </RadioGroup.Option>
                    ))}
                </RadioGroup>
                :  
                <div className="flex flex-row justify-center">
                    {[...Array(maxTotalDots)].map((e, index) => (
                        <>
                        {index < currentAmount ? 
                        <FilledIcon key={index} size={20} className={filledColour? filledColour : "bg-white"}/>
                        : 
                        index < currentTotal ? 
                        <EmptyIcon key={index} size={20} className={filledColour? filledColour : "bg-white"}/>
                        : 
                        <EmptyIcon key={index} size={20} className={emptyColour? emptyColour : "bg-grey-light"}/> 
                        }
                        </>
                    ))}
                </div>
                
            }
            {specialties &&<Tooltip contentArray={specialties} children={<><h3 className="mr-1.5">Specialties</h3><TbChevronRight className="bg-red-medium"/></>}/>}
        </div>
    )
}

/*

<><h3>Specialties</h3><TbChevronRight className="bg-red-medium"/></>
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
import React, { useState } from "react";
import Dots from '@components';

export default function Tooltip ({contentArray, contentObject, children, position = "top"}) {
    const [isHovered, setIsHovered] = useState(false);

    switch (position) {
        case "top":
            position = "top-0 left-1/2 -translate-x-1/2 -translate-y-full";
            break;
        case "bottom":
            position = "bottom-0 left-1/2 -translate-x-1/2 translate-y-full";
            break;
        case "left":
            position = "left-0 top-1/2 -translate-x-full -translate-y-1/2";
            break;
        case "right":
            position = "right-0 top-1/2 translate-x-full -translate-y-1/2";
            break;
        default:
            position = "top-0 left-1/2 -translate-x-1/2 -translate-y-full";
    }



    return (
        <div className="flex items-center justify-center relative h-7">
            <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </div>

            {isHovered && (
                contentArray ?
                <ul
                className={`flex bg-grey-lighter p-2 rounded-sm z-50 transform list-none ${position} before:hidden `}
                >
                    {contentArray.map((content, index) => (
                        <li className="text-white" key={index}>{content}</li>
                    ))}
                </ul>
                :
                contentObject &&
                <div className={`bg-grey-lighter p-2 rounded-sm z-50 transform ${position} before:hidden `}>
                    <h3 className="text-red-medium">{contentObject.title}</h3>
                    {contentObject.distillationMethod && <p className="text-white"><span className="font-bold pr-1">Distillation method:</span>{contentObject.distillationMethod}</p> } {/* Only applicable to Thin-Blood Alchemy */}
                    {contentObject.amalgam && <div><p className="text-white"><span className="font-bold pr-1">Amalgam:</span>{contentObject.amalgam.discipline}</p><Dots maxTotalDots={contentObject.amalgam.dotAmount} currentAmount={contentObject.amalgam.dotAmount} /></div>}
                    <p className="text-white">{contentObject.description}</p>
                    {contentObject.ingredients && <p className="text-white"><span className="font-bold pr-1">Ingredients:</span>{contentObject.ingredients}</p> }
                    {contentObject.process && <p className="text-white"><span className="font-bold pr-1">Process:</span>{contentObject.process}</p>}
                    {contentObject.cost && <p className="text-white"><span className="font-bold pr-1">Cost:</span>{contentObject.cost}</p> }
                    {contentObject.dicePools && <>
                    <p className="text-white"><span className="font-bold pr-1">Dice Pools:</span></p>
                            {contentObject.dicePools.user && <p className="text-white"><span className="pr-1">User:</span>{contentObject.dicepools.user[0]}+{contentObject.dicepools.user[1]}</p>}
                            {contentObject.dicePools.userAlt && <p className="text-white"><span className="pr-1">User alternative:</span>{contentObject.dicepools.userAlt[0]}+{contentObject.dicepools.userAlt[1]}</p>}
                            {contentObject.dicePools.target && <p className="text-white"><span className="pr-1">Target:</span>{contentObject.dicepools.target[0]}+{contentObject.dicepools.target[1]}</p>}
                            {contentObject.dicePools.targetAlt && <p className="text-white"><span className="pr-1">Target alternative:</span>{contentObject.dicepools.targetAlt[0]}+{contentObject.dicepools.targetAlt[1]}</p>}
                        </>
                    }
                    {contentObject.system && <p className="text-white"><span className="font-bold pr-1">System:</span>{contentObject.system}</p> }
                    {contentObject.duration && <p className="text-white"><span className="font-bold pr-1">Duration:</span>{contentObject.duration}</p> }
                </div>
            )}
        </div>
    );
};
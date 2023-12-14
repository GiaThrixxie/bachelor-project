import React from 'react';
import Dots from '@components';

export default function ListCoreTraits ({dataArray, pointsAvailable, onChange, editable, attributesOrSkills, category, allCategories = false, topBorder = false, actionData }) {
    let filteredData;

    let borderClasses;
    let borderColour;
    let additionalClasses;

    const attributesOrder = [
        "Strength",
        "Dexterity",
        "Stamina",
        "Charisma",
        "Manipulation",
        "Composure",
        "Intelligence",
        "Wits",
        "Resolve"
    ];

    const typeOrder = [
        "physical",
        "social",
        "mental"
    ]

    switch (attributesOrSkills) {
        case "attributes":
            if (allCategories === true) {
                filteredData = dataArray.sort((a, b) =>
                attributesOrder[a.title] - attributesOrder[b.title]);// Sorts using the attributesOrder array
            } else {
            filteredData = dataArray.filter(data => data.category === `${category}`).sort((a, b) =>
            attributesOrder[a.title] - attributesOrder[b.title]); // Sorts using the attributesOrder array
            }
            break;
        case "skills":
            if (allCategories === true) {
                filteredData = dataArray.sort((a, b) =>
                    (typeOrder[a.category] - typeOrder[b.category]) ? -1 : // Sorts using the typeOrder array
                    (typeOrder[a.category] === typeOrder[b.category] ? // If the category is the same,
                        (a.title > b.title ? 1 : -1) // sort alphabetically
                    : 1)
                );
            } else {
                filteredData = dataArray.filter(data => data.category === `${category}`).sort((a, b) =>
                a.title > b.title ? 1 : -1); // Sorts alphabetically
            }
            break;
        default:
            if (allCategories === true) {
                filteredData = dataArray.sort((a, b) =>
                    (typeOrder[a.category] - typeOrder[b.category]) ? -1 : // Sorts using the typeOrder array
                    (typeOrder[a.category] === typeOrder[b.category] ? // If the category is the same,
                        (a.title > b.title ? 1 : -1) // sort alphabetically
                    : 1)
                );
            } else {
                filteredData = dataArray.filter(data => data.category === `${category}`).sort((a, b) =>
                a.title > b.title ? 1 : -1); // Sorts alphabetically
            }
            break;
    }

    return (
        <>
        {filteredData.map((data, index) => {
            let preDefaultValue = attributesOrSkills + '_' + data.title;
            let defaultValue = actionData?.values?.[preDefaultValue];
            
            switch (index) {
                // First row
                case 0:
                case 3:
                case 6:
                case 9:
                case 12:
                case 15:
                case 18:
                case 21:
                case 24:
                    borderColour = (attributesOrSkills === "attributes") ? "border-red-dark" : "border-grey-darkest";
                    borderClasses = (topBorder === true) ? `border-b-2 ${borderColour}` : "";
                    additionalClasses = "mt-7";
                    break;
        
                // Second row
                case 1:
                case 4:
                case 7:
                case 10:
                case 13:
                case 16:
                case 19:
                case 22:
                case 25:
                    break;
        
                // Third row
                case 2:
                case 5:
                case 8:
                case 11:
                case 14:
                case 17:
                case 20:
                case 23:
                case 26:
                    borderColour = (attributesOrSkills === "attributes") ? "border-red-dark" : "border-grey-darkest";
                    borderClasses = (topBorder === true) ? `border-b-2 ${borderColour}` : "";
                    break;
                default:
                    break;
            }
            return (
                <>
                <Dots key={index} title={data.title} onChange={onChange} pointsAvailable={pointsAvailable} defaultValue={defaultValue} radioGroupName={editable===true && `${attributesOrSkills}_${data.title}`} editable={editable} currentAmount={data.currentDotAmount} additionalClassNames={`${borderClasses} ${data.specialties.length > 0 ? "" : "mb-7"} ${additionalClasses}`} specialties={data.specialties}/>
            </>
            )
        })}
        </>
    )
}

/*
switch (attributesOrSkills) {
        case "attributes":
            if (allCategories === true) {
                filteredData = characterData.attributes.sort((a, b) =>
                attributesOrder[a.title] - attributesOrder[b.title]);// Sorts using the attributesOrder array
            } else {
            filteredData = characterData.attributes.filter(data => data.category === `${category}`).sort((a, b) =>
            attributesOrder[a.title] - attributesOrder[b.title]); // Sorts using the attributesOrder array
            }
            break;
        case "skills":
            if (allCategories === true) {
                filteredData = characterData.skills.sort((a, b) =>
                    (typeOrder[a.type] - typeOrder[b.type]) ? -1 : // Sorts using the typeOrder array
                    (typeOrder[a.type] === typeOrder[b.type] ? // If the type is the same,
                        (a.title > b.title ? 1 : -1) // sort alphabetically
                    : 1)
                );
            } else {
                filteredData = characterData.skills.filter(data => data.category === `${category}`).sort((a, b) =>
                a.title > b.title ? 1 : -1); // Sorts alphabetically
            }
            break;
        default:
            if (allCategories === true) {
                filteredData = characterData.skills.sort((a, b) =>
                    (typeOrder[a.type] - typeOrder[b.type]) ? -1 : // Sorts using the typeOrder array
                    (typeOrder[a.type] === typeOrder[b.type] ? // If the type is the same,
                        (a.title > b.title ? 1 : -1) // sort alphabetically
                    : 1)
                );
            } else {
                filteredData = characterData.skills.filter(data => data.category === `${category}`).sort((a, b) =>
                a.title > b.title ? 1 : -1); // Sorts alphabetically
            }
            break;
    }





{filteredData.map((data, index) => (
            <Dots key={index} title={data.title} currentAmount={data.currentDotAmount} additionalClassNames={`${borderClasses} ${data.specialties.length > 0 ? "" : "mb-7"} ${additionalClasses}`} specialties={data.specialties}/>
        ))}
    attributesOrSkills === "attributes" ? borderColour = "border-red-dark" : "border-grey-darkest";
    topBorder === true ? borderClasses = `border-b-2 ${borderColour}` : "";

    {filteredData.map((data, index) => {
            switch (index) {
                // First row
                case 0:
                case 3:
                case 6:
                case 9:
                case 12:
                case 15:
                case 18:
                case 21:
                case 24:
                    borderColour = (attributesOrSkills === "attributes") ? "border-red-dark" : "border-grey-darkest";
                    borderClasses = (topBorder === true) ? `border-b-2 ${borderColour}` : "";
                    additionalClasses = "mt-7";
                    break;
        
                // Second row
                case 1:
                case 4:
                case 7:
                case 10:
                case 13:
                case 16:
                case 19:
                case 22:
                case 25:
                    break;
        
                // Third row
                case 2:
                case 5:
                case 8:
                case 11:
                case 14:
                case 17:
                case 20:
                case 23:
                case 26:
                    borderColour = (attributesOrSkills === "attributes") ? "border-red-dark" : "border-grey-darkest";
                    borderClasses = (topBorder === true) ? `border-b-2 ${borderColour}` : "";
                    break;
                default:
                    break;
            }
            return (
                <Dots key={index} title={data.title} currentAmount={data.currentDotAmount} additionalClassNames={`${borderClasses} ${data.specialties.length > 0 ? "" : "mb-7"} ${additionalClasses}`} specialties={data.specialties}/>
            )
        })}

        switch (index) {
        // First row
        case 0:
        case 3:
        case 6:
        case 9:
        case 12:
        case 15:
        case 18:
        case 21:
        case 24:
            borderColour = (attributesOrSkills === "attributes") ? "border-red-dark" : "border-grey-darkest";
            borderClasses = (topBorder === true) ? `border-b-2 ${borderColour}` : "";
            additionalClasses = "mt-7";
            break;

        // Second row
        case 1:
        case 4:
        case 7:
        case 10:
        case 13:
        case 16:
        case 19:
        case 22:
        case 25:
            break;

        // Third row
        case 2:
        case 5:
        case 8:
        case 11:
        case 14:
        case 17:
        case 20:
        case 23:
        case 26:
            borderColour = (attributesOrSkills === "attributes") ? "border-red-dark" : "border-grey-darkest";
            borderClasses = (topBorder === true) ? `border-b-2 ${borderColour}` : "";
            break;
        default:
            break;
    }

*/
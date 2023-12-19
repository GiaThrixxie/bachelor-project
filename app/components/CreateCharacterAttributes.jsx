import ListCoreTraits from "./ListCoreTraits";
import Section from "./Section";
import { useState } from "react";

export default function CreateCharacterAttributes ({title, loaderData, updateFields}) {
    const attributes = loaderData[0];
    const attributeDistribution = loaderData[1];

    let [attributesAmount, setAttributesAmount] = useState({});

    let amountArray = Object.values(attributesAmount);
    let attributesAtDotAmount = {};
    for (const num of amountArray) {
        attributesAtDotAmount[num] = (attributesAtDotAmount[num] || 0) + 1
    }

    let pointsAvailable = {
        at1: attributeDistribution.attributesAtOne - attributesAtDotAmount[1],
        at2: attributeDistribution.attributesAtTwo - attributesAtDotAmount[2],
        at3: attributeDistribution.attributesAtThree - attributesAtDotAmount[3],
        at4: attributeDistribution.attributesAtFour - attributesAtDotAmount[4],
    };

    let handleAttributeAmountChange = (attribute, amount) => {
        setAttributesAmount({...attributesAmount, [attribute]: amount});
    };

    const updateState = (attribute, e) => {
        setAttributesAmount({...attributesAmount, [attribute]: e});
        updateFields({clan: e});
        return setAttributesAmount({...attributesAmount, [attribute]: e});
    }


    return (
        <>
            <Section title={title} width="w-3/4" height="h-full" backgroundColour="bg-grey-darker" bodyClassNames="grid grid-cols-1 grid-rows-9">
                    <ListCoreTraits dataArray={attributes} onChange={handleAttributeAmountChange} pointsAvailable={pointsAvailable} attributesOrSkills="attributes" allCategories={true} topBorder={true} editable={true}/>
            </Section>
            <div className="h-full w-1/4">
                <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
                <div className="w-full">
                    <h2>Attributes</h2>
                    <h3>Distribution</h3>
                    <ul>
                        <li>4 Dots: {attributesAtDotAmount[4]> 0 ? attributesAtDotAmount[4] : attributeDistribution.attributesAtFour}/{attributeDistribution.attributesAtFour}</li>
                        <li>3 Dots: {attributesAtDotAmount[3]> 0 ? attributesAtDotAmount[3] : attributeDistribution.attributesAtThree}/{attributeDistribution.attributesAtThree}</li>
                        <li>2 Dots: {attributesAtDotAmount[2]> 0 ? attributesAtDotAmount[2] : attributeDistribution.attributesAtTwo}/{attributeDistribution.attributesAtTwo}</li>
                        <li>1 Dot: {attributesAtDotAmount[1]> 0 ? attributesAtDotAmount[1] : attributeDistribution.attributesAtOne}/{attributeDistribution.attributesAtOne}</li>
                    </ul>
                </div>
            </div>
        </>
        
    );
}
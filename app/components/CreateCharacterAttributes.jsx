import ListCoreTraits from "@components";
import Section from "./Section";
import db from "../../firebase";
import { getDocs, getDoc, doc, collection} from "firebase/firestore";
import { useLoaderData } from "remix";
import { useState } from "react";


export async function loader() {
    let attributes  = [];
    let category;

    const categoryQuerySnapshot = await getDoc(doc(db, "games", "VTM_5e", "coreTraits", "attributes")); 
    categoryQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        category = doc.data();
        return category;
      });

    const attributesQuerySnapshot = await getDocs(collection(db, "games", "VTM_5e", "coreTraits", "attributes", "data")); 
    attributesQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        attributes.push({ id: doc.id, ...doc.data() });
        return attributes;
      });
    return (
      { attributes, category }
      )
  };

export default function CreateCharacterAttributes ({title, actionData}) {
    const { attributes, category } = useLoaderData();
    let [attributesAmount, setAttributesAmount] = useState({});

    let amountArray = Object.values(attributesAmount);
    let attributesAtDotAmount = {};
    for (const num of amountArray) {
        attributesAtDotAmount[num] = (attributesAtDotAmount[num] || 0) + 1
    }

    let pointsAvailable = {
        at1: category.distribution.attributesAtOne - attributesAtDotAmount[1],
        at2: category.distribution.attributesAtTwo - attributesAtDotAmount[2],
        at3: category.distribution.attributesAtThree - attributesAtDotAmount[3],
        at4: category.distribution.attributesAtFour - attributesAtDotAmount[4],
    };

    let handleAttributeAmountChange = (attribute, amount) => {
        setAttributesAmount({...attributesAmount, [attribute]: amount});
    };


    return (
        <>
            <Section title={title} width="w-3/4" height="h-full" backgroundColour="bg-grey-darker" bodyClassNames="grid grid-cols-1 grid-rows-9">
                    <ListCoreTraits dataArray={attributes} onChange={handleAttributeAmountChange} pointsAvailable={pointsAvailable} attributesOrSkills="attributes" allCategories={true} topBorder={true} editable={true}/>
            </Section>
            <div className="h-full w-1/4">
                <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
                <div className="w-full">
                    <h2>Attributes</h2>
                    {category.descriptions.map((description, index) => (
                        <div key={index} className={index !== 0 && "border-t-2 border-grey-medium"}>
                            <h3>{index == 0 ? "Mental" : index == 1 ? "Physical" : "Social"}</h3>
                            <p>{description}</p>
                        </div>
                    ))}
                    <h3>Distribution</h3>
                    <ul>
                        <li>4 Dots: {attributesAtDotAmount[4]}/{category.distribution.attributesAtFour}</li>
                        <li>3 Dots: {attributesAtDotAmount[3]}/{category.distribution.attributesAtThree}</li>
                        <li>2 Dots: {attributesAtDotAmount[2]}/{category.distribution.attributesAtTwo}</li>
                        <li>1 Dot: {attributesAtDotAmount[1]}/{category.distribution.attributesAtOne}</li>
                    </ul>
                </div>
            </div>
        </>
        
    );
}
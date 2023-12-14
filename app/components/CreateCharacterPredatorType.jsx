import Section from "./Section";
import db from "../../firebase";
import { getDocs, collection} from "firebase/firestore";
import { useLoaderData } from "remix";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Tooltip from "./Tooltip";
import Dots from "@components";


export async function loader() {
    let predatorTypes  = [];

    const querySnapshot = await getDocs(collection(db, "games", "VTM_5e", "character", "predatorTypes", "data")); 
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        predatorTypes.push({ id: doc.id, ...doc.data() });
        return predatorTypes;
      });

      /*const profile = await Promise.all(querySnapshot.docs.map( async (doc) => {
        const stuffData = doc.data()
        stuffData.id = doc.id
        return stuffData
      }))*/
  
    return (
      { predatorTypes }
      )
  };

export default function CreateCharacterPredatorType ({title, actionData}) {
    const {predatorTypes} = useLoaderData();
    const [selectedPredatorType, setSelectedPredatorType] = useState(actionData?.values?.predatorType ? actionData?.values?.predatorType : predatorTypes[0].title);
    const [selectedAdvantage, setSelectedAdvantage] = useState(actionData?.values?.predatorTypeAdvantage ? actionData?.values?.predatorTypeAdvantage : null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(actionData?.values?.predatorTypeDiscipline ? actionData?.values?.predatorTypeDiscipline : null);
    const [selectedSpecialty, setSelectedSpecialty] = useState(actionData?.values?.predatorTypeSpecialty ? actionData?.values?.predatorTypeSpecialty : null);
    const [spendBetweenAdvantages, setSpendBetweenAdvantages] = useState(actionData?.values?.predatorTypeAdditionalAdvantages  ? actionData?.values?.predatorTypeAdditionalAdvantages : null);
    const [spendBetweenFlaws, setSpendBetweenFlaws] = useState(actionData?.values?.predatorTypeAdditionalFlaws  ? actionData?.values?.predatorTypeAdditionalFlaws : null);
    
    let predatorType = predatorTypes.filter(predatorType => predatorType.title === selectedPredatorType);

    return (
        <>
        <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex" backgroundColour="bg-grey-darker">
            <div className="w-1/3">
                <RadioGroup value={selectedPredatorType} onChange={setSelectedPredatorType} name="predatorType">
                    {predatorTypes.map((predatorType) => (
                    <RadioGroup.Option key={predatorType.id} value={predatorType.title}>
                        <div className="flex">
                            <h3>{predatorType.title}</h3>
                            <h4>{predatorType.summary}</h4>
                        </div>
                    </RadioGroup.Option>
                    ))}
                </RadioGroup>
            </div>
            <div className="w-2/3 bg-grey-dark flex">
                <div className="w-2/3">
                    <div className="h-1/4">
                        <h2>{predatorType.title}</h2>
                        {predatorType.gain.advantage.map((advantage, index) => (
                            <Tooltip key={index} contentArray={[predatorType.gain.advantage]}>
                                <p><span className="font-bold">Bane:</span> {predatorType.bane.title}</p>
                            </Tooltip>
                        ))

                            }
                        <Tooltip contentArray={[predatorType.gain.advantage]}>
                            <p><span className="font-bold">Bane:</span> {predatorType.bane.title}</p>
                        </Tooltip>
                        
                        <Tooltip contentArray={[predatorType.compulsion.description]}>
                            <p><span className="font-bold">Compulsion:</span> {predatorType.compulsion.title}</p>
                        </Tooltip>
                    </div>
                   <div className="bg-grey-darkest h-3/4"> 
                        <p>{predatorType.description}</p>
                        <div className="grid grid-cols-1 divide-y-2 border-grey-medium">
                            <h3>Choose</h3>
                            {predatorType.gain.chooseAdvantages && 
                                <RadioGroup value={selectedAdvantage} onChange={setSelectedAdvantage} name="predatorTypeDiscipline" >
                                    <RadioGroup.Label>Advantage</RadioGroup.Label>
                                    <div className="flex">
                                        {predatorType.gain.chooseAdvantage.map((discipline, index) => (
                                            <RadioGroup.Option key={index} value={discipline.title} 
                                            disabled={actionData?.values?.clan === discipline.unavailableIf ? true : (discipline.exclusiveTo && discipline.exclusiveTo !== actionData?.values.clan) ? true : false }
                                            className={`flex ${index > 0 && "border-l-2 border-grey-medium"}`}>
                                                <h3>{discipline.title}</h3>
                                                <Dots maxTotalDots={discipline.dotAmount} currentAmount={discipline.dotAmount} />
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            }
                            {predatorType.gain.chooseDisciplines && 
                                <RadioGroup value={selectedDiscipline} onChange={setSelectedDiscipline} name="predatorTypeDiscipline" >
                                    <RadioGroup.Label>Discipline</RadioGroup.Label>
                                    <div className="flex">
                                        {predatorType.gain.chooseDiscipline.map((discipline, index) => (
                                        <RadioGroup.Option key={index} value={discipline.title} 
                                        disabled={actionData?.values?.clan === discipline.unavailableIf ? true : (discipline.exclusiveTo && discipline.exclusiveTo !== actionData?.values.clan) ? true : false }
                                        className={`flex ${index > 0 && "border-l-2 border-grey-medium"}`}>
                                            <h3>{discipline.title}</h3>
                                            <Dots maxTotalDots={discipline.dotAmount} currentAmount={discipline.dotAmount} />
                                        </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            }
                            {predatorType.gain.chooseSpecialty && 
                                <RadioGroup value={selectedSpecialty} onChange={setSelectedSpecialty} name="predatorTypeSpecialty">
                                    <RadioGroup.Label>Specialty</RadioGroup.Label>
                                    <div className="flex">
                                        {predatorType.gain.chooseDiscipline.map((discipline, index) => (
                                        <RadioGroup.Option key={index} value={discipline.title} 
                                        disabled={actionData?.values?.clan === discipline.unavailableIf ? true : (discipline.exclusiveTo && discipline.exclusiveTo !== actionData?.values.clan) ? true : false }
                                        className={`flex ${index > 0 && "border-l-2 border-grey-medium"}`}>
                                            <h3>{discipline.title}</h3>
                                            <Dots maxTotalDots={discipline.dotAmount} currentAmount={discipline.dotAmount} />
                                        </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            }
                            {predatorType.gain.spendBetween && 
                                <>
                                    {predatorType.gain.spendBetween.filter(choice => choice.isFlaw !== true).length > 0 && 
                                        <RadioGroup value={spendBetweenAdvantages} onChange={setSpendBetweenAdvantages} name="predatorTypeAdditionalAdvantages">
                                            <RadioGroup.Label>Spend dots between the following</RadioGroup.Label>
                                            <div className="flex">
                                                {predatorType.gain.spendBetween.filter(choice => choice.isFlaw !== true).map((choice, index) => (
                                                    <>
                                                    <h3>{}/{choice.dotAmount} spent between</h3>
                                                        {choice.options.map(option => (
                                                            <RadioGroup.Option key={option} value={option.title}>
                                                            <h3>{option.title}</h3>
                                                            <Dots maxTotalDots={option.dotAmount} currentAmount={option.dotAmount} />
                                                        </RadioGroup.Option>
                                                        ))}
                                                    </>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    }
                                    {predatorType.gain.spendBetween.filter(choice => choice.isFlaw !== true).length > 0 && 
                                        <RadioGroup value={spendBetweenFlaws} onChange={setSpendBetweenFlaws} name="predatorTypeAdditionalFlaws">
                                            <RadioGroup.Label>Spend dots between the following</RadioGroup.Label>
                                            <div className="flex">
                                                {predatorType.gain.spendBetween.filter(choice => choice.isFlaw === true).map((choice, index) => (
                                                    <>
                                                    <h3>{}/{choice.dotAmount} spent between</h3>
                                                        {choice.options.map(option => (
                                                            <RadioGroup.Option key={option} value={option.title}>
                                                            <h3>{option.title}</h3>
                                                            <Dots maxTotalDots={option.dotAmount} currentAmount={option.dotAmount} />
                                                        </RadioGroup.Option>
                                                        ))}
                                                    </>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    }
                                </>
                            }
                        </div>
                   </div>
                </div>
                <div className="w-1/3">
                    <div className="h-1/4">
                    </div>
                    <div className="bg-grey-darkest h-3/4">
                        <h3>Gain:</h3>
                        <ul className="marker:text-red-medium">
                        {predatorType.gain.advantage.map((advantage, index) => (
                            <li key={index} className={`border-x-2 ${advantage.isFlaw === true ? "border-grey-medium" : "border-grey-medium"}`}>
                                <div className="flex">
                                    <h3>Gain the {advantage.title ? advantage.title : advantage.category} {advantage.type}</h3>
                                    <Dots maxTotalDots={advantage.dotAmount} currentAmount={advantage.dotAmount} />
                                </div>
                                {advantage.description && <p>{advantage.description}</p>}
                            </li>
                        ))}
                        {predatorType.gain.bloodPotency && <li>Gain {predatorType.gain.bloodPotency} Blood Potency</li>}
                        {predatorType.gain.humanity && <li>Gain {predatorType.gain.humanity} Humanity</li>}
                        </ul>
                        {predatorType.lose && <>
                            <h3>Lose:</h3>
                            <ul className="marker:text-red-medium">
                                {predatorType.lose.humanity && <li>Lose {predatorType.lose.humanity} Humanity</li>}
                            </ul>
                        </>}
                    </div>
                </div>
            </div>
        </Section>
        <div className="h-full w-1/4">
            <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
            <div className="w-full">
            </div>
        </div>
    </>
    );
}
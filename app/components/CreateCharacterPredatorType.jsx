import Section from "./Section";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Tooltip from "./Tooltip";
import Dots from "./Dots";
import { TbCalendarCancel } from "react-icons/tb";
import InfoCard from "./InfoCard";


export default function CreateCharacterPredatorType ({title, loaderData, updateFields, predatorType: chosenPredatorType, clan, advantage_predatorType, discipline_predatorType}) {
    const predatorTypes = loaderData;
    const [selectedPredatorType, setSelectedPredatorType] = useState(chosenPredatorType !== "" ? chosenPredatorType : predatorTypes[0].title);
    const [selectedAdvantage, setSelectedAdvantage] = useState(advantage_predatorType !== "" ? advantage_predatorType : null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(discipline_predatorType.title !== "" ? discipline_predatorType : null);
    const [selectedSpecialty, setSelectedSpecialty] = useState(specialty_predatorType ? specialty_predatorType : null);
    const [spendBetweenAdvantages, setSpendBetweenAdvantages] = useState(spentAdvantages_predatorType ? spentAdvantages_predatorType : null);
    const [spendBetweenFlaws, setSpendBetweenFlaws] = useState(spentFlaws_predatorType  ? spentFlaws_predatorType : null);
    
    let predatorType = predatorTypes.find(predatorType => predatorType.title === selectedPredatorType);
    
    const updateState = (e) => {
        setSelectedPredatorType(e);
        updateFields({predatorType: e});
        return setSelectedPredatorType(e);
    }

    return (
        <>
        <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex" backgroundColour="bg-grey-darker">
            <div className="w-1/3">
                <RadioGroup value={selectedPredatorType} onChange={updateState} name="predatorType">
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
                    </div>
                   <div className="bg-grey-darkest h-3/4"> 
                        <p>{predatorType.description}</p>
                        <div className="grid grid-cols-1 divide-y-2 border-grey-medium">
                            <h3>Choose</h3>
                            {predatorType.gain.chooseAdvantages && 
                                <RadioGroup value={selectedAdvantage} onChange={setSelectedAdvantage} name="predatorTypeDiscipline" >
                                    <RadioGroup.Label>Advantage</RadioGroup.Label>
                                    <div className="flex">
                                        {predatorType.gain.chooseAdvantage.map((advantage, index) => (
                                            <RadioGroup.Option key={index} value={advantage.title} 
                                            disabled={clan === advantage.unavailableIf ? true : (advantage.exclusiveTo && advantage.exclusiveTo !== clan) ? true : false }
                                            className={`flex ${index > 0 && "border-l-2 border-grey-medium"}`}>
                                                <h3>{advantage.subCategory? advantage.subCategory : advantage.category}({advantage.title})</h3>
                                                <Dots maxTotalDots={advantage.dotAmount} currentAmount={advantage.dotAmount} />
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
                                        <RadioGroup.Option key={index} value={`${discipline.title}_${discipline.dotAmount}`} 
                                        disabled={clan === discipline.unavailableIf ? true : (discipline.exclusiveTo && discipline.exclusiveTo !== clan) ? true : false }
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
                                        {predatorType.gain.chooseSpecialty.map((specialty, index) => (
                                        <RadioGroup.Option key={index} value={`${specialty.title}_${specialty.detail}`} 
                                        disabled={clan === specialty.unavailableIf ? true : (specialty.exclusiveTo && specialty.exclusiveTo !== clan) ? true : false }
                                        className={`flex ${index > 0 && "border-l-2 border-grey-medium"}`}>
                                            <h3>{specialty.title}({specialty.detail})</h3>
                                            <Dots maxTotalDots={specialty.dotAmount} currentAmount={specialty.dotAmount} />
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
                                                {predatorType.gain.spendBetween.find(choice => choice.isFlaw !== true).map((choice, index) => (
                                                    <>
                                                    <h3>{}/{choice.dotAmount} spent between</h3>
                                                        {choice.options.map(option => (
                                                            <RadioGroup.Option key={index} value={`${option.title}${option.dotAmount}`}>
                                                                <Dots maxTotalDots={choice.dotAmount} editable={true} title={option.title} currentAmount={option.dotAmount} />
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    }
                                    {predatorType.gain.spendBetween.filter(choice => choice.isFlaw === true).length > 0 && 
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

/*
<div className="flex">
                            {predatorType.gain &&
                                <ul className="marker:text-red-medium">
                                    <h3>Gain:</h3>
                                    {predatorType.gain.bloodPotency && <li>Gain {predatorType.gain.bloodPotency} Blood Potency</li>}
                                    {predatorType.gain.humanity && <li>Gain {predatorType.gain.humanity} Humanity</li>}
                                    {predatorType.gain.advantage.map((advantage, index) => (
                                        <li key={`${advantage.title + index}`}><p>Gain the {`${advantage.title? advantage.title : advantage.category}${advantage.detail ? `(${advantage.detail})` : ""} ${advantage.isFlaw === true ? "Flaw" : advantage.type} (`}</p><Dots currentAmount={advantage.dotAmount} maxTotalDots={advantage.dotAmount} /><p>{`)`}{advantage.description && `: ${advantage.description}`}</p></li>
                                    ))}
                                </ul>
                            }
                            {predatorType.lose &&
                                <ul className="marker:text-red-medium">
                                    <h3>Lose:</h3>
                                    {predatorType.lose.humanity && <li>Lose {predatorType.lose.humanity} Humanity</li>}
                                </ul>
                            }
                        </div>
                        */
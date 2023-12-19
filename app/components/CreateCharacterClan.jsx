import Section from "./Section";
import {db} from "../../firebase";
import {getDocs, collection} from "firebase/firestore";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Tooltip from "./Tooltip";

export default function CreateCharacterClan ({title, loaderData, updateFields, clan: chosenClan}) {
    const clans = loaderData;
    const [selectedClan, setSelectedClan] = useState(chosenClan !== "" ? chosenClan : clans[0].title);
    let clan = clans.find(clan => clan.title === selectedClan);

    const updateState = (e) => {
        setSelectedClan(e);
        updateFields({clan: e});
        return setSelectedClan(e);
    }
    
    return (
        <>
            <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex" backgroundColour="bg-grey-darker">
            <div className="w-1/3">
            <RadioGroup value={selectedClan} onChange={updateState} name="clan" className="divide-y-2 divide-grey-darker">
                {clans.map((clan) => (
                <RadioGroup.Option key={clan.id} value={clan.title}>
                    <div className={`flex flex-col ${clan.title === selectedClan ? "bg-red-medium" : "bg-grey-medium"} p-4 gap-2 hover:bg-red-light hover:cursor-pointer`}>
                        <h3>{clan.title}</h3>
                        <h4>{clan.summary}</h4>
                    </div>
                </RadioGroup.Option>
                ))}
            </RadioGroup>
                
            </div>
            <div className="w-2/3 bg-grey-dark flex max-h-screen">
                <div className="w-2/3 h-screen">
                    <div className="h-1/6 p-4">
                        <h2>{clan.title}</h2>
                        {clan.bane ? 
                            <Tooltip contentArray={[clan.bane.description]}>
                                <p><span className="font-bold">Bane:</span> {clan.bane.title}</p>
                            </Tooltip> 
                        : 
                            <p><span className="font-bold">Bane:</span> None</p>
                        }
                        {clan.compulsion ? 
                            <Tooltip contentArray={[clan.compulsion.description]}>
                                <p><span className="font-bold">Compulsion:</span> {clan.compulsion.title}</p>
                            </Tooltip>
                        : 
                            <p><span className="font-bold">Compulsion:</span> None</p>
                        }
                    </div>
                   <div className="bg-grey-darkest h-5/6 p-4"> 
                    <p>{clan.description}</p>
                   </div>
                </div>
                <div className="w-1/3 h-full">
                    <div className="h-1/6 p-4 flex items-center justify-center">
                        <img src={`/img/${clan.title.charAt(0).toLowerCase() + clan.title.slice(1).replace(/-/g, "")}_icon.webp`} alt={clan.title} className="w-1/2 aspect-square object-scale-down"/>
                    </div>
                    <div className="flex flex-col bg-grey-darkest h-5/6 p-4 gap-4">
                        {clan.clanDisciplines.map((discipline, index) => (
                            <div key={index} className={`${index === 1 && "border-x-2 border-grey-medium"}`}>
                                <div className="flex items-center"><h3 className="font-bold mr-2">{discipline.title}</h3>{discipline.title !== "None" && <img src={`/img/${discipline.title.charAt(0).toLowerCase() + discipline.title.slice(1).replace(/[- ]/g, "")}_icon.webp`} alt={discipline.title} width="30" height="30" />}</div>
                                <p>{discipline.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </Section>
            <div className="h-full w-1/4">
                <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
                <div className="w-full grid grid-cols-1 divide-y-2 divide-red-light gap-6">
                    <h2>{clan.title} Archetypes</h2>
                    {clan.archetypes.map((archetype, index) => (
                        <div key={index} >
                            <h3 className="font-bold ">{archetype.title}</h3>
                            <p>{archetype.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
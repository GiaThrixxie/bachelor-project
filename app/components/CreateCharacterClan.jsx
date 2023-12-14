import Section from "./Section";
import db from "../../firebase";
import {getDocs, collection} from "firebase/firestore";
import { useLoaderData } from "remix";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import Tooltip from "./Tooltip";


export async function loader() {
  
    let clans  = [];

    const querySnapshot = await getDocs(collection(db, "games", "VTM_5e", "character", "clans", "data")); 
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        clans.push({ id: doc.id, ...doc.data() });
        return clans;
      });
  
    return (
      { clans }
      )
  };

export default function CreateCharacterClan ({title, actionData}) {
    const {clans} = useLoaderData();
    const [selectedClan, setSelectedClan] = useState(actionData?.values?.clan ? actionData?.values?.clan : clans[0].title);
    let clan = clans.filter(clan => clan.title === selectedClan);

    return (
        <>
        <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex" backgroundColour="bg-grey-darker">
            <div className="w-1/3">
                <RadioGroup value={selectedClan} onChange={setSelectedClan} name="clan">
                    {clans.map((clan) => (
                    <RadioGroup.Option key={clan.id} value={clan.title}>
                        <div className="flex">
                            <h3>{clan.title}</h3>
                            <h4>{clan.summary}</h4>
                        </div>
                    </RadioGroup.Option>
                    ))}
                </RadioGroup>
            </div>
            <div className="w-2/3 bg-grey-dark flex">
                <div className="w-2/3">
                    <div className="h-1/4">
                        <h2>{clan.title}</h2>
                        <Tooltip contentArray={[clan.bane.description]}>
                            <p><span className="font-bold">Bane:</span> {clan.bane.title}</p>
                        </Tooltip>
                        <Tooltip contentArray={[clan.compulsion.description]}>
                            <p><span className="font-bold">Compulsion:</span> {clan.compulsion.title}</p>
                        </Tooltip>
                    </div>
                   <div className="bg-grey-darkest h-3/4"> 
                    <p>{clan.description}</p>
                   </div>
                </div>
                <div className="w-1/3">
                    <div className="h-1/4">
                        <Image src={clan.img} alt={clan.title} width={200} height={200} />
                    </div>
                    <div className="bg-grey-darkest h-3/4">
                        {clan.disciplines.map((discipline, index) => (
                            <div key={index} className={index === 1 && "border-x-2 border-grey-medium"}>
                                <div className="flex"><h3>{discipline.title}</h3><Image src={discipline.img} alt={discipline.title} width="30" height="30" /></div>
                                <p>{discipline.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
        <div className="h-full w-1/4">
            <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
            <div className="w-full grid grid-cols-1 divide-y-2 border-grey-medium">
                <h2>{clan.title} Archetypes</h2>
                {clan.archetypes.map((archetype, index) => (
                    <div key={index} >
                        <h3>{archetype.title}</h3>
                        <p>{archetype.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}
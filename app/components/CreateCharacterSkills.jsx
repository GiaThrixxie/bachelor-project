import ListCoreTraits from "./ListCoreTraits";
import Section from "./Section";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useLoaderData } from "@remix-run/react";

export default function CreateCharacterSkills ({title, actionData, loaderData}) {
    const {skills, skillDistribution} = loaderData;

    return (
        <Section title={title} height="h-full" width="w-3/4" backgroundColour="bg-grey-darker" bodyClassNames="grid grid-cols-3 grid-rows-9">
            <ListCoreTraits dataArray={skills} attributesOrSkills="skills" allCategories={true} topBorder={true} />
        </Section>
    );
}
import ListCoreTraits from "@components";
import Section from "./Section";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useLoaderData } from "remix";

export async function loader() {
    let skills  = [];
    let category;

    const categoryQuerySnapshot = await getDoc(doc(db, "games", "VTM_5e", "coreTraits", "skills")); 
    categoryQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        category = doc.data();
        return category;
      });

    const skillsQuerySnapshot = await getDocs(collection(db, "games", "VTM_5e", "coreTraits", "skills", "data")); 
    skillsQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        skills.push({ id: doc.id, ...doc.data() });
        return skills;
      });
    return (
      { skills, category }
      )
  };

export default function CreateCharacterSkills ({title, actionData}) {
    const { skills, category } = useLoaderData();

    return (
        <Section title={title} height="h-full" width="w-3/4" backgroundColour="bg-grey-darker" bodyClassNames="grid grid-cols-3 grid-rows-9">
            <ListCoreTraits dataArray={skills} attributesOrSkills="skills" allCategories={true} topBorder={true} />
        </Section>
    );
}
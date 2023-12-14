import Section from "./Section";
import { useLoaderData } from "remix";
import { db } from "../../firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import ListDisciplines from "@components";

export async function loader() {
    let disciplines  = [];
    let clans  = [];

    const clanQuerySnapshot = await getDocs(doc(db, "games", "VTM_5e", "character", "clans", "data")); 
    clanQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        clans.push({ id: doc.id, ...doc.data() });
        return clans;
    });



    const querySnapshot = await getDocs(collection(db, "games", "VTM_5e", "character", "disciplines", "data")); 
    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        let powers = [];

        let powersSnapshot = await getDocs(collection(db, "games", "VTM_5e", "character", "disciplines", "data", doc.id, "powers")); 
        powersSnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            powers.push({ id: doc.id, ...doc.data() });
            return powers;
        });
        disciplines.push({ id: doc.id, ...doc.data(), powers: powers });
        return disciplines;
      });
      

    return (
      { clans, disciplines }
      )
  };

export default function CreateCharacterDisciplines ({title, actionData}) {
    const {clans, disciplines} = useLoaderData();

    let filterClanDisciplines = clans.filter(clan => clan.title === actionData?.values?.clan).clanDisciplines;

    let filteredDisciplines = disciplines.filter(discipline => filterClanDisciplines.includes(discipline.title));

    return (
        <Section title={title} height="h-full" width="w-1/4" backgroundColour="bg-grey-darkest">
            <ListDisciplines dataArray={filteredDisciplines} />
        </Section>
    );
}
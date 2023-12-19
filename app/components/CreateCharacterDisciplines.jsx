import Section from "./Section";
import ListDisciplines from "./ListDisciplines";


export default function CreateCharacterDisciplines ({title, actionData, loaderData,  updateFields, clan}) {
    const clans = loaderData[0];
    const disciplines = loaderData[1];

    let filterClanDisciplines = clans.find(chosenClan => chosenClan.title === clan).clanDisciplines;

    let filteredDisciplines = disciplines.find(discipline => filterClanDisciplines.includes(discipline.title));

    return (
        <Section title={title} height="h-full" width="w-1/4" backgroundColour="bg-grey-darkest">
            <ListDisciplines dataArray={filteredDisciplines} />
        </Section>
    );
}
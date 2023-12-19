import ListCoreTraits from './ListCoreTraits';
import ListDisciplines from './ListDisciplines';
import Section from './Section';

export default function CoreTraits (characterData) {
    return (
        <>
            <div className="flex w-full h-full">
                <div className="w-3/4 mr-4 flex">
                    <Section title="Attributes" height="h-full" width="w-1/4" backgroundColour="bg-red-medium" bodyClassNames="grid grid-cols-1 grid-rows-9">
                        <ListCoreTraits dataArray={characterData.attributes} attributesOrSkills="attributes" filledColour="stroke-grey-light" emptyColour="stroke-white" allCategories={true} topBorder={true} />
                    </Section>
                    <Section title="Skills" height="h-full" width="w-3/4" backgroundColour="bg-grey-darker" bodyClassNames="grid grid-cols-3 grid-rows-9">
                        <ListCoreTraits dataArray={characterData.skills} attributesOrSkills="skills" allCategories={true} topBorder={true} />
                    </Section>
                </div>
                <Section title="Disciplines" height="h-full" width="w-1/4" backgroundColour="bg-grey-darkest">
                    <ListDisciplines dataArray={characterData.disciplines} />
                </Section>
            </div>
        </>
    )
}

/*
{characterData.attributes.map((attribute, index) => (
    <Dots key={index} title={attribute.title} currentAmount={attribute.currentDotAmount} additionalClassNames={`mb-7 ${(index === 2 || index === 5) ? "border-b-2 border-red-dark" : (index === 3 || index ===  6) && "mt-7"}`} specialties={attribute.specialties}/>
))}

{characterData.skills.map((skill, index) => (
    <Dots key={index} title={skill.title} currentAmount={skill.currentDotAmount} additionalClassNames={`mb-7 ${(index === 2 || index === 5) ? "border-b-2 border-red-dark" : (index === 3 || index ===  6) && "mt-7"}`} specialties={skill.specialties}/>
))}

<article>
  <div>Phys1</div>
  <div>Phys2</div>
  <div>Phys3</div>
  <div>Phys4</div>
  <div>Phys5</div>
  <div>Phys6</div>
  <div>Phys7</div>
  <div>Phys8</div>
  <div>Phys9</div>
  <div>Social1</div>
  <div>Social2</div>
  <div>Social3</div>
  <div>Social4</div>
  <div>Social5</div>
  <div>Social6</div>
  <div>Social7</div>
  <div>Social8</div>
  <div>Social9</div>
  <div>Mental1</div>
  <div>Mental2</div>
  <div>Mental3</div>
  <div>Mental4</div>
  <div>Mental5</div>
  <div>Mental6</div>
  <div>Mental7</div>
  <div>Mental8</div>
  <div>Mental9</div>
</article>

article {
grid-template-rows: repeat(9, 1fr);
grid-auto-rows: 1/3;
grid-template-columns: repeat(31%, 1fr);
grid-auto-flow: column;
}

article div:nth-child(n+1):nth-child(-n+3),
article div:nth-child(n+10):nth-child(-n+12),
article div:nth-child(n+19):nth-child(-n+21)
{
background-color: white;
grid-column-start: 1;
}

article div:nth-child(n+4):nth-child(-n+6),
article div:nth-child(n+13):nth-child(-n+15),
article div:nth-child(n+22):nth-child(-n+24) {
background-color: green;
grid-column-start: 2;
}

article div:nth-child(n+7):nth-child(-n+9),
article div:nth-child(n+16):nth-child(-n+18),
article div:nth-child(n+25):nth-child(-n+27) {
background-color: purple;
grid-column-start: 3;
}


const attributesOrder = [
        "Strength",
        "Dexterity",
        "Stamina",
        "Charisma",
        "Manipulation",
        "Composure",
        "Intelligence",
        "Wits",
        "Resolve"
    ];

    const skills = [
        "Athletics",
        "Brawl",
        "Craft",
        "Drive",
        "Firearms",
        "Larceny",
        "Melee",
        "Stealth",
        "Survival",

        "Animal Ken",
        "Etiquette",
        "Insight",
        "Intimidation",
        "Leadership",
        "Performance",
        "Persuasion",
        "Streetwise",
        "Subterfuge",
        
        "Academics",
        "Awareness",
        "Finance",
        "Investigation",
        "Medicine",
        "Occult",
        "Politics",
        "Science",
        "Technology"
    ];
    
    let index;
    let gridClasses;

    switch (index) {
        case 0:
        case 1:
        case 2: 
            gridClasses = "col-start-1";
        break;

    }

    const physicalAttributes = characterData.attributes.filter(attribute =>
        attribute.type === 'physical'
    );
*/
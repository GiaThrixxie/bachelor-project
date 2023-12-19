import Input from "./Input";
import Section from "./Section";
import InfoWLabel from "./InfoWLabel";

export default function CreateCharacterWhoAreYouInDepth ({title, loaderData, actionData, updateFields, generation, sire, sect, chronicle, ambition, appearance, distinguishingFeatures, history}) {
        const character = loaderData[0];
        const attributes = loaderData[1]; 
        const skills = loaderData[2]; 
        const disciplines = loaderData[3]; 
        const advantages = loaderData[4]; 



    return (
        <>
        <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex" backgroundColour="bg-grey-darker">
            <div className="w-1/3">
                <h3>Required</h3>
                <Input
                    label="Generation"
                    name="generation"
                    placeholder="Generation"
                    defaultValue={generation}
                    onChange={(e) => updateFields({ generation: e.target.value })}
                    errorMessage={actionData?.errors?.generation?.message}
                />
                <Input
                    label="Sire"
                    name="sire"
                    placeholder="Sire"
                    defaultValue={sire}
                    onChange={(e) => updateFields({ sire: e.target.value })}
                    errorMessage={actionData?.errors?.sire?.message}
                />
                <Input
                    label="Sect"
                    name="sect"
                    placeholder="Sect"
                    defaultValue={sect}
                    onChange={(e) => updateFields({ sect: e.target.value })}
                    errorMessage={actionData?.errors?.sect?.message}
                />
                <hr ></hr>
                <h3>Optional</h3>
                <Input
                    label="Chronicle"
                    name="chronicle"
                    placeholder="Chronicle"
                    defaultValue={chronicle}
                    onChange={(e) => updateFields({ chronicle: e.target.value })}
                    errorMessage={actionData?.errors?.chronicle?.message}
                />
                <Input
                    label="Ambition"
                    name="ambition"
                    placeholder="Ambition"
                    defaultValue={ambition}
                    onChange={(e) => updateFields({ ambition: e.target.value })}
                    errorMessage={actionData?.errors?.ambition?.message}
                />
                <Input
                    label="Appearance"
                    name="appearance"
                    placeholder="Appearance"
                    defaultValue={appearance}
                    onChange={(e) => updateFields({ appearance: e.target.value })}
                    errorMessage={actionData?.errors?.appearance?.message}
                />
                <Input
                    label="Distinguishing Features"
                    name="distinguishingFeatures"
                    placeholder="Distinguishing Features"
                    defaultValue={distinguishingFeatures}
                    onChange={(e) => updateFields({ distinguishingFeatures: e.target.value })}
                    errorMessage={actionData?.errors?.distinguishingFeatures?.message}
                />
                
                <Input
                    label="History"
                    name="history"
                    type="textarea"
                    defaultValue={history}
                    onChange={(e) => updateFields({ history: e.target.value })}
                    errorMessage={actionData?.errors?.history?.message}
                />
            </div>
            <div className="w-2/3">
                <h2>Character Summary</h2>
                <InfoWLabel title="Full Name" body={`${character.firstName !== "" ? character.firstName : "N/A"} ${character.nickname !== "" && `'` + character.nickname + `'`} ${character.lastName!== "" ? character.lastName : "N/A"}`} />
                <InfoWLabel title="Date of Birth" body={`${character.dateOfBirth!== null ? character.dateOfBirth : "N/A"}`} />
                <InfoWLabel title="Date of Death" body={`${character.dateOfDeath!== null ? character.dateOfDeath : "N/A"}`} />
                <InfoWLabel title="Age" body={`${character.actualAge !== null ? character.actualAge : "N/A"}, looks ${character.apparentAge !== null ? character.apparentAge : "N/A"}`} />
                <InfoWLabel title="Clan" body={`${character.clan !== "" ? character.clan : "N/A"}`} />
                <InfoWLabel title="Predator Type" body={`${character.predatorType !== "" ? character.predatorType : "N/A"}`} />
                { attributes.length > 0 &&
                    attributes.map((attribute, index) => (
                        <InfoWLabel key={index} title={attribute.title} body={attribute.dotAmount} />
                    ))
                }
                {
                    skills.length > 0 &&
                    skills.map((skill, index) => (
                        <InfoWLabel key={index} title={skill.title} body={skill.dotAmount} /> 
                    ))
                }
                {
                    specialties.length > 0 &&
                    specialties.map((specialty, index) => (
                        <InfoWLabel key={index} title={specialty.title} body={specialty.dotAmount} />
                    ))
                }
                {
                    disciplines.length > 0 &&
                    disciplines.map((discipline, index) => (
                        <InfoWLabel key={index} title={discipline.title} body={discipline.dotAmount} />
                    ))
                }
                {
                    advantages.length > 0 &&
                    advantages.map((advantage, index) => (
                        <InfoWLabel key={index} title={advantage.title} body={advantage.dotAmount} />
                    ))
                }
                {
                    backgrounds.length > 0 &&
                    backgrounds.map((background, index) => (
                        <InfoWLabel key={index} title={background.title} body={background.dotAmount} />
                    ))
                }
                {
                    merits.length > 0 &&
                    merits.map((merit, index) => (
                        <InfoWLabel key={index} title={merit.title} body={merit.dotAmount} />
                    ))
                }
            </div>
        </Section>
        <div className="h-full w-1/4">
            <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
            <div className="w-full">
                    <h3>Description of what you clicked</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
            </div>
        </div>
    </>
    );
}
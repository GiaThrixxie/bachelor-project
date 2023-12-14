import {Input, InfoWLabel} from "@components";
import Section from "./Section";

export default function CreateCharacterWhoAreYouInDepth ({title, actionData}) {
    // Find all keys that start with a certain string and return the values of those keys if they are in the list of required values
    function findbyValue(key, requiredValue) {
        Object.keys(actionData.values).filter(function(k) {
            return k.indexOf(key) == 0;
        }).reduce(function(newData, k) {
            if (requiredValue.includes(actionData.values[k])) newData[k] = actionData.values[k]
            return newData;
        }, {});
    }

    let attributes = findbyValue("attributes", [1, 2, 3, 4, 5]);
    let skills = findbyValue("skills", [1, 2, 3, 4, 5]);
    let specialties = findbyValue("specialty", [1, 2, 3, 4, 5]);
    let disciplines = findbyValue("discipline", [1, 2, 3, 4, 5]);
    let backgrounds = findbyValue("background", [1, 2, 3, 4, 5]);
    let merits = findbyValue("merit", [1, 2, 3, 4, 5]);

    //may not work for specialties nor any kind of advantages

    return (
        <>
        <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex" backgroundColour="bg-grey-darker">
            <div className="w-1/3">
                <h3>Required</h3>
                <Input
                    label="Generation"
                    name="generation"
                    placeholder="Generation"
                    defaultValue={actionData?.values?.generation}
                    errorMessage={actionData?.errors?.generation?.message}
                />
                <Input
                    label="Sire"
                    name="sire"
                    placeholder="Sire"
                    defaultValue={actionData?.values?.sire}
                    errorMessage={actionData?.errors?.sire?.message}
                />
                <Input
                    label="Sect"
                    name="sect"
                    placeholder="Sect"
                    defaultValue={actionData?.values?.sect}
                    errorMessage={actionData?.errors?.sect?.message}
                />
                <hr ></hr>
                <h3>Optional</h3>
                <Input
                    label="Chronicle"
                    name="chronicle"
                    placeholder="Chronicle"
                    defaultValue={actionData?.values?.chronicle}
                    errorMessage={actionData?.errors?.chronicle?.message}
                />
                <Input
                    label="Ambition"
                    name="ambition"
                    placeholder="Ambition"
                    defaultValue={actionData?.values?.ambition}
                    errorMessage={actionData?.errors?.ambition?.message}
                />
                <Input
                    label="Appearance"
                    name="appearance"
                    placeholder="Appearance"
                    defaultValue={actionData?.values?.appearance}
                    errorMessage={actionData?.errors?.appearance?.message}
                />
                <Input
                    label="Distinguishing Features"
                    name="distinguishingFeatures"
                    placeholder="Distinguishing Features"
                    defaultValue={actionData?.values?.distinguishingFeatures}
                    errorMessage={actionData?.errors?.distinguishingFeatures?.message}
                />
                
                <Input
                    label="History"
                    name="history"
                    type="textarea"
                    defaultValue={actionData?.values?.history}
                    errorMessage={actionData?.errors?.history?.message}
                />
            </div>
            <div className="w-2/3">
                <h2>Character Summary</h2>
                <InfoWLabel title="Full Name" body={`${actionData?.values?.firstName} ${actionData?.values?.nickname && `'` + actionData.values.nickname + `'`} ${actionData?.values?.lastName}`} />
                <InfoWLabel title="Date of Birth" body={`${actionData?.values?.dateOfBirth}`} />
                <InfoWLabel title="Date of Death" body={`${actionData?.values?.dateOfDeath}`} />
                <InfoWLabel title="Age" body={`${actionData?.values?.actualAge}, looks ${actionData?.values?.apparentAge}`} />
                <InfoWLabel title="Clan" body={`${actionData?.values?.clan}`} />
                <InfoWLabel title="Predator Type" body={`${actionData?.values?.predatorType}`} />
                {
                    attributes.map((attribute, index) => (
                        <InfoWLabel key={index} title={attribute.title} body={attribute.value} />
                    ))
                }
                {
                    skills.map((attribute, index) => (
                        <InfoWLabel key={index} title={attribute.title} body={attribute.value} />
                    ))
                }
                {
                    specialties.map((attribute, index) => (
                        <InfoWLabel key={index} title={attribute.title} body={attribute.value} />
                    ))
                }
                {
                    disciplines.map((attribute, index) => (
                        <InfoWLabel key={index} title={attribute.title} body={attribute.value} />
                    ))
                }
                {
                    backgrounds.map((attribute, index) => (
                        <InfoWLabel key={index} title={attribute.title} body={attribute.value} />
                    ))
                }
                {
                    merits.map((attribute, index) => (
                        <InfoWLabel key={index} title={attribute.title} body={attribute.value} />
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
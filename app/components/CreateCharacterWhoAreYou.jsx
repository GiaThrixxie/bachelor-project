import Input from "./Input";
import Section from "./Section";

export default function CreateCharacterWhoAreYou ({title, actionData, updateFields, firstName, lastName, nickname, dateOfBirth, dateOfDeath, apparentAge, actualAge, img}) {
    return (
        <>
            <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex gap-4" backgroundColour="bg-grey-darker">
                <div className="flex flex-col gap-y-2 w-1/3 ">
                    <h3>Required</h3>
                    <Input
                        label="First Name"
                        name="firstName"
                        placeholder="First Name"
                        defaultValue={firstName}
                        onChange={(e) => updateFields({ firstName: e.target.value })}
                        errorMessage={actionData?.errors?.firstName?.message}
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        defaultValue={lastName}
                        onChange={(e) => updateFields({ lastName: e.target.value })}
                        errorMessage={actionData?.errors?.lastName?.message}
                    />
                    <hr className="border-grey-darkest"></hr>
                    <h3>Optional</h3>
                    <Input
                        label="Nickname"
                        name="nickname"
                        placeholder="Nickname"
                        defaultValue={nickname}
                        onChange={(e) => updateFields({ nickname: e.target.value })}
                        errorMessage={actionData?.errors?.nickname?.message}
                    />
                    <Input
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        defaultValue={dateOfBirth}
                        onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
                        errorMessage={actionData?.errors?.dateOfBirth?.message}
                    />
                    <Input
                        label="Date of Death"
                        name="dateOfDeath"
                        type="date"
                        defaultValue={dateOfDeath}
                        onChange={(e) => updateFields({ dateOfDeath: e.target.value })}
                        errorMessage={actionData?.errors?.dateOfDeath?.message}
                    />
                    <Input
                        label="Apparent Age"
                        name="apparentAge"
                        placeholder="What age does your character appear to be?"
                        type="number"
                        defaultValue={apparentAge}
                        onChange={(e) => updateFields({ apparentAge: e.target.value })}
                        errorMessage={actionData?.errors?.apparentAge?.message}
                    />
                    <Input
                        label="Actual Age"
                        name="actualAge"
                        placeholder="How old is your character actually?"
                        type="number"
                        defaultValue={actualAge}
                        onChange={(e) => updateFields({ actualAge: e.target.value })}
                        errorMessage={actionData?.errors?.actualAge?.message}
                    />
                </div>
                <div className="w-2/4">
                    <p>Selecting an image does not currently work!</p>
                    <Input
                        label="Choose an image for your character"
                        name="img"
                        type="file"
                        disabled={true}
                        accept="image/*"
                        defaultValue={img}
                        onChange={(e) => updateFields({ img: e.target.value })}
                        errorMessage={actionData?.errors?.img?.message}
                    />

                </div>
            </Section>
            <div className="flex flex-col h-full w-1/4 grow">
                <div className="left-0 w-1 h-full bg-grey-medium"></div>
                <div className="w-full">
                    <h2>Description of what you clicked</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
                </div>
            </div>
        </>
    );
}
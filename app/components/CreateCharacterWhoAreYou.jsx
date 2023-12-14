import Input from "@components";
import Section from "./Section";

export default function CreateCharacterWhoAreYou ({title, actionData}) {
    return (
        <>
            <Section title={title} width="w-3/4" height="h-full" bodyClassNames="flex" backgroundColour="bg-grey-darker">
                <div className="w-1/3">
                    <h3>Required</h3>
                    <Input
                        label="First Name"
                        name="firstName"
                        placeholder="First Name"
                        defaultValue={actionData?.values?.firstName}
                        errorMessage={actionData?.errors?.firstName?.message}
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        defaultValue={actionData?.values?.lastName}
                        errorMessage={actionData?.errors?.lastName?.message}
                    />
                    <hr ></hr>
                    <h3>Optional</h3>
                    <Input
                        label="Nickname"
                        name="nickname"
                        placeholder="Nickname"
                        defaultValue={actionData?.values?.nickname}
                        errorMessage={actionData?.errors?.nickname?.message}
                    />
                    <Input
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        defaultValue={actionData?.values?.dateofBirth}
                        errorMessage={actionData?.errors?.dateOfBirth?.message}
                    />
                    <Input
                        label="Date of Death"
                        name="dateOfDeath"
                        type="date"
                        defaultValue={actionData?.values?.dateOfDeath}
                        errorMessage={actionData?.errors?.dateOfDeath?.message}
                    />
                    <Input
                        label="Apparent Age"
                        name="apparentAge"
                        placeholder="What age does your character appear to be?"
                        type="number"
                        defaultValue={actionData?.values?.apparentAge}
                        errorMessage={actionData?.errors?.apparentAge?.message}
                    />
                    <Input
                        label="Actual Age"
                        name="actualAge"
                        placeholder="How old is your character actually?"
                        type="number"
                        defaultValue={actionData?.values?.actualAge}
                        errorMessage={actionData?.errors?.actualAge?.message}
                    />
                </div>
                <div className="w-2/3">
                    <Input
                        label="Choose an image for your character"
                        name="img"
                        type="file"
                        accept="image/*"
                        defaultValue={actionData?.values?.img}
                        errorMessage={actionData?.errors?.img?.message}
                    />

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
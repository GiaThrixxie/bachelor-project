import InfoCard from './InfoCard';
import InfoWLabel from './InfoWLabel';
import Section from './Section';
import {TbCake, TbGrave} from  "react-icons/tb";

export default function CharacterProfile (characterData) {

    return (
        <>
            <div className="w-full h-3/4 flex">
                <Section title={`About ${characterData.nickname ? characterData.nickname : characterData.firstName}`} height="h-3/4" width="w-4/5" backgroundColour="bg-grey-darker" bodyClassNames="flex" itemsOnTitleLine={
                    <>
                        <div className="mr-6 flex items-center">
                            <TbCake size={20} className="stroke-grey-lighter mr-1"/>
                            <h4>{characterData.dateOfBirth}</h4>
                        </div>
                        <div className="flex items-center">
                            <TbGrave size={20} className="stroke-grey-lighter mr-1"/>
                            <h4>{characterData.dateOfDeath}</h4>
                        </div>
                    </>
                }>
                    <div className="flex flex-col w-1/2">
                    <InfoWLabel title="Full Name" body={`${characterData.firstName} ${characterData.lastName}`} />
                    <InfoWLabel title="Age" body={`${characterData.realAge}, looks ${characterData.apparentAge}`}/>
                    <InfoWLabel title="Appearance" body={characterData.appearance} highlightedBodyStart={characterData.distinguishingFeatures}/>
                    </div>
                    <div className="flex flex-col w-1/2">
                    <InfoWLabel title="Sire" body={characterData.sire} />
                    <InfoWLabel title="History" body={characterData.history} marginBottom={false}/>
                    </div>
                </Section>
                <Section title="Touchstones" height="h-full" width="w-1/5" backgroundColour="bg-red-medium" bodyClassNames="flex flex-col gap-2">
                {characterData.touchstones?.length > 0 &&
                characterData.touchstones.map((touchstone, index) => (
                        <InfoCard key={index} title={touchstone.name} hasDots={false} description={touchstone.description} subDescription={touchstone.conviction} parentBackgroundColour="bg-red-medium" />
                    ))}
                </Section>
            </div>

            <Section title="Equipment" height="h-1/4" width="w-full" backgroundColour="bg-grey-darkest" bodyClassNames="flex gap-2">
                {characterData.equipment?.length > 0 &&
                characterData.equipment.map((item, index) => (
                    <InfoCard key={index} title={item.title} subtitle={item.effects} hasDots={false} description={item.description} type={item.type} subType={item.subType} parentBackgroundColour="bg-grey-darkest" />
                ))}
            </Section>
        </>
    )
}

/*
<Section title={`About ${characterData.nickname ? characterData.nickname : characterData.firstName}`} height="h-3/4" width="w-4/5" backgroundColour="bg-grey-darker" bodyClassNames="flex flex-col wrap" itemsOnTitleLine={
                <>
                    <div className="mr-4">
                        <TbCake size={20} className="bg-grey-lighter"/>
                        <h4>{characterData.dateOfBirth}</h4>
                    </div>
                    <div>
                        <TbGrave size={20} className="bg-grey-lighter"/>
                        <h4>{characterData.dateOfDeath}</h4>
                    </div>
                </>
            }>
                <InfoWLabel title="Full Name" body={`${characterData.firstName} ${characterData.lastName}`} />
                <InfoWLabel title="Age" body={`${characterData.realAge}, looks ${characterData.apparentAge}`}/>
                <InfoWLabel title="Appearance" body={characterData.appearance} highlightedBodyStart={characterData.distinguishingFeatures}/>
                <InfoWLabel title="Sire" body={characterData.sire} />
                <InfoWLabel title="History" body={characterData.history} marginBottom={false}/>

            </Section>
            
            <Section title="Touchstones" height="h-3/4" width="w-1/5" backgroundColour="bg-red-medium">
            {characterData.touchstones?.length > 0 &&
            characterData.touchstones.map((touchstone, index) => (
                    <InfoCard key={index} title={touchstone.name} hasDots={false} description={touchstone.description} subDescription={touchstone.conviction} parentBackgroundColour="bg-red-medium" />
                ))}
            </Section>
            <Section title="Equipment" height="h-1/4" width="w-full" backgroundColour="bg-grey-darkest">
                {characterData.equipment?.length > 0 &&
                characterData.equipment.map((item, index) => (
                    <InfoCard key={index} title={item.title} subtitle={item.effects} hasDots={false} description={item.description} type={item.type} subType={item.subType} parentBackgroundColour="bg-grey-darkest" />
                ))}
            </Section>
            */
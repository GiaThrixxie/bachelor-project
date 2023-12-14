import {InfoCard, InfoWLabel, Section} from '@/components';
import {TbCake, TbGrave} from  "react-icons/tb";

export default function CharacterProfile (characterData) {
    function convertTimestampToDateString (timestamp) {
        const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let date = timestamp.toDate();
        let month = monthName[date.getUTCMonth()];
        let dayOfMonth = date.getDate();
        let day = "";
        switch (dayOfMonth)
        {
            case 1:
            case 21:
            case 31:
                day = dayOfMonth + "st";
                break;
            case 2:
            case 22:
                day = dayOfMonth + "nd";
                break;
            case 3:
            case 23:
                day = dayOfMonth + "rd";
                break;
            default:
                day = dayOfMonth + "th";
                break;
        }
        let year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    return (
        <>
            <Section title={`About ${characterData.nickname ? characterData.nickname : characterData.firstName}`} height="h-3/4" width="w-4/5" backgroundColour="bg-grey-darker" bodyClassNames="flex flex-col wrap" itemsOnTitleLine={
                <>
                    <div className="mr-4">
                        <TbCake size={20} className="bg-grey-lighter"/>
                        <h4>{convertTimestampToDateString(characterData.birthday)}</h4>
                    </div>
                    <div>
                        <TbGrave size={20} className="bg-grey-lighter"/>
                        <h4>{convertTimestampToDateString(characterData.deathday)}</h4>
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
            {characterData.touchstones.map((touchstone, index) => (
                    <InfoCard key={index} title={touchstone.name} hasDots={false} description={touchstone.description} subDescription={touchstone.conviction} parentBackgroundColour="bg-red-medium" />
                ))}
            </Section>
            <Section title="Equipment" height="h-1/4" width="w-full" backgroundColour="bg-grey-darkest">
                {characterData.equipment.map((item, index) => (
                    <InfoCard key={index} title={item.title} subtitle={item.effects} hasDots={false} description={item.description} type={item.type} subType={item.subType} parentBackgroundColour="bg-grey-darkest" />
                ))}
            </Section>
        </>
    )
}
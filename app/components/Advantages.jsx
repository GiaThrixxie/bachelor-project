import {InfoCard, Section} from '@/components';

export default function Advantages (characterData) {

    return (
        <>
            <Section title="Advantages" height="h-full" width="w-3/5" backgroundColour="bg-grey-darker">
                {characterData.advantages.map((advantage, index) => (
                    <InfoCard key={index} title={advantage.title} currentAmount={advantage.currentDotAmount} description={advantage.description} type={advantage.type} subtype={advantage.category} iconType="hexagon" parentBackgroundColour="bg-grey-darker" />
                ))}
            </Section>
            <Section title="Flaws" height="h-full" width="w-2/5" backgroundColour="bg-grey-darkest">
                {characterData.flaws.map((flaw, index) => (
                    <InfoCard key={index} title={flaw.title} currentAmount={flaw.currentDotAmount} description={flaw.description} type={flaw.type} subtype={flaw.category} iconType="hexagon" parentBackgroundColour="bg-grey-darkest" />
                ))}
            </Section>
        </>
    )
}
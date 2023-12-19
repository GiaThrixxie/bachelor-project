import InfoCard from './InfoCard';
import Section from './Section';

export default function Advantages (characterData) {

    return (
        <div className="w-full h-full flex">
            <Section title="Advantages" height="h-full" width="w-3/5" backgroundColour="bg-grey-darker">
                {characterData.advantages?.length > 0 &&
                characterData.advantages.map((advantage, index) => (
                    <InfoCard key={index} title={advantage.title} currentAmount={advantage.dotAmount} description={advantage.description} type={advantage.type} subtype={advantage.category} iconType="hexagon" parentBackgroundColour="bg-grey-darker" />
                ))}
            </Section>
            <Section title="Flaws" height="h-full" width="w-2/5" backgroundColour="bg-grey-darkest">
                {characterData.flaws?.length > 0 &&
                characterData.flaws.map((flaw, index) => (
                    <InfoCard key={index} title={flaw.title} currentAmount={flaw.dotAmount} description={flaw.description} type={flaw.type} subtype={flaw.category} iconType="hexagon" parentBackgroundColour="bg-grey-darkest" />
                ))}
            </Section>
        </div>
    )
}
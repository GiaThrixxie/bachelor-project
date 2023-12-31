import Dots from './Dots';
import Tooltip from './Tooltip';
import { TbChevronRight } from 'react-icons/tb';

export default function ListDisciplines ({dataArray}) {

    let disciplineOrder = [
        true,
        false
    ];

    let sortedData = dataArray.sort((a, b) =>
        (disciplineOrder.indexOf(a.isClanDiscipline) - disciplineOrder.indexOf(b.isClanDiscipline)) ? -1 : // Sorts using the disciplineOrder array
        (disciplineOrder.indexOf(a.isClanDiscipline) === disciplineOrder.indexOf(b.isClanDiscipline) ? // If both are clan-disciplines, or non-clan disciplines is the same,
            (a.title > b.title ? 1 : -1) // sort alphabetically
        : 1)
    );

    return (
        <>
        {sortedData.map((discipline, index) => (
                <div key={discipline.title+index} className="border-l-2 border-grey-lighter pr-2.5">
                    <div className="flex w-full ">
                        <img src={`/img/${discipline.title}_icon.webp`} alt={discipline.title} width={50} height={50} className="bg-red-light pr-2.5" />
                        <Dots title={discipline.title} currentAmount={discipline.dotAmount} additionalClassNames="bg-red-light" />
                    </div>
                    {discipline.powers ?  discipline.powers.map((power, index) => (
                            <Tooltip key={index} contentObject={power} children={<><h3 className="mr-1.5">{power.title}</h3><TbChevronRight className="bg-red-medium"/></>}/>
                        ))
                    : discipline.title !== "Thin-Blood Alchemy" && <p>No powers</p>}

                    {(discipline.title==="Blood Sorcery" || discipline.title==="bloodSorcery") && <h3>Rituals</h3>}
                    {(discipline.title==="Blood Sorcery" || discipline.title==="bloodSorcery") && discipline.rituals ?  discipline.rituals.map((ritual, index) => (
                            <Tooltip key={index} contentObject={ritual} children={<><h3 className="mr-1.5">{ritual.title}</h3><TbChevronRight className="bg-red-medium"/></>}/>
                        ))
                    : (discipline.title==="Blood Sorcery" || discipline.title==="bloodSorcery") && <p>No known rituals</p>}

                    {(discipline.title==="Thin-Blood Alchemy" || discipline.title==="thinBloodAlchemy") && <h3>Formulae</h3>}
                    {(discipline.title==="Thin-Blood Alchemy" || discipline.title==="thinBloodAlchemy") && discipline.formulae ?  discipline.formulae.map((formula, index) => (
                            <Tooltip key={index} contentObject={formula} children={<><h3 className="mr-1.5">{formula.title}</h3><TbChevronRight className="bg-red-medium"/></>}/>
                        ))
                    : (discipline.title==="Thin-Blood Alchemy" || discipline.title==="thinBloodAlchemy") && <p>No known formulae</p>}
                </div>
            )
        )}
        
        </>
    )
}

/*
<Dots key={index} title={data.title} currentAmount={data.currentDotAmount} additionalClassNames={`${borderClasses} ${data.specialties.length > 0 ? "" : "mb-7"} ${additionalClasses}`} specialties={data.specialties}/>

<div className="border-l-2 border-grey-lighter pr-2.5">
            <div className="flex w-full ">
                <Image src={imgSrc} alt={disciplineTitle} width={50} height={50} className="bg-red-light pr-2.5" />
                <Dots title={disciplineTitle} currentAmount={currentDotAmount} additionalClassNames="bg-red-light" />
            </div>
            {powers ?  powers.map((power, index) => (
                    <Tooltip key={index} contentObject={power} children={<><h3 className="mr-1.5">{power.title}</h3><TbChevronRight className="bg-red-medium"/></>}/>
                ))
            : 
            <p>No powers</p>}
            {disciplineTitle ="Blood Sorcery" && rituals ?  rituals.map((ritual, index) => (
                    <Tooltip key={index} contentObject={ritual} children={<><h3 className="mr-1.5">{ritual.title}</h3><TbChevronRight className="bg-red-medium"/></>}/>
                ))
            : 
            <p>No known rituals</p>}
            {disciplineTitle="Thin-Blood Alchemy" && formulae ?  formulae.map((formula, index) => (
                    <Tooltip key={index} contentObject={formula} children={<><h3 className="mr-1.5">{formula.title}</h3><TbChevronRight className="bg-red-medium"/></>}/>
                ))
            : 
            <p>No known formulae</p>}

        </div>
*/
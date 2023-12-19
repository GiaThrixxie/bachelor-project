import { Link } from "@remix-run/react";
import { TbOctagonFilled } from "react-icons/tb";

export default function CharacterCampaignCard ({ title, id, img, time, weekday, where, clan, generation, experienceRequired, characterOrCampaign = "character" }) {
    

    return (
        <Link to={id} className="h-1/4 w-1/5">
            <div className="rounded-md h-full w-full">
                <div className={`${characterOrCampaign === "character" ? "bg-[url('/img/placeholder_character_card.jpg')]" : characterOrCampaign === "campaign" && "bg-[url('/img/placeholder_campaign_card.png')]"} relative h-5/6 w-full bg-cover bg-center`}>
                    <div className="absolute -left-6 -top-5 z-30 grid grid-cols-1 grid-rows-1 items-center justify-center">
                        <TbOctagonFilled size={48} color="#562a2a" className=" flex inset-0 col"/>
                        <div className="absolute z-40 flex flex-col inset-0 justify-center items-center m-auto">
                            <img src="/img/vtm5.webp" alt="Vampire: The Masquerade" width={10} height={10} className="z-40 col-span-1 row-span-1"/>
                        </div>
                        <h4 className="self-end justify-self-center z-50 col-span-1 row-span-1 absolute mb-2">5th</h4>
                    </div>
                    {characterOrCampaign === "campaign" && experienceRequired && <div className="bg-red-medium rounded-sm p-0.5"><h4 className="z-30">{experienceRequired}</h4></div>}
                    <h2 className="text-grey-medium font-bold z-40 absolute bottom-0 left-0 p-4">{title}</h2>
                </div>
                <div className="bg-grey-darkest flex gap-2 h-1/6 p-2">
                    {characterOrCampaign === "character" ?
                            <>
                                <p className="text-grey-light">{generation ? generation + "th" : "N/A"} gen.</p>
                                <p>{clan}</p>
                            </>
                            :
                            characterOrCampaign === "campaign" &&
                            <>
                                <p className="text-grey-light">{weekday} {time && weekday ? ", " : ""}{time} {!time && !weekday ? "No set time." : ""}</p>
                                {where && <p>{where}</p>}
                            </>
                        }
                </div>
            </div>
        </Link>
    )
}
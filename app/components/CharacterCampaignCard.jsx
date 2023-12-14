import { Link } from "@remix-run/react";
import { TbOctagonFilled } from "react-icons/tb";
import Image from "next/image";

export default function CharacterCampaignCard ({ title, id, img, time, weekday, where, clan, generation, experienceRequired, characterOrCampaign = "character" }) {
    

    return (
        <Link to={id} className="flex-grow">
            <div className="rounded-md">
                <div className={`${characterOrCampaign === "character" ? "bg-[url('/img/placeholder_character_card.png')]" : characterOrCampaign === "campaign" && "bg-[url('/img/placeholder_campaign_card.png')]"}`}>
                    <div className="absolute -left-3 -top-3 z-30 grid justify-center content-center">
                        <TbOctagonFilled size={24} className="bg-red-medium col-span-1 row-span-1"/>
                        <Image src="/img/vtm.png" alt="Vampire: The Masquerade" width={20} height={20} className="z-40 col-span-1 row-span-1"/>
                        <h4 className="self-end z-50 col-span-1 row-span-1">5th edition</h4>
                    </div>
                    {characterOrCampaign === "campaign" && experienceRequired && <div className="bg-red-medium rounded-sm p-0.5"><h4 className="z-30">{experienceRequired}</h4></div>}
                    <h3 className="text-white">{title}</h3>
                </div>
                <div className="bg-grey-darkest flex justify-between">
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
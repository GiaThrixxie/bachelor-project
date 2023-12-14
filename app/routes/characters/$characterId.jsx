import React from "react";
import { useLoaderData } from "remix";
import { db, auth, onAuthStateChanged } from "../../firebase";
import { getDoc, doc, getDocs, collection, where } from "firebase/firestore";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { json } from "@remix-run/node";
import { Main, CoreTraits, Advantages, CharacterProfile } from "@/components";
import Image from "next/image";
import { SideBar } from "../../components";

export const meta = () => {
    return [
      { title: "index" },
      { name: "description", content: "Redirecting to Campaigns" },
    ];
  };

  export async function loader ({ request, params }) {

    const characterData = await getDoc(doc(db, "characters", params.characterId));

    //Check if user is signed in
  let userId = null;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      userId = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const allMyCharacters = await getDocs(collection(db, "characters"), where("playerId", "==", userId));

  let allMappedCharacters = allMyCharacters.map((character) => (
    {title: character.firstName + " " + character.lastName, 
    subTitle: character.clan.title + ", " + character.generation + "th gen.",
    url: "/characters/" + character.id, 
    rightIMG: character.clan.img,
    leftIMG: character.img || "/img/placeholder_character_small.png",
  }
  ));

  let numberEnding;
  switch (characterData.generation)
    {
        case 1:
        case 21:
        case 31:
            numberEnding = "st";
            break;
        case 2:
        case 22:
          numberEnding = "nd";
            break;
        case 3:
        case 23:
          numberEnding = "rd";
            break;
        default:
          numberEnding = "th";
            break;
    }

    return json ({
      allMappedCharacters,
      numberEnding,
      characterData,
      yourCharacter: userId === characterData.playerId
    });
  }

export default function ChosenCharacter() {
  const {allMappedCharacters, characterData, numberEnding, yourCharacter} = useLoaderData();

  const {
    currentStepIndex,
    steps,
    step,
    goTo,
  } = useMultistepForm([
    <CoreTraits key={0} {...characterData} title="Core Traits"/>,
    <Advantages key={1} {...characterData} title="Advantages & Flaws"/>,
    <CharacterProfile key={2} {...characterData}  title="Profile"/>,
  ]);

  //title: ,
//sections: [{title: , url: "/", createNewOption: {title: , url:"/" } subSections: [{title: , to: "/", type: "character" || "campaign" || "singleLine" || "doubleLine"}]}

    return (
      <>
      <SideBar title="My Characters" sections={[{
        title: "Vampire: The Masquerade, 5th Edition",
        subSections: [allMappedCharacters],
        createNewOption: { title: "Create new character", url: "/characters/new"}
      }]}/>
      <Main>
        <div>
          <div>
            <h1>{characterData.nickname? characterData.nickname : characterData.firstName}</h1>
            <div>
              <div className="bg-red-medium rotate-45 w-14">
                <Image src={characterData.clan.img} alt={characterData.clan.title} width={50} height={50} className="-rotate-45"/>
              </div> 
              <div>
                <div className="border-b-2 border-red-medium flex">
                  <div>
                    <h4>Clan</h4>
                    <p>{characterData.clan.title}</p>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5"></div>
                  <div>
                    <h4>Predator type</h4>
                    <p>{characterData.predatorType}</p>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5"></div>
                  <div>
                    <h4>Sect</h4>
                    <p>{characterData.sect}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <p>{characterData.generation}{numberEnding}</p>
                    <h4>Generation</h4>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5"></div>
                  <div>
                    <p>{characterData.ambition}</p>
                    <h4>Ambition</h4>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5"></div>
                  {characterData.chronicle &&
                    <div>
                      <p>{characterData.chronicle}</p>
                      <h4>Chronicle</h4>
                    </div>
                  }
                </div>
              </div>
              <div className="bg-red-medium rotate-45 w-9">
                <p className="-rotate-45">{characterData.unspentExp}</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="border-b-2 border-grey-dark w-full">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`rounded-t-md text-white text-sm ${currentStepIndex === index ? "bg-red-medium" : "bg-grey-medium"}`}
                >
                  {step.props.title}
                </button>
              ))}
            </div>
            {step}
          </div>
        </div>
        <div className="h-full w-1/4">
          <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
          <div className="w-full">
                <p>Character stat section</p>
                {yourCharacter && <button>Edit button appears if it's your character</button>}
          </div>
        </div>
      </Main>
      </>
    );
  }
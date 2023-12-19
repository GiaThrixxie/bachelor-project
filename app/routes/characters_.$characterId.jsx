import React from "react";
import { useLoaderData } from "@remix-run/react";
import { db } from "../../firebase";
import { getDoc, doc, getDocs, collection, where } from "firebase/firestore";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { json } from "@remix-run/node";
import Main from "../components/Main";
import CoreTraits from "../components/CoreTraits";
import Advantages from "../components/Advantages";
import SideBar from "../components/SideBar";
import CharacterProfile from "../components/CharacterProfile";
import Dots from "../components/Dots";
import { getUserSession } from "../../session.server";

export const meta = ({data}) => {
    return [
      { title: `${data.characterData.firstName} '${data.characterData.nickname}' ${data.characterData.lastName}` },
      { name: "description", content: "" },
    ];
  };

  export async function loader ({ request, params }) {
    
    /*
    This is the code that should be used when the user is logged in - commented out due to login not working as intended
    let userId;

    const sessionUser = await getUserSession(request);
    if (!sessionUser) {
      //return redirect("/characters");
      
    } else {
      userId = sessionUser.uid;
    }

    const characterData = await db.collection("characters").doc(params.characterId).get();
    console.log(characterData.data());

    const myCharactersQuerySnapshot = await db.collection("characters").where("playerId", "==", userId).get();
    let allMyCharacters = [];
    myCharactersQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allMyCharacters.push({ id: doc.id, ...doc.data() });
      return allMyCharacters;
    });*/
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
  
  

    const characterDataQuerySnapshot = await db.collection("characters").doc(params.characterId).get();
    let initialCharacterData = {
      id: characterDataQuerySnapshot.id,
      ...characterDataQuerySnapshot.data()
    };

    let characterData = {
      ...initialCharacterData,
      dateOfBirth: convertTimestampToDateString(initialCharacterData.dateOfBirth),
      dateOfDeath: convertTimestampToDateString(initialCharacterData.dateOfDeath),
    }

    //const characterData = await getDoc(doc(db, "characters", params.characterId));

    // Temporary code to get all characters instead of all the user's characters just to fill the sidebar
    const charactersQuerySnapshot = await db.collection("characters").get();
    let allCharacters = [];
    charactersQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allCharacters.push({ id: doc.id, ...doc.data() });
      return allCharacters;
    });


    let allMappedCharacters = allCharacters.map((character) => (
      {title: character.firstName + " " + character.lastName, 
      subTitle: character.clan + ", " + character.generation + "th gen.",
      url: "/characters/" + character.id, 
      rightIMG: "/img/" + character.clan + "_icon.webp",
      leftIMG: character.img || "/img/placeholder_character_small.jpg",
    }
    ));
    
  //const allMyCharacters = await getDocs(collection(db, "characters"), where("playerId", "==", userId));

  /*let allMappedCharacters = allMyCharacters.map((character) => (
    {title: character.firstName + " " + character.lastName, 
    subTitle: character.clan.title + ", " + character.generation + "th gen.",
    url: "/characters/" + character.id, 
    rightIMG: character.clan.img,
    leftIMG: character.img || "/img/placeholder_character_small.png",
  }
  ));*/

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
      //yourCharacter: userId === characterData.playerId
    });
  }

export default function ChosenCharacter() {
  const {allMappedCharacters, characterData, numberEnding, /*yourCharacter*/} = useLoaderData();

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
      <div className="flex h-full w-full max-w-screen">
      <SideBar title="My Characters" sections={[{
        title: "Vampire: The Masquerade, 5th Edition",
        subSections: allMappedCharacters,
        createNewOption: { title: "Create new character", url: "/create/character"}
      }]}/>
      <Main>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-3 items-center w-full">
            <h1>{characterData.nickname? characterData.nickname : characterData.firstName}</h1>
            <div className="flex items-center">
              <div className="bg-red-medium rotate-45 w-14 h-14 flex items-center justify-center mx-2">
                <img src={`/img/${characterData.clan}_icon.webp`} alt={characterData.clan} width={50} height={50} className="-rotate-45"/>
              </div> 
              <div>
                <div className="border-b-2 border-red-medium flex items-center">
                  <div>
                    <h4>Clan</h4>
                    <p>{characterData.clan}</p>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5 h-5 mx-4"></div>
                  <div>
                    <h4>Predator type</h4>
                    <p>{characterData.predatorType}</p>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5 h-5 mx-4"></div>
                  <div>
                    <h4>Sect</h4>
                    <p>{characterData.sect}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <p>{characterData.generation}{numberEnding}</p>
                    <h4>Generation</h4>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5 h-5 mx-4"></div>
                  <div>
                    <p>{characterData.ambition}</p>
                    <h4>Ambition</h4>
                  </div>
                  <div className="bg-red-medium rotate-45 w-5 h-5 mx-4"></div>
                  {characterData.chronicle &&
                    <div>
                      <p>{characterData.chronicle}</p>
                      <h4>Chronicle</h4>
                    </div>
                  }
                </div>
              </div>
              <div className="bg-red-medium rotate-45 w-9 h-9 flex items-center justify-center mx-1">
                <p className="-rotate-45">{characterData.unspentExp || "N/A"}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex border-b-2 border-grey-dark w-full gap-1">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`rounded-t-md text-white text-sm p-1 ${currentStepIndex === index ? "bg-red-medium" : "bg-grey-medium"}`}
                >
                  {step.props.title}
                </button>
              ))}
            </div>
            <div className="h-full w-full">
              {step}
            </div>
          </div>
        </div>
      </Main>
        <div className="h-full w-1/4">
          <div className="absolute left-0 w-1 h-full bg-grey-medium"></div>
          <div className="w-full">
                <p>Character stat section</p>
                {/*yourCharacter && <button>Edit button appears if it's your character</button>*/}
          </div>
        </div>
      </div>
    );
  }
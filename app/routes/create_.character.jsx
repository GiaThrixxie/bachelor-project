import {React, useState} from "react";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { db, auth, onAuthStateChanged } from "../../firebase";
import { getDoc, doc, addDoc, collection, where, Timestamp } from "firebase/firestore";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { json, redirect } from "@remix-run/node";
import Main from "../components/Main";
import CoreTraits from "../components/CoreTraits";
import Advantages from "../components/Advantages";
import CharacterProfile from "../components/CharacterProfile";
import ProgressBar from "../components/ProgressBar";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
import CreateCharacterAdvantagesAndFlaws from "../components/CreateCharacterAdvantagesAndFlaws";
import CreateCharacterAttributes from "../components/CreateCharacterAttributes";
import CreateCharacterClan from "../components/CreateCharacterClan";
import CreateCharacterDisciplines from "../components/CreateCharacterDisciplines";
import CreateCharacterPredatorType from "../components/CreateCharacterPredatorType";
import CreateCharacterSkills from "../components/CreateCharacterSkills";
import CreateCharacterWhoAreYou from "../components/CreateCharacterWhoAreYou";
import CreateCharacterWhoAreYouInDepth from "../components/CreateCharacterWhoAreYouInDepth";
import { getUserSession } from "../../session.server";


export const meta = () => {
    return [
      { title: "Create Character" },
      { name: "description", content: "Create your new character" },
    ];
  };

  export async function loader ({ request, params }) {
    let clans  = [];

    const clanQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("character").doc("clans").collection("data").get();
    clanQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      clans.push({ id: doc.id, ...doc.data() });
      return clans;
    });

    let disciplines  = [];

    const disciplinesQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("character").doc("disciplines").collection("data").get(); 
    disciplinesQuerySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      let powers = [];

      let powersSnapshot = await db.collection("games").doc("VTM_5e").collection("character").doc("disciplines").collection("data").doc(doc.id).collection("powers").get();
      powersSnapshot.forEach(async (doc) => {
          // doc.data() is never undefined for query doc snapshots
          powers.push({ id: doc.id, ...doc.data() });
          return powers;
      });

      let rituals = [];
        let ritualsSnapshot = await db.collection("games").doc("VTM_5e").collection("character").doc("disciplines").collection("data").doc(doc.id).collection("rituals").get();
        ritualsSnapshot.forEach(async (doc) => {
          // doc.data() is never undefined for query doc snapshots
          rituals.push({ id: doc.id, ...doc.data() });
          return rituals;
      });

      if (doc.id === "bloodSorcery") {
          disciplines.push({ id: doc.id, ...doc.data(), powers: powers, rituals: rituals });
          return disciplines;
      }
      else {
      disciplines.push({ id: doc.id, ...doc.data(), powers: powers });
      return disciplines;
      }
    });

    let predatorTypes  = [];

    const predatorTypesQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("character").doc("predatorTypes").collection("data").get();
    predatorTypesQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      predatorTypes.push({ id: doc.id, ...doc.data() });
      return predatorTypes;
    });

    let merits  = [];

    const meritsQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("advantages").doc("merits").collection("data").get();
    meritsQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      merits.push({ id: doc.id, ...doc.data() });
      return merits;
    });

    let backgrounds  = [];

    const backgroundsQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("advantages").doc("backgrounds").collection("data").get();
    backgroundsQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      backgrounds.push({ id: doc.id, ...doc.data() });
      return backgrounds;
    });

    let attributes  = [];
    let attributeDistribution;

    const attributesBaseQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("coreTraits").doc("attributes");
      attributesBaseQuerySnapshot.get().then((doc) => {
      // doc.data() is never undefined for query doc snapshots
      attributeDistribution = doc.data().distribution;
      return attributeDistribution;
    });
    
    const attributesQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("coreTraits").doc("attributes").collection("data").get();
    attributesQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      attributes.push({ id: doc.id, ...doc.data() });
      return attributes;
    });

    let skills  = [];
    let skillDistribution;

    const skillsBaseQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("coreTraits").doc("skills");
    skillsBaseQuerySnapshot.get().then((doc) => {
      // doc.data() is never undefined for query doc snapshots
      skillDistribution = doc.data().distribution;
      return skillDistribution;
    });


    const skillsQuerySnapshot = await db.collection("games").doc("VTM_5e").collection("coreTraits").doc("skills").collection("data").get();
    skillsQuerySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      skills.push({ id: doc.id, ...doc.data() });
      return skills;
    });

    /*
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
        redirect("/login");
      }
    });*/

    let userId=123;

   let initialCharacter = {
    firstName: "",
    lastName: "",
    nickname: "",
    dateOfBirth: null,
    dateOfDeath: null,
    apparentAge: null,
    actualAge: null,
    img: "",

    clan: "",

    predatorType: "",

    distinguishingFeatures: "",
    appearance: "",
    sire: "",
    history: "",
    generation: "",
    ambition: "",
    chronicle: "",
    sect: "",
    playerId: userId,
   }

   let initialAttributes = {
    strength: {
        dotAmount: 0,
        title: "Strength",
        category: "Physical",
    },
    dexterity: 0,
    stamina: 0,
    charisma: 0,
    manipulation: 0,
    composure: 0,
    intelligence: 0,
    wits: 0,
    resolve: 0,
   }

   let initialSkills = {
    athletics: {
        dotAmount: 0,
        specialties: [],
        title: "Athletics",
        description: "",
        category: "Physical",
        type: ""
    },
    brawl: 0,
    craft: 0,
    drive: 0,
    firearms: 0,
    larceny: 0,
    melee: 0,
    stealth: 0,
    survival: 0,
    animalKen: 0,
    etiquette: 0,
    insight: 0,
    intimidation: 0,
    leadership: 0,
    performance: 0,
    persuasion: 0,
    streetwise: 0,
    subterfuge: 0,
    academics: 0,
    awareness: 0,
    finance: 0,
    investigation: 0,
    medicine: 0,
    occult: 0,
    politics: 0,
    science: 0,
    technology: 0
   }

   let initialDisciplines = {
   }

   let initialAdvantages = {
      advantage_predatorType: {
        title: "",
        dotAmount: 0,
        description: "",
        type: "",
        category: "",
      },
    }


   return json ({
    initialCharacter, initialAttributes, initialSkills, initialDisciplines, initialAdvantages, userId, clans, predatorTypes, disciplines, merits, backgrounds, attributes, attributeDistribution, skills, skillDistribution});
  };

export default function CreateCharacter() {
  const {initialCharacter, initialAttributes, initialSkills, initialDisciplines, initialAdvantages, clans, predatorTypes,
     disciplines, merits, backgrounds, attributes, attributeDistribution, skills, skillDistribution} = useLoaderData();
  const actionData = useActionData();
  const [character, setCharacter] = useState(initialCharacter);
  const [attribute, setAttribute] = useState(initialAttributes);
  const [skill, setSkill] = useState(initialSkills);
  const [discipline, setDiscipline] = useState(initialDisciplines);
  const [advantage, setAdvantage] = useState(initialAdvantages);

    //Updates the state of the form fields
  function updateFields(fields, setStateName) {
      setStateName((prev) => {
      return {
          ...prev,
          ...fields,
      };
      });
  }

  const {
    currentStepIndex,
    steps,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultistepForm([
    <CreateCharacterWhoAreYou key={0} {...character} title="Who are you" actionData={actionData} updateFields={(fields) => updateFields(fields, setCharacter)}/>,
    <CreateCharacterClan key={1} {...character} title="Clan" loaderData={clans} updateFields={(fields) => updateFields(fields, setCharacter)}/>,
    <CreateCharacterPredatorType key={2} {...character} title="Predator Type" loaderData={predatorTypes} updateFields={(fields) => updateFields(fields, setCharacter)}/>,
    <CreateCharacterAttributes key={3} {...attribute} title="Attributes" loaderData={[attributes, attributeDistribution]} updateFields={(fields) => updateFields(fields, setAttribute)}/>,
    <CreateCharacterSkills key={4} {...skill} title="Skills" loaderData={[skills, skillDistribution]} updateFields={(fields) => updateFields(fields, setSkill)}/>,
    <CreateCharacterDisciplines key={5} {...discipline} title="Disciplines" loaderData={disciplines} updateFields={(fields) => updateFields(fields, setDiscipline)}/>,
    <CreateCharacterAdvantagesAndFlaws key={6} {...advantage} title="Advantages and Flaws" loaderData={[merits, backgrounds]} updateFields={(fields) => updateFields(fields, setAdvantage)}/>,
    <CreateCharacterWhoAreYouInDepth key={7} {...character} title="Finalize your character" loaderData={[character, attribute, skill, discipline, advantage]} updateFields={(fields) => updateFields(fields, setCharacter)}/>
  ]);

  // Handles the submit event - prevents the page from reloading and calls the next function
  /*function onSubmit(e) {
    e.preventDefault();
    next();
  }*/

  return (
    <>
      <Form method="post"
      className="flex items-center h-full w-full">
        <aside className="bg-grey-dark w-1/5 h-full flex-col">
          <nav className="h-5/6 flex flex-col items-center">
            <h2 className="my-4">Character Creation</h2>
            <div className="flex w-full h-full">
              <div className="h-full w-1/6">
                <ProgressBar stepsLength={steps.length} currentStepIndex={currentStepIndex} />
              </div>
              {Boolean(steps?.length) && (
                <div className="flex flex-col h-full w-5/6 divide-y-4 divide-grey-darker">
                  {steps.map((step, index) => (
                    <button
                    key={index}
                    type="button"
                    onClick={() => goTo(index)}
                    className={`${currentStepIndex === index ? "bg-grey-lighter" : "bg-grey-medium"} w-full grow hover:bg-grey-lightest`}
                    >
                        <span className="block text-lg font-bold">{step.props.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
          {/* Navigational buttons */}
          <div className="flex w-full">
              {/* Left button */}
              {!isFirstStep && ( //If it's not the first step, show the back button
                <Button title="Previous" onClick={back} />
              )}
              {/* Right button */}
              <Button title={isLastStep ? "Create Character" : "Next"} type={isLastStep ? "submit" : "button"} onClick={!isLastStep && next} />
            </div>
        </aside>
        <Main>
          <div className="flex w-full">
            {step}
          </div>
        </Main>
      </Form>
    </>
  );
}


  export async function action({ request }) {
    /*let initialCharacter = {
      firstName: "",
      lastName: "",
      nickname: "",
      dateOfBirth: "",
      dateOfDeath: "",
      apparentAge: "",
      actualAge: "",
      img: "",
  
      clan: "",
  
      predatorType: "",
  
      distinguishingFeatures: "",
      appearance: "",
      sire: "",
      history: "",
      generation: "",
      ambition: "",
      chronicle: "",
      sect: "",
      playerId: 123,
    };
    
    let initialAttributes = {
      strength: 0,
      dexterity: 0,
      stamina: 0,
      charisma: 0,
      manipulation: 0,
      composure: 0,
      intelligence: 0,
      wits: 0,
      resolve: 0,
    };

    let initialSkills = {
      athletics: 0,
      brawl: 0,
      craft: 0,
      drive: 0,
      firearms: 0,
      larceny: 0,
      melee: 0,
      stealth: 0,
      survival: 0,
      animalKen: 0,
      etiquette: 0,
      insight: 0,
      intimidation: 0,
      leadership: 0,
      performance: 0,
      persuasion: 0,
      streetwise: 0,
      subterfuge: 0,
      academics: 0,
      awareness: 0,
      finance: 0,
      investigation: 0,
      medicine: 0,
      occult: 0,
      politics: 0,
      science: 0,
      technology: 0
    };

    let initialSpecialties = {
      athletics: [],
      brawl: [],
      craft: [],
      drive: [],
      firearms: [],
      larceny: [],    
      melee: [],
      stealth: [],
      survival: [],
      
      animalKen: [],
      etiquette: [],
      insight: [],
      intimidation: [],
      leadership: [],
      performance: [],
      persuasion: [],
      streetwise: [],
      subterfuge: [],
      
      academics: [],
      awareness: [],
      finance: [],
      investigation: [],
      medicine: [],
      occult: [],
      politics: [],
      science: [],
      technology: [],
    };

    let initialDisciplines = {
      animalism: 0,
      auspex: 0,
      bloodSorcery: 0,
      celerity: 0,
      dominate: 0,
      fortitude: 0,
      obfuscate: 0,
      potence: 0,
      presence: 0,
      protean: 0,
      thinBloodAlchemy: 0,
    };

    let initialAdvantages = {
      backgrounds: {
        allies: [
          {
            title: "Allies",
            dotAmount: 0,
            description: "You have a number of allies who can help you in a variety of situations. The more dots you have in this background, the more powerful your allies are.",
            type: "Background",
            category: "Allies",
          }
        ],
        contacts: [],
        fame: [],
        haven: [],
        herd: [],
        influence: [],
        mask: [],
        resources: [],
        retainers: [],
        status: [],
      },
      merits: {
        archaic: [],
        bonding: [],
        feeding: [],
        linguistics: [],
        looks: [],
        mythic: [],
        substanceUse: [],
        thinBlood: [],
      }
    };*/



    //const form = await request.formData();
    //const values = Object.fromEntries(form);

    // Finds all the keys that start with the given string and returns them in a new object, without the original string input in the key, so attribute_strength becomes strength
    /*function findbyKey(key) {
        Object.keys(values).filter(function(k) {
            return k.indexOf(key) == 0;
        }).reduce(function(newData, k) {
            newData[k.substring(key.length)] = values[k];
            return newData;
        }, {});
    };*/

    /*function findbyKey(key) {
        Object.keys(values).filter(function(k) {
            return k.indexOf(key) == 0;
        }).reduce(function(newData, k) {
            newData[k] = values[k];
            return newData;
        }, {});
    } */

    /*let attributesByKey = findbyKey('attribute_');
    let skillsByKey = findbyKey('skill_');
    let specialtiesByKey = findbyKey('specialty_');
    let disciplinesByKey = findbyKey('discipline_');
    let flawsByKey = findbyKey('flaw_');
    let merits = findbyKey('merit_');

    let skills = [];

    let categories = {
      physical: [
        "strength",
        "dexterity",
        "stamina",
        "athletics",
        "brawl",
        "craft",
        "drive",
        "firearms",
        "larceny",
        "melee",
        "stealth",
        "survival"
      ],
      social: [
        "charisma",
        "manipulation",
        "composure",
        "animalKen",
        "etiquette",
        "insight",
        "intimidation",
        "leadership",
        "performance",
        "persuasion",
        "streetwise",
        "subterfuge",
      ],
      mental: [
        "intelligence",
        "wits",
        "resolve",
        "academics",
        "awareness",
        "finance",
        "investigation",
        "medicine",
        "occult",
        "politics",
        "science",
        "technology",
      ]
    };*/
    
    // Pushes the values from the object to the array if the value is not 0 or undefined,
    // and checks what category the key belongs to.
    // Then it pushes the values to the array with the correct category and title.
    // The replace function adds a space before every capital letter and capitalizes the first letter of the string. This means that, for example, animalKen becomes Animal Ken.
    /*function pushToArray(objectByKey, array) {
      for (let [key, value] of Object.entries(objectByKey)) {
        if (value !== 0 && value !== undefined) {
        categories.forEach(category => {
          if (category.includes(key)) {
            array.push({title: key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2'), dotAmount: value, category: category});
          }
        });
        }
      }
    };

    pushToArray(skillsByKey, skills);
    pushToArray(attributesByKey, attributes);
    pushToArray(specialtiesByKey, skills);
    pushToArray(disciplinesByKey, disciplines);
    pushToArray(flawsByKey, flaws);
    pushToArray(meritsByKey, merits);

    //examples of how merits and flaws are save in the db
    flawsAndMeritsFormat = [
      {
        title:"Beautiful",
        dotAmount: 2,
        description: "You add one extra die to all appropriate Social dice pools.",
        type: "Merit",
        category: "Looks",
      }
    ];*/

    const { 
      firstName,
      lastName,
      nickname,
      dateOfBirth,
      dateOfDeath,
      apparentAge,
      actualAge,
      img,
  
      clan,
  
      predatorType,
  
      distinguishingFeatures,
      appearance,
      sire,
      history,
      generation,
      ambition,
      chronicle,
      sect,

      bloodPotency,
      athletics,
      brawl,
      craft,
      drive,
      firearms,
      larceny,
      melee,
      stealth,
      survival,
      animalKen,
      etiquette,
      insight,
      intimidation,
      leadership,
      performance,
      persuasion,
      streetwise,
      subterfuge,
      academics,
      awareness,
      finance,
      investigation,
      medicine,
      occult,
      politics,
      science,
      technology,

    } =
      values;
    
      console.log(values);

    

    async function CreateNewCharacter() {
      /*try {

              health = stamina + 3,
      willpower = composure + resolve,
      hunger = 1,
      humanity = 7 + humanity,
        
        specialty_athletics_VALUE = 
        let initialSpecialties = {
          athletics: [],
          brawl: [],
          craft: [],
          drive: [],
          firearms: [],
          larceny: [],    
          melee: [],
          stealth: [],
          survival: [],
          
          animalKen: [],
          etiquette: [],
          insight: [],
          intimidation: [],
          leadership: [],
          performance: [],
          persuasion: [],
          streetwise: [],
          subterfuge: [],
          
          academics: [],
          awareness: [],
          finance: [],
          investigation: [],
          medicine: [],
          occult: [],
          politics: [],
          science: [],
          technology: [],
        };
    
        let initialDisciplines = {
          animalism: 0,
          auspex: 0,
          bloodSorcery: 0,
          celerity: 0,
          dominate: 0,
          fortitude: 0,
          obfuscate: 0,
          potence: 0,
          presence: 0,
          protean: 0,
          thinBloodAlchemy: 0,
        };
    
        let initialAdvantages = {
          backgrounds: {
            allies: [],
            contacts: [],
            fame: [],
            haven: [],
            herd: [],
            influence: [],
            mask: [],
            resources: [],
            retainers: [],
            status: [],
          },
          merits: {
            archaic: [],
            bonding: [],
            feeding: [],
            linguistics: [],
            looks: [],
            mythic: [],
            substanceUse: [],
            thinBlood: [],
          }
        };

        function ifEmptyDontAdd(obj, key, value) {
          if (value !== 0) {

            obj[key] = value;
          }
        };


        const newCharacter = {
            firstName: firstName,
            lastName: lastName,
            nickname: nickname,
            dateOfBirth: fromDate(dateOfBirth),
            dateOfDeath: fromDate(dateOfDeath),
            apparentAge: apparentAge,
            actualAge: actualAge,
            img: img,
            clan: clan,
            predatorType: predatorType,
            distinguishingFeatures: distinguishingFeatures,
            appearance: appearance,
            sire: sire,
            history: history,
            generation: generation,
            ambition: ambition,
            chronicle: chronicle,
            sect: sect,
            health: health,
            willpower: willpower,
            hunger: hunger,
            humanity: humanity,
            bloodPotency: bloodPotency,
            attributes: [{
              title: "Strength",
              category: "physical",
              dotAmount: strength
            },
            {
              title: "Dexterity",
              category: "physical",
              dotAmount: dexterity
            },
            {
              title: "Stamina",
              category: "physical",
              dotAmount: stamina
            },
            {
              title: "Charisma",
              category: "social",
              dotAmount: charisma
            },
                charisma: charisma,
                manipulation: manipulation,
                composure: composure,
                intelligence: intelligence,
                wits: wits,
                resolve: resolve,
              ],
            skills: {
                athletics: athletics,
                brawl: brawl,
                craft: craft,
                drive: drive,
                firearms: firearms,
                larceny: larceny,
                melee: melee,
                stealth: stealth,
                survival: survival,
                animalKen: animalKen,
                etiquette: etiquette,
                insight: insight,
                intimidation: intimidation,
                leadership: leadership,
                performance: performance,
                persuasion: persuasion,
                streetwise: streetwise,
                subterfuge: subterfuge,
                academics: academics,
                awareness: awareness,
                finance: finance,
                investigation: investigation,
                medicine: medicine,
                occult: occult,
                politics: politics,
                science: science,
                technology: technology,
            },
            disciplines: {
                disciplines: disciplines,
            },
            playerId: userId,
        };
        
      // Add a new document with a generated id.

      await db.collection("characters").add(newCharacter)
      .then((docRef) => {
        return redirect(`/characters/${docRef.id}`);
      })
      .catch((error) => {
          console.error("Could not edit character: ", error);
      });

      //Example of an update function
      let characterRef = db.collection("characters").doc(characterId);

      //let characterUpdates = {
        firstName: "Peaches" //Updates the firstName field to Peaches
      }

      //return characterRef.update(characterUpdates)
      .then(() => {
          console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

      // Example of a delete function
      //db.collection("characters").doc(characterId).delete().then(() => {
          return redirect(`/characters/`);
      }).catch((error) => {
          console.error("Could not delete character: ", error);
      });

    }
    catch (error) {
      console.error(error);
    }*/

  }
}
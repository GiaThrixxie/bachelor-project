import {React, useState} from "react";
import { useLoaderData, useActionData } from "remix";
import { db, auth, onAuthStateChanged } from "../../firebase";
import { getDoc, doc, addDoc, collection, where, Timestamp } from "firebase/firestore";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { json, redirect } from "@remix-run/node";
import { Main, CoreTraits, Advantages, CharacterProfile } from "@/components";
import Image from "next/image";
import { ProgressBar, SideBar } from "../../components";

export const meta = () => {
    return [
      { title: "index" },
      { name: "description", content: "Create your new character" },
    ];
  };

  export async function loader ({ request, params }) {

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
  });

   let initialCharacter = {
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
    playerId: userId,
   }

   let initialAttributes = {
    strength: {
        dotAmount: 0,
        title: "Strength",
        description: "",
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
    }


   return json ({
    initialCharacter, initialAttributes, initialSkills, initialDisciplines, initialAdvantages});

  }

export default function ChosenCharacter() {
    const {initialCharacter, initialAttributes, initialSkills, initialDisciplines, initialAdvantages} = useLoaderData();
    const [character, setCharacter] = useState(initialCharacter);
    const [attribute, setAttribute] = useState(initialAttributes);
    const [skill, setSkill] = useState(initialSkills);
    const [discipline, setDiscipline] = useState(initialDisciplines);
    const [advantage, setAdvantage] = useState(initialAdvantages);
    const [attributeDistribution, setAttributeDistribution] = useState({atOne: 1, atTwo: 2, atThree: 3, atFour: 4, atFive: 5});
    const [skillDistribution, setSkillDistribution] = useState({skOne: 1, skTwo: 2, skThree: 3, skFour: 4, skFive: 5});

    const actionData = useActionData();

     //Updates the state of the form fields and errors
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
    <CreateCharacterClan key={1} {...character} title="Clan" updateFields={(fields) => updateFields(fields, setCharacter)}/>,
    <CreateCharacterPredatorType key={2} {...character} title="Predator Type" updateFields={(fields) => updateFields(fields, setCharacter)}/>,
    <CreateCharacterAttributes key={3} {...attribute} title="Attributes" updateFields={(fields) => updateFields(fields, setAttribute)}/>,
    <CreateCharacterSkills key={4} {...skill} title="Skills" updateFields={(fields) => updateFields(fields, setSkill)}/>,
    <CreateCharacterDisciplines key={5} {...discipline} title="Disciplines" updateFields={(fields) => updateFields(fields, setDiscipline)}/>,
    <CreateCharacterAdvantagesAndFlaws key={6} {...advantage} title="Advantages and Flaws" updateFields={(fields) => updateFields(fields, setAdvantage)}/>,
    <CreateCharacterWhoAreYouInDepth key={7} {...character} title="M" updateFields={(fields) => updateFields(fields, setCharacter)}/>
  ]);

    // Handles the submit event - prevents the page from reloading and calls the next function
    function onSubmit(e) {
        e.preventDefault();
        next();
    }

    return (
      <>
        <form
        className="flex flex-col items-center h-full w-full"
        onSubmit={onSubmit}>
      <aside className="bg-dark w-1/5">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                <nav className="flex items-center justify-between">
                    <div>
                        <span className="block text-lg font-bold">Character Creation</span>
                    </div>
                    <div className="flex">
                        <div className="w-1/5 justify-center items-center">
                            <ProgressBar steps={steps} currentStepIndex={currentStepIndex} />
                        </div>
                    {Boolean(steps?.length) && (
                        <div className="flex items-center gap-4 w-4/5">
                            {steps.map((step, index) => (
                                 <button
                                 key={index}
                                 onClick={() => goTo(index)}
                                 className={` text-white text-sm ${currentStepIndex === index ? "bg-grey-lighter" : "bg-grey-medium"}`}
                             >
                                <span className="block text-lg font-bold">{step.props.title}</span>
                             </button>
                            ))}
                        </div>
                    )}
                    </div>
                </nav>
            </div>
        </aside>
      <Main>
        {step}
        {/* Navigational buttons */}
      <div className="flex w-5/6 relative">
          {/* Left button */}
          {!isFirstStep &&
            !isLastStep && ( //If it's not the first or last step, show both buttons
              <Button
                title="Last"
                btnType="button"
                handleClick={back}
                btnStyleOverride={
                  "w-40 h-16 bg-secondary-500 hover:bg-secondary-700 font-bold py-2 px-6 rounded-md flex items-center absolute -bottom-5 left-0"
                }
                iconLeft={
                  <TbArrowLeft size={24} className="stroke-background-500" />
                }
              />
            )}

          {/* Right button */}
          {!isLastStep && ( //If it's not the last step, show the next button
            <Button
              btnType={isLastStep ? "submit" : "button"} //Burde ændres fra isLastStep til isSecondToLastStep, men dette skærer spørgsmålsformularen væk - det burde fungere anyway, og hvis det gør så kan denne prop slettes
              title={isLastStep ? "Create Character" : "Next"}
              handleClick={next}
              btnStyleOverride={
                "w-40 h-16 bg-secondary-500 hover:bg-secondary-700 font-bold py-2 px-6 rounded-md flex items-center absolute -bottom-5 right-0"
              }
              iconRight={
                <TbArrowRight size={24} className="stroke-background-500" />
              }
            />
          )}
        </div>
      </Main>
      </form>
      </>
    );
  }


  export async function action({ request }) {
    let initialCharacter = {
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
        playerId: userId,
       }
    
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
    }

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
    }

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
    }

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
    }

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
    }



        const form = await request.formData();
        const values = Object.fromEntries(form);

        function findbyKey(key) {
            Object.keys(values).filter(function(k) {
                return k.indexOf(key) == 0;
            }).reduce(function(newData, k) {
                newData[k.substring(key.length+1)] = values[k];
                return newData;
            }, {});
        }

        /*function findbyKey(key) {
            Object.keys(values).filter(function(k) {
                return k.indexOf(key) == 0;
            }).reduce(function(newData, k) {
                newData[k] = values[k];
                return newData;
            }, {});
        } */

        let attributes = findbyKey('attributes');
        let skills = findbyKey('skills');
        let specialties = findbyKey('specialty');
        let disciplines = findbyKey('discipline');
        let backgrounds = findbyKey('background');
        let merits = findbyKey('merit');

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

            health,
            willpower,
            hunger,
            humanity,
            bloodPotency,
         } =
            values;

            async function CreateNewCharacter() {
                try {

                    const candidate = await db.models.Candidate.create({
                        sensitiveData: sensitiveData._id,
                        education,
                        firstName,
                        lastName,
                        email,
                        userType: "candidate",
                    });
                    const collectionName = candidate?.constructor.modelName;
                
                    const session = await getSession(request.headers.get("Cookie"));
                    session.set("userId", candidate._id);
                    session.set("userRole", collectionName.toLowerCase());
            
            
                    const newCharacter = {
                        firstName: firstName,
                        lastName: lastName,
                        nickname: nickname,
                        dateOfBirth: Timestamp.fromDate(dateOfBirth),
                        dateOfDeath: dateOfDeath,
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
                        health: stamina + 3,
                        willpower: composure + resolve,
                        hunger: 1,
                        humanity: 7 + humanity,
                        bloodPotency: bloodPotency,
                        playerId: userId,
                        attributes: {
                            strength: strength,
                            dexterity: dexterity,
                            stamina: stamina,
                            charisma: charisma,
                            manipulation: manipulation,
                            composure: composure,
                            intelligence: intelligence,
                            wits: wits,
                            resolve: resolve,
                        },
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
                        }
                    };
                    
                    // Add a new document with a generated id.
                    let addedCharacter = await addDoc(collection(db, "characters"), newCharacter);
                
                    return redirect(`/characters/${addedCharacter.id}`);
                    
                    } catch (error) {
                    if (
                        error.code === 11000 &&
                        error.keyPattern &&
                        error.keyPattern.email === 1
                    ) {
                        return json(
                        {
                            errors: {
                            email: {
                                message: "Email already exists. Have you tried logging in?",
                            },
                            },
                            values,
                        },
                        { status: 400 }
                        );
                    }
                    return json({ errors: error.errors, values }, { status: 400 });
                    }
            }
      try {
    
        const candidate = await db.models.Candidate.create({
          sensitiveData: sensitiveData._id,
          education,
          firstName,
          lastName,
          email,
          userType: "candidate",
        });
        const collectionName = candidate?.constructor.modelName;
    
        const session = await getSession(request.headers.get("Cookie"));
        session.set("userId", candidate._id);
        session.set("userRole", collectionName.toLowerCase());


        const newCharacter = {
            firstName: firstName,
            lastName: lastName,
            nickname: nickname,
            dateOfBirth: Timestamp.fromDate(dateOfBirth),
            dateOfDeath: dateOfDeath,
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
            health: stamina + 3,
            willpower: composure + resolve,
            hunger: 1,
            humanity: 7 + humanity,
            bloodPotency: bloodPotency,
            playerId: userId,
            attributes: {
                strength: strength,
                dexterity: dexterity,
                stamina: stamina,
                charisma: charisma,
                manipulation: manipulation,
                composure: composure,
                intelligence: intelligence,
                wits: wits,
                resolve: resolve,
            },
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
            }
        };
        
        // Add a new document with a generated id.
        let addedCharacter = await addDoc(collection(db, "characters"), newCharacter);
    
        return redirect(`/characters/${addedCharacter.id}`);
        
      } catch (error) {
        if (
          error.code === 11000 &&
          error.keyPattern &&
          error.keyPattern.email === 1
        ) {
          return json(
            {
              errors: {
                email: {
                  message: "Email already exists. Have you tried logging in?",
                },
              },
              values,
            },
            { status: 400 }
          );
        }
        return json({ errors: error.errors, values }, { status: 400 });
      }
  }
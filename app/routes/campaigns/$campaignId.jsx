import { SideBar } from "@components";
import { collection, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { db, auth, onAuthStateChanged } from "../../firebase";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const meta = () => {
    return [
      { title: "index" },
      { name: "description", content: "Redirecting to Campaigns" },
    ];
  };
  

  export async function loader ({params }) {

    const characterData = await getDoc(doc(db, "characters", params.characterId));

    //Check if user is signed in
    let userId;
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

  

    const q = query(collection(db, "characters"), where("playerId", "==", userId));
    const allMyCharacters = await getDocs(q);
    allMyCharacters.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    return json ({
      characterData: characterData,
      userId: userId
    });
  }

export default function ChosenCampaign(campaignData) {
  const {characterData, userId} = useLoaderData();

  

  let locations = campaignData.locations.map((location, index) => (
    {key:{index}, id: location.id, title: location.title, to:"/", type:"singleLine"}
  ));



  let playerCharacters = campaignData.playerCharacters;
  let nonPlayerCharacters = campaignData.nonPlayerCharacters;
  let notes = campaignData.notes;

  let userHasPC = campaignData.playerCharacters.some(u=>u.playerId === userId);
  


    return (
      <>
        <SideBar title={campaignData.title} sections={[
          { title: "World", 
            subSections:[locations],
            createNewOption: {title:"", url:`create/location`} },

          userHasPC ? 
          { title: "Player Characters",
            subSections:[playerCharacters]} 
          : 
          { title: "Player Characters",
            subSections:[playerCharacters],
            createNewOption: {title:"Create new character", url:`create/pc/`}},
            
          { title: "NPCs", url: "/npc/",
          subSections:[nonPlayerCharacters],
          createNewOption: {title:"Create new NPC", url:`create/npc/`} },
          { title: "Session notes", url: "/notes/" },
        ].filter(Boolean)}
        />
        <div>
          <p>Campaigns</p>
        </div>
      </>
    );
  }

  /*
{ title: "Player Characters", 
            subSections:[playerCharacters],
            {campaignData.playerCharacters.some(u=>u.playerId === userId) && createNewOption: {title:"Create new character", url:`create/pc/`}} }


{title: "", to:"/", type:"character" || "campaign" || "singleLine" || "doubleLine"}

  
 <aside className="bg-dark w-1/5">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
        <nav className="flex items-center justify-between">
            <div>
                <NavLink to="/" className={({isActive}) => isActive && linkClasses}>
                <span className="block text-lg font-bold">{title}</span>
                </NavLink>
            </div>
            {Boolean(sections?.length) && (
                <div className="flex items-center gap-4">
                    {sections.map((section, index) => (
                        section.subSections || section.createNewOption ? 
                        <Dropdown key={index} title={section.title} subSections={section.subSections} createNewOption={section.createNewOption}/>
                        : 
                        <NavLink key={index} to={section.url} className={({isActive}) => linkClasses + isActive && activeClasses}>
                            <span className="block text-lg font-bold">{section.title}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    </div>
</aside>





  
      //title: ,
//sections: [{title: , url: "/", createNewOption: {title: , url:"/" } subSections: [{title: , to: "/", type: "character" || "campaign" || "singleLine" || "doubleLine"}]}
  

<Header
  links={[
    { title: "Characters", url: "/characters/" },
    { title: "Campaigns", url: "/campaigns/" },
    !signedIn && { title: "Login", url: "/login/" },
    !signedIn && { title: "Sign up", url: "/sign-up/" },
  ].filter(Boolean)}
  avatar={avatar}
  signedIn={signedIn}
/>

*/
import React from "react";
import CharacterCampaignCard from "../components/CharacterCampaignCard";
import Main from "../components/Main";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase-admin/firestore";
import { getUserSession } from "../../session.server";
import Button from "../components/Button";

export const meta = () => {
    return [
      { title: "Characters" },
      { name: "description", content: "List of all characters" },
    ];
  };


export async function loader({request}) {
  let userId;

    const sessionUser = await getUserSession(request);
    if (!sessionUser) {
      //return redirect("/characters");
      
    } else {
      userId = sessionUser.uid;
    }

  const charactersQuerySnapshot = await db.collection("characters").get();
  let characters = [];
  charactersQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    characters.push({ id: doc.id, ...doc.data() });
    return characters;
  });

  /*const characters = await getDocs(collection(db, "characters"));
  characters.forEach((doc) => {
    let characterData = doc.data();
    characterData.id = doc.id;
  });*/

  return (
    { characters, userId}
    )
};



export default function Characters() {
  const { characters, userId } = useLoaderData();

    return (
      <Main>
        { userId !== undefined && 
          <div className="h-1/4">
            <div className="flex items-center mb-7">
              <h2>My Characters</h2>
              { userId && 
              <Link to="/create/character" className="ml-4">
                <Button title="Create New Character" />
              </Link>}
            </div>
            {characters?.length ? (
              characters.filter(data => data.playerId === `${userId}`).map((character) => (
                <CharacterCampaignCard
                  id={character.id}
                  key={character.id}
                  img={character.img ? character.img : '/img/placeholder_character_card.png'}
                  title={character.nickname ? character.nickname : character.firstName}
                  clan={character.clan}
                  generation={character.generation}
                />
              ))
            ) : (
              <div className="mt-4 text-center text-xl font-semibold">
                No characters found
              </div>
            )}
          </div>
        }
        <div className="h-full">
          <div className="flex items-center mb-7">
            <h2>Public Characters</h2>
            { !userId && 
            <Link to="/create/character" className="ml-4">
              <Button title="Create New Character" />
            </Link>}
          </div>
          <div className="h-full w-full flex flex-wrap gap-8">
            {characters?.length ? (
              characters.filter(data => data.playerId !== `${userId}`).map((character) => (
                <CharacterCampaignCard
                  id={character.id}
                  key={character.id}
                  img={character.img ? character.img : '/img/placeholder_character_card.png'}
                  title={character.nickname ? character.nickname : character.firstName}
                  clan={character.clan}
                  generation={character.generation}
                />
              ))
            ) : (
              <div className="mt-4 text-center text-xl font-semibold">
                No characters found
              </div>
            )}
          </div>
        </div>
    </Main>
    );
  }

  /*import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";

export const meta = () => {
    return [
      { title: "index" },
      { name: "description", content: "Redirecting to Campaigns" },
    ];
  };

export default function Characters() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

    return (
      <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
    );
  } */
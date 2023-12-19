/*import db from "../../firebase.js";
import { doc, setDoc } from "firebase/firestore";*/
import { redirect } from "@remix-run/node";

export const meta = () => {
  return [
    { title: "index" },
    { name: "description", content: "Redirecting to Characters" },
  ];
};

export const loader = () => redirect('/characters/');

/*function addData() {
  const docRef = doc(db, "/games/VTM_5e/character/disciplines/data/thinBloodAlchemy/powers/awakenTheSleeper");
  const payload = {
    title: "Awaken the Sleeper",
lvl: 5,
description: "This formula results in an elixir which, when added to human blood, can awaken a vampire from Torpor.",
ingredients: "The alchemist's Blood, choleric or sanguine human blood, adrenaline, ammonium carbonate, hartshorn, caffeine or benzedrine, melatonin.",
system: "The alchemist taps their vessel (Calcinatio), or their own vein (Athanor Corporis) to get the Awaken the Sleeper elixir if they do not use Fixatio. They then mix the elixir into human blood. For each success above 2 on the distillation roll, the elixir can awaken a vampire of that Blood Potency. Example: Hari gets 5 successes on his Awaken the Sleeper distillation roll: this elixir can awaken a torpid vampire of Blood Potency 3 or less (5 - 2 = 3).",
distillationMethod: [
    {
    title: "Athanor Corporis",
    description: "The alchemist can tap their own vein once per night for this elixir until their next feeding, or until they reach Hunger 5. They need not pay the distillation cost again."
    },
    {
    title: "Calcinatio",
    description: "If the vessel survives the tap, the alchemist can tap them again in a week for more elixir. They need not pay the distillation cost again, but the vessel pays the Health cost (5 Aggravated damage) each time they are tapped. The Alchemist can also simply feed the vessel's blood to the sleeper directly."
    }
],
}

  setDoc(docRef, payload);

  return () => {};
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>

      <button onClick={addData} className="w-16 h-8 bg-teal-500">Add</button>
    </div>
  );
}*/

import Input from "@components";
import Section from "./Section";

export async function loader() {
    let predatorTypes  = [];

    const querySnapshot = await getDocs(collection(db, "games", "VTM_5e", "character", "predatorTypes", "data")); 
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        predatorTypes.push({ id: doc.id, ...doc.data() });
        return predatorTypes;
      });

      /*const profile = await Promise.all(querySnapshot.docs.map( async (doc) => {
        const stuffData = doc.data()
        stuffData.id = doc.id
        return stuffData
      }))*/
  
    return (
      { predatorTypes }
      )
  };

export default function CreateCharacterAdvantagesAndFlaws ({title, actionData}) {
    return (
        

    );
}
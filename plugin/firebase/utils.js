import db from "./setup";
import { updateDoc, doc, getDoc } from "@firebase/firestore";

const isDebug = process.env.NODE_ENV === "development";

export const logEvent = ({ eventName, eventData }) => {
  if (isDebug) {
    return;
  }

  switch (eventName) {
    case "cards_generated":
      cardsGeneratedLog({ count: eventData });
      break;

    default:
      console.log("Invalid events");
  }
};

const cardsGeneratedLog = async ({ count }) => {
  try {
    const cardGeneratedDocRef = doc(db, "stats/cards_generated");

    const prevDoc = await getDoc(cardGeneratedDocRef);
    const { count: prevCount } = prevDoc.data();

    await updateDoc(cardGeneratedDocRef, {
      count: prevCount + count,
      updated_at_iso: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);
  }
};

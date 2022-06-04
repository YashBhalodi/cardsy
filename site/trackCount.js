import { cardsGeneratedDocRef } from "../plugin/firebase/setup";
import { onSnapshot } from "firebase/firestore";
import { secondsToDhms } from "./utils";

const countElement = document.getElementById("generated-cards-count");
const durationSavedElement = document.getElementById("time-saved-duration");

const unsubscribe = onSnapshot(cardsGeneratedDocRef, (doc) => {
  const { count = 0 } = doc.data();
  countElement.innerText = count;
  durationSavedElement.innerText = secondsToDhms(count * 3);
});

window.onunload = () => {
  unsubscribe();
};

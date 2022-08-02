import { cardsGeneratedDocRef } from "../plugin/firebase/setup";
import { onSnapshot } from "firebase/firestore";
import { secondsToDhms } from "./utils";

const updateCountNode = (latestCount) => {
  const countElement = document.getElementById("generated-cards-count");
  const clonedCountElement = countElement.cloneNode(true);
  clonedCountElement.innerText = latestCount;
  countElement.parentElement.replaceChild(clonedCountElement, countElement);
};

const updateTimeSavedNode = (latestDurationString) => {
  const durationSavedElement = document.getElementById("time-saved-duration");
  const clonedDurationSavedElement = durationSavedElement.cloneNode(true);
  clonedDurationSavedElement.innerText = latestDurationString;
  durationSavedElement.parentElement.replaceChild(
    clonedDurationSavedElement,
    durationSavedElement
  );
};

const unsubscribe = onSnapshot(cardsGeneratedDocRef, (doc) => {
  const { count = 0 } = doc.data();
  if (count === 0) {
    document.getElementById("stat-container").style.display = "none";
  } else {
    document.getElementById("stat-container").style.display = "block";
  }
  updateCountNode(count);
  updateTimeSavedNode(secondsToDhms(count * 3));
});

window.onunload = () => {
  unsubscribe();
};

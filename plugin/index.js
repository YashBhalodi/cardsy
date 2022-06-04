import { generateCards } from "./generateCards";

const init = () => {
  const { board } = window.miro;

  board.ui.on("icon:click", async () => {
    generateCards();
  });
};

init();

import { COLOR_MAP } from "./constants";

const { board } = window.miro;

const generateCardObjectFor = (object, x, y) => {
  const objectFillColor = object.style.fillColor;

  let cardColor = "#2399f3";
  if (objectFillColor !== "transparent") {
    if (COLOR_MAP[objectFillColor]) {
      cardColor = COLOR_MAP[objectFillColor];
    } else {
      cardColor = objectFillColor;
    }
  }

  const cardObject = {
    title: object.content,
    x: x,
    y: y,
    style: {
      cardTheme: cardColor,
    },
    tagIds: object.tagIds || [],
  };

  return cardObject;
};

export const generateCards = async () => {
  // get selected widgets
  let selectedWidgets = await board.getSelection();

  // filtering out shapes from all the selected widgets.
  selectedWidgets = selectedWidgets.filter((item) => {
    return ["shape", "text", "sticky_note"].includes(item.type);
  });

  const cardsObjects = selectedWidgets.map((item) =>
    generateCardObjectFor(item, item.x + 800, item.y)
  );

  const cardsGeneratedPromise = cardsObjects.map(async (card) => {
    const cardResult = board.createCard(card);
    return cardResult;
  });

  const cardsGenerated = await Promise.all(cardsGeneratedPromise);

  if (cardsGenerated.length > 0) {
    await board.viewport.zoomTo(cardsGenerated);
    console.log(`Cardsy generated ${cardsGenerated.length} cards for you.`);
  }
};

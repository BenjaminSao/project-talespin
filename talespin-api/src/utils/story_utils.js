// Turn a text block into cleaned array split by newlines
export function convertTextToArray(textBlock) {
  const splitText = textBlock.split("\n");

  let finalArray = [];
  // Remove any number bullets points
  finalArray = splitText
    .map((item) => {
      const match = item.match(/^\d+\.\s/);
      return match ? item.substring(match[0].length) : item;
    })
    .filter((str) => str.trim() !== "");

  return finalArray;
}

export function mockStory() {
  return `Once upon a time, in a far-off land,There lived a little knight, brave and grand.He was small, but his heart was true, And he knew what he had to do.
  
  Dragons roamed the countryside,Breathing fire far and wide.The little knight knew he couldn't hide,He had to face them, side by side. With his sword and shield in hand,The little knight took a stand.He battled fiercely, with all his might,Against the dragons' fiery might.
  
  And though he was small and they were grand,The little knight made a final stand.With one last blow, the dragons fell,And the land was saved from their fiery hell.
  
  From that day on, the little knight was known,As the bravest hero the land had ever known.He may have been little, but his heart was big,And he fought dragons, like a true hero, without a fig.`;
}

export function mockImageURLArray() {
  return [
    "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
    "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
    "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
    "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
    "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
  ];
}

export function mockImagePrompts() {
  return [
    "In a far-off land, there is a small knight who is brave and grand, even though he is small.",
    "The countryside is filled with dragons that are breathing fire far and wide.",
    "The little knight takes a stand with his sword and shield in hand and battles fiercely against the dragons' fiery might.",
    "Even though the little knight is small and the dragons are grand, he makes a final stand and defeats them with one last blow, saving the land from their fiery hell.",
    "From that day on, the little knight is known as the bravest hero the land has ever known, fighting dragons like a true hero with a big heart.",
  ];
}

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
    .filter((str) => str !== "");

  return finalArray;
}

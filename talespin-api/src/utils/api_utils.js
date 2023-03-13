// Turn a text block into cleaned array split by newlines
export function convertToArray(textBlock) {
  const splitText = textBlock.split("\n");

  let finalArray = [];
  finalArray = splitText
    .map((item) => {
      const match = item.match(/^\d+\.\s/);
      return match ? item.substring(match[0].length) : item;
    })
    .filter((str) => str !== "");

  return finalArray;
}

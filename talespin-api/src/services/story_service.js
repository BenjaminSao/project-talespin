import { chatGPTAPI } from "../configs/openai_apis.js";

// Given a story prompt, generate a childrens story
export async function generateStory(storyPrompt, num_pages = 5) {
  const messagePrefix = `Create a story in the style of a children's storybook
  (Where each section is around 45 words, separated by a newline character, 
  and there are exactly ${num_pages} sections) about:`;

  const story = await chatGPTAPI.sendMessage(messagePrefix + storyPrompt);
  return story.text;
}

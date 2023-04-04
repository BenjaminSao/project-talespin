import { jsPDF } from "jspdf";
import fs from "fs";
import { Image } from "../models/image_model.js";

async function generatePDF(storyContent) {
  const doc = new jsPDF();
  for (let i = 0; i < storyContent.pages.length; i++) {
    const page = storyContent.pages[i];
    const image = await Image.findByPk(page.image);
    if (image) {
      const imageBuffer = image.image;
      const base64Image = imageBuffer.toString("base64");
      doc.addImage(
        `data:image/jpeg;base64,${base64Image}`,
        "JPEG",
        30,
        30,
        150,
        150
      );
      const text = doc.splitTextToSize(page.text, 150);
      doc.text(text, 30, 200);
      doc.addPage();
    }
  }
  doc.setFontSize(60);
  doc.text("THE END", 63, 150);
  doc.save("./temp.pdf");
}

export async function constructEmail(email, story) {
  await generatePDF(story.storyContent);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const storyPDF = fs.readFileSync("./temp.pdf").toString("base64");
  const msg = {
    to: email,
    from: "johnsonsu111@gmail.com",
    subject: `${story.title} a TaleSpin Story`,
    html: `
    <div style="width: 100%; height: 5px; background-color: #ef476f;"></div>
    <div style="width: 100%; height: 5px; background-color: #ffc43d;"></div>
    <div style="width: 100%; height: 5px; background-color: #06d6a0;"></div>
    <h1 style="color: #000;">You've Been Shared an Original TaleSpin Story!</h1>
    <div style="width: 100%; height: 5px; background-color: #ffc43d;"></div>
    <h2 style="color: #000;"><u>This story is about:</u> ${story.prompt}</h2>
    <div style="width: 100%; height: 5px; background-color: #ef476f;"></div>
    <h3 style="color: #000;">To view the story, see the attachment in this email!</h3>
    <div style="width: 100%; height: 5px; background-color: #06d6a0;"></div>
    <h3 style="color: #000;">Sent by TaleSpin Your Own Story Writer</h3>
    <div style="width: 100%; height: 5px; background-color: #ef476f;"></div>
    <div style="width: 100%; height: 5px; background-color: #ffc43d;"></div>
    <div style="width: 100%; height: 5px; background-color: #06d6a0;"></div>`,
    attachments: [
      {
        content: storyPDF,
        filename: "TaleSpinStory.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  return msg;
}

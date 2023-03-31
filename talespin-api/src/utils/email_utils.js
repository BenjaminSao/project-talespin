import { jsPDF } from "jspdf";
import fs from "fs";
import imageType from "image-type"; // install with `npm install image-type`
import { Image } from "../models/image_model.js";

function generatePDF(storyContent) {
  const doc = new jsPDF();

  // loop through each page in the storyContent
  storyContent.pages.forEach(async (page, index) => {
    // // add the image to the PDF
    // const imageData = await Image.findByPk(page.image);
    // const imageBuffer = imageData.image;
    // const base64Image = imageBuffer.toString('base64');
    // doc.addImage(
    //   `data:image/png;base64,${base64Image}`,
    //   "PNG",
    //   10,
    //   10,
    //   100,
    //   100
    // );

    const text = doc.splitTextToSize(page.text, 170);
    doc.text(text, 10, 170);

    if (index < storyContent.pages.length - 1) {
      doc.addPage();
    }
  });

  doc.save("temp.pdf");
}

export function constructEmail(email, story) {
  generatePDF(story.storyContent);
  const storyPDF = fs.readFileSync("./temp.pdf").toString("base64");
  const msg = {
    to: email,
    from: "johnsonsu111@gmail.com",
    subject: `${story.title} a TaleSpin Story`,
    html: `
    <h1 style="color: #000;">You've Been Shared an Original TaleSpin Story!</h1>
    <div style="width: 100%; height: 5px; background-color: #ffc43d;"></div>
    <h2 style="color: #000;"><u>This story is about:</u> ${story.prompt}</h2>
    <div style="width: 100%; height: 5px; background-color: #ef476f;"></div>
    <h3 style="color: #000;">To view the story, see the attachment in this email!</h3>
    <div style="width: 100%; height: 5px; background-color: #06d6a0;"></div>
    <h3 style="color: #000;">Sent by TaleSpin Your Own Story Writer</h3>`,
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

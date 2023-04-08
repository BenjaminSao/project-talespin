# **TaleSpin**

Children Storybook Generation powered by Stable Diffusion & GPT-3

## Deployment

https://www.talespin.me/

## **Demo Video**

[Click to view youtube video](https://youtu.be/0hj8q_1aj3U)

## **Team**

- Benjamin Saobuppha (1006157276)
- Johnson Su (1005870461)

## **Description**

TaleSpin is an AI-powered children’s storybook generator that allows the creation and viewing of stories to your liking. Users will be able to log in and be verified with Auth0 and submit short story prompts through the web application that acts as a “seed” for generating a storybook that contains not only text but accompanying images. This will be done by feeding the prompt to ChatGPT through their API to generate the story content.

For each text block generated, we will use ChatGPT to write an accompanying image prompt which we will feed to the Stable Diffusion API to create an image. The text and image will be combined into a storybook of a PDF format through HTML to PDF conversion with PDFBlade which the user can access and share through emails using SendGrid.

If users are interested in further continuing the storybook / creating a sequel, we will implement a payment feature with Stripe that allows users to pay to generate more of a particular story they enjoy.

## **Complexity Points**

Core (Total 9)

- ChatGPT API - For storybook content generation. (1)
- [Stable Diffusion](https://stability.ai/) API - For generating accompanying images for each text block. (3)
- SendGrid - Used for the email sharing option for completed storybooks. (2)
- Auth0 - Used for user authentication for user login. (1)
- PDFBlade - Used to convert HTML to PDF files. (2)

Bonus (Total 6)

- Stripe - Used to enable transactions from customers for book continuations. (2)
- Three.js - Used for creating animations for landing pages and also for loading time when generating storybooks. (2) (Bonus)
- PDF Reader - Used for viewing the storybooks as PDFs after being generated. (2)

## **Goals For Alpha/Beta/Final**

**Alpha**:

- Figma and LucidChart of the application
- Allow the creation of accounts and storage of generated content
- Creation of core functionality of generating stories and the accompanying images, and the creation of story continuations.
- Develop core UI for entering prompts, and viewing generated content
- Have the application deployed.

**Beta**:

- Implement HTML to PDF for storybook generation
- Implement authentication for users
- Implement sending storybooks through email
- Implement payment systems
- Flesh out all core pages that the user encounters for the main user flow

**Final**:

- Polish existing core pages and features
- Create & polish all secondary/nice to have pages
- Implement Three.js animations across the website
- Flesh out + finish combining images and text into PDF format

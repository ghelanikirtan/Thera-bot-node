import { createRequire } from "module";
import { Configuration, OpenAIApi } from "openai";
import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const require = createRequire(import.meta.url);
require("dotenv").config();

const configuration = new Configuration({
  organization: `${process.env.ORG_ID}`,
  apiKey: `${process.env.API_KEY}`,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message, "message");
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Act as psychiatrist",
      },
      {
        role: "user",
        content: `${message}`,
        // content: "I am feeling low",
      },
    ],
  });

  res.json({
    message: response.data.choices[0].message.content,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
// export const api = app;

// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [
//     {
//       role: "system",
//       content: "Act as psychiatrist",
//     },
//     {
//       role: "user",
//       content: "I am feeling low",
//     },
//   ],
// });

// console.log(completion.data.choices[0].message.content);

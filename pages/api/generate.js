import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three special names for an animal that is combine of two mutant words in Turkish.

  Animal: Kedi
  Names: 1) KaptanPati, 2) YumikYumak, 3) Ponçikpamuk
  Animal: Penguen
  Names: 1) Pengupaytak, 2) Kanatgu, 3) Kaptan pengu
  Animal: ${capitalizedAnimal}
  Names:`;
}

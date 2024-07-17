const { google } = require('googleapis');
const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Example function to search the internet using Google Custom Search API
exports.searchGoogle = async (req, res) => {
  const { query } = req.body;
  const googleSearch = google.customsearch('v1');
  const response = await googleSearch.cse.list({
    cx: process.env.GOOGLE_CSE_ID,
    q: query,
  });
  res.json(response.data);
};

// Example function to interact with OpenAI
exports.interactWithAI = async (req, res) => {
  const { query, type } = req.body;
  try {
    let response;

    switch (type) {
      case 'code':
        response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Generate code for: ${query}`,
          max_tokens: 200,
        });
        break;
      case 'content':
        response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Generate content about: ${query}`,
          max_tokens: 200,
        });
        break;
      case 'study_plan':
        response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Create a study plan for: ${query}`,
          max_tokens: 200,
        });
        break;
      case 'analysis':
        response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Perform analysis on: ${query}`,
          max_tokens: 200,
        });
        break;
      default:
        return res.status(400).json({ error: 'Invalid request type' });
    }

    res.status(200).json({ result: response.data.choices[0].text });
  } catch (error) {
    console.error('Error interacting with AI:', error);
    res.status(500).json({ error: 'Error interacting with AI' });
  }
};

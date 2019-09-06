export default async function translate(text, target, projectId, key) {
  // Imports the Google Cloud client library
  const { Translate } = require("@google-cloud/translate");

  // Instantiates a client
  const translate = new Translate({ projectId, key });

  // Translates the text
  const [translation] = await translate.translate(text, target);
  return translation;
}

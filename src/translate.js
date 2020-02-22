export default async function translate(text, target, projectId, key, sourceLg) {
  // Imports the Google Cloud client library
  const { Translate } = require("@google-cloud/translate");

  // Instantiates a client
  const translate = new Translate({ projectId, key });
  
  const options = {
    from: sourceLg,
    to: target
  };

  // Translates the text
  const [translation] = await translate.translate(text, options);
  return translation;
}

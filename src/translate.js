import { Translate } from '@google-cloud/translate';

const translateToDestinationLang = async (text, target, projectId, key) => {
  const translateObj = new Translate({ projectId, key });

  const [tranlatedWord] = await translateObj.translate(text, target);

  return tranlatedWord;
};

export default translateToDestinationLang;

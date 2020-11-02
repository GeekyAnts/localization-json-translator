import fs from 'fs';
import askQuestions from './questions';
import translateToDestinationLang from './translate';
import './ErrorHandler';

const main = async () => {
  const userResponses = await askQuestions();
  console.log('Translating...');

  const destinationFileName = `${process.cwd()}/${
    userResponses.translateTo
  }.json`;

  const sourceFileContent = readFileContents(userResponses.sourceJsonPath);

  console.log('Working hard...');

  const output = await translateSource(
    JSON.parse(sourceFileContent),
    userResponses
    // eslint-disable-next-line no-unused-vars
  ).catch((error) => {
    throw new Error(
      'Something went wrong while translating. Please check your language code, and gcloud credentials!'
    );
  });

  try {
    writeFile(output, destinationFileName);
    console.log('Finished translating!');
  } catch (error) {
    throw new Error('Could not write to file!');
  }
};

const readFileContents = (filePath) => {
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return fileContents;
  } else {
    throw new Error('File not found!');
  }
};

const writeFile = (translatedObject, fileName) => {
  const writeFileOutput = fs.writeFileSync(
    fileName,
    JSON.stringify(translatedObject)
  );
  return writeFileOutput;
};

const isValidObject = (obj) => typeof obj === 'object' && obj !== null;
const isString = (string) => typeof string === 'string';

const translateSource = async (sourceObject, userResponses) => {
  let obj = sourceObject;

  if (isValidObject(sourceObject)) {
    obj = { ...sourceObject };

    for (var keys in obj) {
      if (isValidObject(obj[keys])) {
        obj[keys] = await translateSource(obj[keys], userResponses);
      } else if (isString(obj[keys])) {
        let keyValue = await translateToDestinationLang(
          obj[keys],
          userResponses.translateTo,
          userResponses.projectId,
          userResponses.apiKey
        );
        obj[keys] = keyValue;
      }
    }
  }
  return obj;
};

main();

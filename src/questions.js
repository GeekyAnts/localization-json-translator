import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'sourceJsonPath',
    message:
      'Please provide the path to your base json file. Relative(./relative/path) or Absolute(/absolute/path) will do.',
  },
  {
    type: 'input',
    name: 'translateTo',
    message:
      'Which language would you want to translate this json to? Please provide the 2 character code of the language.',
  },
  {
    type: 'input',
    name: 'projectId',
    message: 'Your GCP project id?.',
  },
  {
    type: 'input',
    name: 'apiKey',
    message: 'Your google translate API key?',
  },
];

const askQuestions = async () => {
  const responses = await inquirer.prompt(questions);
  return responses;
};

export default askQuestions;

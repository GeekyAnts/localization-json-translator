import fs from "fs";
import translate from "./translate";
import inquirer from "inquirer";
import _ from "lodash";

let sourceJsonPath, translateTo, projectId, apiKey;

const questions = [
  {
    type: "input",
    name: "sourceJsonPath",
    message:
      "Please provide the path to your base json file. Relative(./relative/path) or Absolute(/absolute/path) will do."
  },
  {
    type: "input",
    name: "translateFrom",
    default: 'en',
    message:
      "Which language is this json? The default is \'en\'. Please provide the 2 character code of the language."
  },
  {
    type: "input",
    name: "translateTo",
    message:
      "Which language would you want to translate this json to? Please provide the 2 character code of the language."
  },
  {
    type: "input",
    name: "projectId",
    message: "Your GCP project id?."
  },
  {
    type: "input",
    name: "apiKey",
    message: "Your google translate API key?"
  }
];

inquirer.prompt(questions).then(answers => {
  sourceJsonPath = answers.sourceJsonPath;
  translateFrom = answers.translateFrom;
  translateTo = answers.translateTo;
  projectId = answers.projectId;
  apiKey = answers.apiKey;
  main();
});

async function main() {
  if (
    sourceJsonPath.substring(0, 1) === "/" ||
    sourceJsonPath.substring(0, 2) === "./"
  ) {
    if (sourceJsonPath.substring(0, 2) === "./") {
      sourceJsonPath = `${process.cwd()}/${sourceJsonPath.substring(
        2,
        sourceJsonPath.length
      )}`;
    }
  } else {
    console.log(
      "Please specify the source path in these formats -  ./relative/path/from/current/dir or /absolute/path"
    );
  }

  if (fs.existsSync(sourceJsonPath)) {
    fs.readFile(sourceJsonPath, "utf-8", (err, sourceJson) => {
      if (err) {
        console.log("Something went wrong while opening your source File!");
        return;
      }
      try {
        translateJson(JSON.parse(sourceJson));
      } catch (error) {
        console.log("Something went wrong with the Google Translate API!");
      } finally {
        return;
      }
    });
  } else {
    console.log("Oops! Something went wrong.");
    return;
  }
}

async function translateJson(sourceJson) {
  console.log("Translating...");
  for (const key in sourceJson) {
    if (sourceJson.hasOwnProperty(key)) {
      if (typeof sourceJson[key] == "object") {
        for (const k in sourceJson[key]) {
          if (sourceJson[key].hasOwnProperty(k)) {
            if (typeof sourceJson[key][k] === "string") {
              try {
                sourceJson[key][k] = await translate(
                  sourceJson[key][k],
                  translateTo,
                  projectId,
                  apiKey,
                  translateFrom
                );
              } catch (error) {
                console.log(
                  "Something went wrong while translating! Please check your GCP credentials!"
                );
                return;
              }
            }
          }
        }
      }
    }
  }
  fs.writeFile(
    `${process.cwd()}/${translateTo}.json`,
    JSON.stringify(sourceJson),
    err => {
      if (err) {
        console.log("Something went wrong while writing to a file!");
        return err;
      }
      console.log("Done!");
    }
  );
}

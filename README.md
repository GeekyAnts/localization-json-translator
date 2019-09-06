# localization-json-translator

A localisation language translator from english to any other language using Google translator API.

# Pre-requisites

- You need a defined {language}.json file which contains all the translation of all text used in the app, in english.
- A google project id. Refer [this](https://cloud.google.com/resource-manager/docs/creating-managing-projects) to know how to create a project. Note down the project id as we will need it later.
- Add Google translate service to the project. Refer [here](https://cloud.google.com/translate/docs/quickstart) to see how to do it.
- Add an API key to the translate service. Refer [here](https://translatepress.com/docs/settings/generate-google-api-key/). Note down the API key as we will need it later.

# How to use this?

1. The easiest way is to use it from npm. Run the following command in your terminal -
   `npm install translate -g`

2. The other way is to clone this repo. Run `npm install -g`.

After this is done, the command `translate` will be available globally in your terminal.

You can run this and follow the instructions on your terminal.

# Roadmap

- Support translating multiple languages at the same time
- Support nested objects in the translation file.
- Support other translation services apart from Google Translate.

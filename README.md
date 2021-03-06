# localization-json-translator

Helps you convert your \<language>\.json file from one language to any other language!

# Pre-requisites

- You need a defined {language}.json file which you can convert to a different language. Right now, we only support english as the source language.
- A google project id. Refer [this](https://cloud.google.com/resource-manager/docs/creating-managing-projects) to know how to create a project. Note down the project id as we will need it later.
- Add Google translate service to the project. Refer [here](https://cloud.google.com/translate/docs/quickstart) to see how to do it.
- Add an API key to the translate service. Refer [here](https://translatepress.com/docs/settings/generate-google-api-key/). Note down the API key as we will need it later.

# How to use this?

Clone the repo and run `npm install -g`.

After this is done, the command `translate` will be available globally in your terminal.

Run `translate` from your terminal and follow the instructions. That's it!

# Roadmap

- Support translating multiple languages at the same time
- ~~Support nested objects in the translation file~~
- Support other translation services apart from Google Translate.

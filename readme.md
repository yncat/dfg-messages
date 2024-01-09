# Daifugo game message protocol definition

This is a message protocol definition for the [Daifugo game](https://github.com/yncat/dfg) .

## How it works

The Daifugo server and client has this package as a dependency and imports the same protocol. As a coding convention, this package is imported as "dfgmsg".

src/index.ts is the main definition. You can understand each message with details and parameter lists. Please note that the documentation in the file is written in Japanese.

## Editing

After editing the definition, you must run `npm run build` and commit the generated js file as well. This is because this package does not have versioning and client / server always downloads the master branch. This means that there is no build triggers and the compiled js file must always be in the repository.

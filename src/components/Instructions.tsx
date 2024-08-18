import * as React from "react";
import Markdown from "react-markdown";

const Instructions = () => {
  const installation =
    "Run ```npm install -g devplate``` to install the Devplate CLI globally.";
  const gettingStarted =
    "###### 1. Setup your Devplate repository \n Create a new public repository and for every development template (Devplate) you have, create a sub-folder within the repo with the name of the folder being a short name for your Devplate. \n An example Devplate repository can be found [here](https://github.com/shortxmas/example-devplate-repository) \n ###### 2. Add your Devplate repository to Devplate \nAfter creating your Devplate repository add it to your local Devplate config by running ```dp repo add```.\nYou can verify if your repository was added by running ```dp repo view``` or by checking the devplates.json file in the package.";
  const commands =
    "###### ```1. dp repo view``` - view your Devplate repositories \n ###### ```2. dp repo add``` - add a new Devplate repository\n ###### ```3.dp repo remove``` - remove a Devplate repository\n ###### ```4.dp view``` - View Devplates within a Devplate repository\n ###### ```5.dp select``` - Select a Devplate to pull down from a Devplate repository";

  return (
    <>
      <div className="container" style={{ marginTop: 175 }}>
        <div>
          <h3>Installation</h3>
          <Markdown>{installation}</Markdown>
        </div>
        <div>
          <h3>Getting Started</h3>
          <Markdown>{gettingStarted}</Markdown>
        </div>
        <div>
          <h3>Commands</h3>
          <Markdown>{commands}</Markdown>
        </div>
      </div>
    </>
  );
};

export default Instructions;

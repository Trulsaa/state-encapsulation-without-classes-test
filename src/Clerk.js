const { prompt, useState } = require("./utils");
const Pizza = require("./Pizza");

const usePromptForNextStep = ({ setState }) => {
  const promptForNextStep = async () => {
    const query = `
0: exit
1: print recipe
2: set pizza settings
What do you want to do? (0): `;
    const nextStep = await prompt(query, 0);
    setState(Number(nextStep));
  };

  return Object.freeze({ promptForNextStep });
};

const Clerk = () => {
  const state = useState(0);
  const pizza = Pizza();
  const { promptForNextStep } = usePromptForNextStep(state);

  const ask = async () => {
    while (true) {
      await promptForNextStep();
      const nextStep = state.getState();
      if (nextStep === 1) {
        pizza.printRecipie();
      } else if (nextStep === 2) {
        await pizza.promptForPizzaState();
      } else {
        process.exit();
      }
    }
  };

  return Object.freeze({ ask });
};

module.exports = Clerk;

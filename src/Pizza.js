const { prompt, useState } = require('./utils');

const round = (number, precision) => {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};

const calculateIngredients = ({
  pizzaNumber,
  pizzaSize,
  pizzaWaterContent
}) => {
  const flour = round(
    pizzaNumber * pizzaSize / (1 + pizzaWaterContent / 100 + 0.03 + 0.002),
    1
  );
  const water = round(flour * pizzaWaterContent / 100, 1);
  const salt = round(0.03 * flour, 1);
  const yeast = round(0.002 * flour, 1);
  return { flour, water, salt, yeast };
};

const pizzaLogger = ({ flour, water, salt, yeast }) => {
  console.log("\nOppskrift:");
  console.log(`Mel: ${flour} g`);
  console.log(`Vann: ${water} g`);
  console.log(`Salt: ${salt} g`);
  console.log(`Gjær: ${yeast} g`);
};

const usePromptForPizzaState = ({ getState, setState }) => {
  const promptForPizzaState = async () => {
    let { pizzaNumber, pizzaSize, pizzaWaterContent } = getState();
    pizzaNumber = await prompt(
      `Number of pizzas (${pizzaNumber}): `,
      pizzaNumber
    );
    pizzaSize = await prompt(`Size of pizza (${pizzaSize}g): `, pizzaSize);
    pizzaWaterContent = await prompt(
      `Water content (${pizzaWaterContent}%): `,
      pizzaWaterContent
    );
    setState({ pizzaNumber, pizzaSize, pizzaWaterContent });
  };

  return Object.freeze({ promptForPizzaState });
};

const usePrintRecipie = ({ getState }) => {
  const printRecipie = () => {
    const currentState = getState();
    const ingreidients = calculateIngredients(currentState);
    pizzaLogger(ingreidients);
  };

  return Object.freeze({ printRecipie });
};

const Pizza = settings => {
  const defaults = { pizzaNumber: 2, pizzaSize: 250, pizzaWaterContent: 70 };
  const state = useState({ ...defaults, ...settings });

  return Object.freeze({
    ...usePromptForPizzaState(state),
    ...usePrintRecipie(state)
  });
};

module.exports = Pizza

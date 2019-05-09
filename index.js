const Clerk = require("./src/Clerk");

async function run() {
  const clerk = Clerk();
  await clerk.ask();
}

run();

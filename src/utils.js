const useState = initVal => {
  let state = initVal;

  const getState = () => state;
  const setState = x => (state = x);

  return Object.freeze({ getState, setState });
};

const prompt = (question, def) => {
  return new Promise((resolve, reject) => {
    const { stdin, stdout } = process;
    stdin.resume();
    stdout.write(question);
    stdin.on("data", data => {
      const input = data.toString().trim();
      if (!input) {
        resolve(def);
        return;
      }
      resolve(input);
      stdin.removeAllListeners(["data", "error"]);
    });
    stdin.on("error", err => {
      reject(err);
      stdin.removeAllListeners(["data", "error"]);
    });
  });
};

module.exports = { useState, prompt };

const driver = state => ({
  drive: () => (state.position = state.position + state.speed)
});

const barker = state => ({
  bark: () => console.log(`woof, I am ${state.name}`)
});

const positioner = state => ({
  getPosition: () => state.position
});

const murderRobotDog = name => {
  const state = {
    name,
    speed: 100,
    position: 0
  };

  return { ...barker(state), ...driver(state), ...positioner(state) };
};

const stewe = murderRobotDog("Steve");
stewe.bark();
console.log(stewe.getPosition())
stewe.drive();
console.log(stewe.getPosition())

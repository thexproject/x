test("if statements work", () => {
  require("../src/x");

  expect(xAct(`
    << if (true) { >>
      Hello world!
    << } >>
    << if (false) { >>
      Hello otherworld!
    << } >>
  `)).toMatchSnapshot();
});

test("for statements work", () => {
  require("../src/x");

  expect(xAct(`
    << for (let i = 0; i < 5; i++) { >>
      Hello world!
    << } >>
  `)).toMatchSnapshot();
});

test("can define and get variables", () => {
  require("../src/x");

  expect(xAct(`
    << let thing = "thingymabobber" >>
    << thing >>
  `)).toMatchSnapshot();
});

test("can set existing variables", () => {
  require("../src/x");

  expect(xAct(`
    << let thing = "thingymabobber" >>
    << thing >>
    << thing = "newvalue" >>
    << thing >>
    << "thing that happens to have a = in the middle" >>
    << "other thing with \\" = and escape character" >>
    << "other thing with ' = and different quote" >>
  `)).toMatchSnapshot();
});

test("can get data set in model", () => {
  require("../src/x");

  expect(xAct(`
    << this.thing >>
    << this.thing >>
  `, { "thing": "thingymabobber" })).toMatchSnapshot();
});
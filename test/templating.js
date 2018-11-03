test("if statements work", () => {
  require("../src/x");

  x("body").html(`
    << if (true) { >>
      Hello world!
    << } >>
    << if (false) { >>
      Hello otherworld!
    << } >>
  `);
  xAct("body");
  expect(x("body").html()).toEqual("Hello world!");
});

test("for statements work", () => {
  require("../src/x");

  x("body").html(`
    << for (let i = 0; i < 5; i++) { >>
      Hello world!
    << } >>
  `);
  xAct("body");
  expect(x("body").html()).toEqual("Hello world!Hello world!Hello world!Hello world!Hello world!");
});

test("can define and get variables", () => {
  require("../src/x");

  x("body").html(`
    << let thing = "thingymabobber" >>
    << thing >>
  `);
  xAct("body");
  expect(x("body").html()).toEqual("thingymabobber");
});

test("can get data set in model", () => {
  require("../src/x");

  x("body").html(`
    << this.thing >>
    << this.thing >>
  `);
  xAct("body", {
    "thing": "thingymabobber"
  });
  expect(x("body").html()).toEqual("thingymabobberthingymabobber");
});

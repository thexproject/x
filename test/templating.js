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

test("fot statements work", () => {
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

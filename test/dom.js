test("can create DOM node", () => {
  require("../src/x");
  
  let domNode1 = x("<p>");
  let domNode2 = x("<p >");
  let domNode3 = x("<   p / >");
  let domNode4 = x("< p   />");

  expect(domNode1.html()).toEqual(domNode2.html());
  expect(domNode2.html()).toEqual(domNode3.html());
  expect(domNode3.html()).toEqual(domNode4.html());

  expect(x("#domnode").node).toBeNull();
  expect(domNode1.node).toBeInstanceOf(Node);
});

test("can append created DOM node to body", () => {
  require("../src/x");

  document.body.innerHTML = "This should be before.";
  
  let domNode = x("<p>").text("This is a DOM node.").id("domnode");
  domNode.appendTo("body");

  expect(document.body.innerHTML).toEqual("This should be before.<p id=\"domnode\">This is a DOM node.</p>");
});

test("can prepend created DOM node to body", () => {
  require("../src/x");

  document.body.innerHTML = "This should be after.";
  
  let domNode = x("<p>").text("This is a DOM node.").id("domnode");
  domNode.prependTo("body");

  expect(document.body.innerHTML).toEqual("<p id=\"domnode\">This is a DOM node.</p>This should be after.");
});

test("can select DOM node", () => {
  require("../src/x");

  document.body.innerHTML = "<p id=\"domnode\">This is a DOM node.</p>";

  let selected = x("#domnode");
  expect(selected.node).toBeTruthy();
  expect(selected.node).toBeInstanceOf(Node);

  expect(selected.text()).toEqual("This is a DOM node.");
});

test("can modify selected DOM node", () => {
  require("../src/x");

  document.body.innerHTML = "<p id=\"domnode\">This is a DOM node.</p>"

  let selected = x("#domnode");
  selected.text("This is a modified DOM node.");
  expect(x("#domnode").text()).toEqual("This is a modified DOM node.");
});

test("can add, set, and get classes of DOM node", () => {
  require("../src/x");

  document.body.innerHTML = "<p id=\"domnode\" class=\"class1 class2\">This is a DOM node.</p>"

  let selected = x("#domnode");
  expect(selected.classes()).toEqual(["class1", "class2"]);

  selected.classes(["newclass1", "newclass2"]);
  expect(selected.classes()).toEqual(["newclass1", "newclass2"]);

  selected.addClass("newerclass");
  expect(selected.classes()).toEqual(["newclass1", "newclass2", "newerclass"]);
});

test("can set and get id of DOM node", () => {
  require("../src/x");

  document.body.innerHTML = "<p id=\"domnode\">This is a DOM node.</p>"

  let selected = x("#domnode");
  expect(selected.id()).toEqual("domnode");

  selected.id("alsodomnode");
  selected = x("#domnode");
  expect(selected.node).toBeNull();

  selected = x("#alsodomnode");
  expect(selected.node).toBeInstanceOf(Node);
});

test("can destroy DOM node", () => {
  require("../src/x");

  document.body.innerHTML = "<p id=\"domnode\">This is a DOM node.</p>"

  let selected = x("#domnode");
  selected.destroy();
  selected = x("#domnode");
  expect(selected.node).toBeNull();
});

test("can register click handler and click element", () => {
  require("../src/x");

  document.body.innerHTML = "<p id=\"domnode\">This is a DOM node.</p>"

  let selected = x("#domnode");

  this.thingy = "thingymabobber";
  let got = "";
  const clicked = jest.fn(that => {
    got = that.thingy;
  });
  selected.click(clicked, this);
  selected.click();

  expect(clicked).toBeCalled();
  expect(got).toEqual(this.thingy);
});

test("can find children and manipulate them", () => {
  require("../src/x");

  document.body.innerHTML = "<p id=\"parent\">I'm a parent. <span id=\"child\">I am a child.</span></p>";

  let parent = x("#parent");
  let child = parent.find("#child");

  child.text("This is some new text.");

  expect(x("#parent").html()).toEqual("I'm a parent. <span id=\"child\">This is some new text.</span>");
});
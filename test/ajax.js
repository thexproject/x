test("xJax exists", async () => {
  require("../src/x");

  expect(xJax).toBeTruthy();
});

test("xJax.post exists", async () => {
  require("../src/x");

  expect(xJax.post).toBeTruthy();
});
beforeAll(() => {
  console.log("Before all tests");
});
beforeEach(() => {
  console.log("Before each test");
});

afterAll(() => {
  console.log("After all tests");
});
afterEach(() => {
  console.log("After each test");
});

// IT o TEST ==> dire che sono uguali

// piu describe => piu suite di test
// piu test case
// piu asserzioni dentro un singolo test case
describe("First Test Suite", () => {
  test("First Test Case", () => {
    expect(3 + 2).toBe(5);
    expect(5 + 6).toBe(11);
  });

  test("Second Test Case", () => {
    expect(15 + 18).toBe(33);
  });
});

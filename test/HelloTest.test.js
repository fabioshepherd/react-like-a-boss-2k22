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

describe("First Test Suite", () => {
  test("First Test Case", () => {
    expect(3 + 2).toBe(5);
    expect(5 + 6).toBe(11);
  });

  test("Second Test Case", () => {
    expect(15 + 18).toBe(33);
  });
});

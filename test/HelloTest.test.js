beforeAll(() => {
    console.log("beforeAll");
})
beforeEach(() => {
    console.log("beforeEach");
})

afterAll(() => {
    console.log("afterAll");
})
afterEach(() => {
    console.log("afterEach");
})

describe("First Test Suite", () => {
    test("First Test Case", () => {
        expect(3 + 2).toBe(5)
        expect(5 +6).toBe(11)
    })

    test("Second Test Case", () => {
        expect(15 + 18).toBe(33)
    })
})
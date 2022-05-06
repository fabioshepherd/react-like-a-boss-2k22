// data initialization
// ...
let nome = "he";

// data elaboration
// ...
nome += "llo";

it('Hello test', () => {
    expect(nome).toEqual("hello");
});
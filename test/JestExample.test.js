import { Pokemon } from "../../src/classes/Pokemon"

let bulbasaur;

beforeEach(() => {
    bulbasaur = new Pokemon("bulbasaur",100)
})

describe("Pokemon Test", () => {

    test("Variable Type", () => {
        let bulbasaur = new Pokemon("bulbasaur",100)
        expect(bulbasaur).toBeInstanceOf(Pokemon)
    })

    test("Getters", () => {
        expect(bulbasaur.getHp()).toBe(100)
        expect(bulbasaur.getName()).toBe("bulbasaur")
    })

    test("Setters", () => {
        bulbasaur.setHp(1000)
        bulbasaur.setName("BULBASAUR")

        expect(bulbasaur.getHp()).toBe(1000)
        expect(bulbasaur.getName()).toBe("BULBASAUR")
    })

    test("asObject Function", () => {
        expect(bulbasaur.asObject()).toEqual({name: "bulbasaur", hp: 100})
    })    


    test("attack function", () => {
        // function spy
        const playSoundMocked = jest.spyOn(bulbasaur, "playSound")

        // function execution
        bulbasaur.attack();

        // assertion
        expect(playSoundMocked).toHaveBeenCalledTimes(5)
    })

    test("attack function for dead pokemon", () => {
        // function spy
        const getHpMocked = jest.spyOn(bulbasaur, "getHp")
        getHpMocked.mockReturnValue(0)

        console.log("bulbasaur.getHP(): ",bulbasaur.getHp())

        expect(bulbasaur.attack).toThrow()
    })

})
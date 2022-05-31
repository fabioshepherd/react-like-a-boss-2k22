export class Pokemon {
    #name;
    #hp;

    // 1
    constructor(name, hp) {
        this.#name = name;
        this.#hp = hp;
    }

    // 2
    getName()
    {
        return this.#name;
    }

    // 2
    getHp()
    {
        return this.#hp;
    }

    // 3
    setName(newName)
    {
        this.#name = newName
    }

    // 3
    setHp(newHp)
    {
        this.#hp = newHp;
    }

    // 4
    asObject()
    {
        return {
            name: this.#name,
            hp: this.#hp
        }
    }
}
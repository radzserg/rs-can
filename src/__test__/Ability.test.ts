import Ability from "../Ability";

class A {}
class B {}

describe("Ability", () => {
    it("creates ability without condition", () => {
        new Ability(A, "update", B);
    });

    it("creates ability with condition", () => {
        new Ability(A, "update", B, (performer, action, target) => true);
    });

    it("can when condition is not provided", () => {
        const ability = new Ability(A, "update", B);
        expect(ability.can()).toBeTruthy();
    });

    it("can when target is not provided", () => {
        const ability = new Ability(A, "manage");
        expect(ability.can()).toBeTruthy();
    });

    test.each([
        [true],
        [false]
    ])("it check condition", (result) => {
        const ability = new Ability(A, "update", B, (performer, action, target) => result);
        expect(ability.can()).toEqual(result);
    });
});

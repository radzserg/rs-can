import Ability from "../Ability";
import Abilities from "../Abilities";

class A {}
class B {}
class C {}
class D {}

describe("Abilities", () => {
    it("adds abilities", () => {
        const abilities = new Abilities();
        abilities.add(new Ability(A, "update", B));
        abilities.add(new Ability(A, "update", C));
        expect(abilities.length()).toEqual(2);
    });

    it("filter by performer", () => {
        const abilities = new Abilities([
            new Ability(A, "update", B),
            new Ability(A, "update", C),
            new Ability(A, "update", D),
            new Ability(B, "update", C),
            new Ability(C, "update", C),
        ]);

        const filteredAbilities = abilities.filterByPerformer(new A());
        expect(filteredAbilities.length()).toEqual(3);
    });

    it("filter by target", () => {
        const abilities = new Abilities([
            new Ability(A, "update", B),
            new Ability(A, "update", C),
            new Ability(A, "update", D),
        ]);

        const filteredAbilities = abilities.filterByTarget(new D());
        expect(filteredAbilities.length()).toEqual(1);
    });

    it("filter by action", () => {
        const abilities = new Abilities([
            new Ability(A, "update", B),
            new Ability(A, "update", C),
            new Ability(A, "manage", D),
        ]);

        const filteredAbilities = abilities.filterByAction("update");
        expect(filteredAbilities.length()).toEqual(2);
    });

    it("filter by conditions", () => {
        const abilities = new Abilities([
            new Ability(A, "update", B),
            new Ability(A, "update", C, () => true),
            new Ability(A, "manage", D, () => false),
        ]);

        const filteredAbilities = abilities.filterByCondition(new A(), new B());
        expect(filteredAbilities.length()).toEqual(2);
    });
});

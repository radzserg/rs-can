import Can from "../Can";

class A {}
class B {}

describe("Can", () => {
    it("filter ability by performer class", () => {
        // new Ability(A, "update", B);
        const can = new Can();
        can.can(A, "update", B);
    });
});

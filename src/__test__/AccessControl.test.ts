import AccessControl from "../AccessControl";

class A {}
class B {}

describe("Can", () => {
    it("filter ability by performer class", () => {
        const can = new AccessControl();
        can.can(A, "update", B);
    });
});

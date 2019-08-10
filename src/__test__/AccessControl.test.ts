import AccessControl from "../AccessControl";

class A {}
class B {}

describe("Can", () => {
    it("cannot perform if it was not allowed", () => {
        const accessControl = new AccessControl();
        expect(accessControl.can(new A(), "update")).toBeFalsy();
        expect(accessControl.can(new A(), "update", new B())).toBeFalsy();
    });

    it("can if action and target is allowed", () => {
        const accessControl = new AccessControl();
        accessControl.allow(A, "update", B);
        const can = accessControl.can(new A(), "update", new B());
        expect(can).toBeTruthy();
    });

    it("can when target class is not provided", () => {
        const accessControl = new AccessControl();
        accessControl.allow(A, "update");
        expect(accessControl.can(new A(), "update")).toBeTruthy();
        expect(accessControl.can(new A(), "update", new B())).toBeTruthy();
    });
});

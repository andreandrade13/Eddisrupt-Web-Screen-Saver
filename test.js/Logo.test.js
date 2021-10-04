import Logo from "../js/Logo.js";
import Rectangle from "../js/Rectangle.js";

describe("Logo", () => {
    describe("when it is created", () => {
        let fakeElement;
        let logo;

        beforeEach(() => {
            fakeElement = {
                offsetWidth: 100,
                offsetHeight: 100,
                innerText: "",
                style: {
                    top: "",
                    left: ""
                }
            };
            logo = new Logo(fakeElement);
        });

        it("has element reference", () => {
            expect(logo.el).toBe(fakeElement);
        });

        it("does not render the position", () => {
            expect(logo.el.style.top).toEqual("");
            expect(logo.el.style.left).toEqual("");
        });

        it("has a rectangle with the element dimension on (0,0)", () => {
            expect(logo.rect).toStrictEqual(new Rectangle(0, 0, 100, 100));
        });
    });

    it("updates the position based on rectangle render", () => {
        const fakeElement = {
            offsetWidth: 100,
            offsetHeight: 100,
            innerText: "",
            style: {
                top: "",
                left: ""
            }
        };
        const logo = new Logo(fakeElement);
        logo.rect.setPosition(100, 100);
        logo.render();

        expect(logo.el.style.top).toEqual("100px");
        expect(logo.el.style.left).toEqual("100px");
    });
});
import Clock from "../js/Clock.js";
import Rectangle from "../js/Rectangle.js";

describe("Clock", () => {
    describe("when it is created", () => {
        let fakeElement;
        let realElement;
        let clock;

        beforeEach(() => {
            fakeElement = {
                offsetWidth: 0,
                offsetHeight: 0,
                textContent: "",
                style: {
                    top: "",
                    left: ""
                }
            };
            realElement = document.createElement("div");
            clock = new Clock(realElement);
        });

        it("has the element reference", () => {
            expect(clock.elHtml).toBe(realElement);
        });

        it("renders the locale time", () => {
            const time = new Date().toLocaleTimeString();
            expect(clock.elHtml.textContent).toEqual(time);
        });

        it("does not render the position", () => {
            expect(clock.elHtml.style.top).toEqual("");
            expect(clock.elHtml.style.left).toEqual("");
        });

        //TODO: how can we test it???
        xit("has a rectangle with the element dimension based on the current time string", () => {
            expect(clock.rect).toStrictEqual(new Rectangle(0, 0, 100, 100));
            expect(clock.rect.width).not.toBe(0);
            expect(clock.rect.height).not.toBe(0);
        });
    });

    it("updates the position based on rectangle and the time on render", () => {
        const fakeElement = {
            offsetWidth: 100,
            offsetHeight: 100,
            textContent: "",
            style: {
                top: "",
                left: ""
            }
        };
        const clock = new Clock(fakeElement);
        clock.rect.setPosition(100, 100);
        clock.render();

        expect(clock.elHtml.textContent).not.toEqual("");
        expect(clock.elHtml.style.top).toEqual("100px");
        expect(clock.elHtml.style.left).toEqual("100px");
    });
});
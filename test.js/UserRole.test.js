import UserRole from "../js/UserRole.js";


describe("UserRole", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });

    describe("when its initialized", () => {
        it("user management starts with time limit", () => {
            const wss = new UserRole(3000);

            expect(wss.inactivityTimer).toBe(3000);
            expect(wss.timer).not.toBe(undefined);
        });

        it("throwns an error if time is not positive", () => {
            //call UserRole with negative time
            //should thrown an error. How to throw errors in js? 

            expect(() => {
                new UserRole(-3000);
            }).toThrow('The number must be positive');
            //How to test error was thrown?
        });
    });

    describe("Screen saver is active", () => {
        it("After inactivity timer, changes the style to activate WSS", () => {
            const wss = new UserRole(3000);
            const op = document.getElementById('screen').style.opacity;
    
            jest.advanceTimersByTime(3000);
            expect(op).toBe(1);
        });

        it("Detects activities from mouse/keyboard and deactivate WSS", () => {
            const wss = new UserRole(3000);
            const op = document.getElementById('screen').style.opacity;

            jest.advanceTimersByTime(3000);
            wss.turnOff();
            expect(op).toBe(0);
        })
    });
});
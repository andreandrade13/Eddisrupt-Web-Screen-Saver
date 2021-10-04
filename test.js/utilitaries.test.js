import { getRandomNumberInRange, isNumberInRange } from '../js/utilitaries.js'

describe("numberInRange", () => {
    it("returns true if given number is in range min and max inclusive, false otherwise", () => {
        expect(isNumberInRange(1, 1, 3)).toBe(true);
        expect(isNumberInRange(2, 1, 3)).toBe(true);
        expect(isNumberInRange(3, 1, 3)).toBe(true);

        expect(isNumberInRange(0, 1, 3)).toBe(false);
        expect(isNumberInRange(4, 1, 3)).toBe(false);

        expect(isNumberInRange(-1, -3, -1)).toBe(true);
        expect(isNumberInRange(-2, -3, -1)).toBe(true);
        expect(isNumberInRange(-3, -3, -1)).toBe(true);

        expect(isNumberInRange(0, -3, -1)).toBe(false);
        expect(isNumberInRange(-4, -3, -1)).toBe(false);
    });
});

describe("getRandonNumberInRange", () => {
    it("generates a random integer between min & max both inclusive", () => {
        for(let i = 0; i < 1000; i++) {
            const rand = getRandomNumberInRange(4, 10);
            expect(rand).toBeGreaterThanOrEqual(4);
            expect(rand).toBeLessThanOrEqual(10);
        }
    });
});

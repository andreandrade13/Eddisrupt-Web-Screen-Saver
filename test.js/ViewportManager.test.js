// import { expect, it } from "@jest/globals";
// import { describe } from "yargs";
import Rectangle from "../js/Rectangle";
import ViewportManager from "../js/ViewportManager";

describe("ViewportManager", () => {
    it("can be initialized with width and height", () => {
        const viewport = new ViewportManager(1024, 768);

        expect(viewport.width).toEqual(1024);
        expect(viewport.height).toEqual(768);
    });

    it("can detect if a rectangle IS IN boundaries", () => {
        const viewport = new ViewportManager(1024, 768);
        [
            new Rectangle(0, 0, 100, 100), //top left
            new Rectangle(924, 0, 100, 100), //top right
            new Rectangle(924, 668, 100, 100), //bottom right
            new Rectangle(0, 668, 100, 100), //bottom left
            new Rectangle(100, 100, 100, 100) //middle
        ].forEach((rect) => {
            expect(viewport.isInBoundaries(rect)).toEqual(true);
        });
    });

    it("can detect if a rectangle IS NOT IN boundaries", () => {
        const viewport = new ViewportManager(1024, 768);
        [
            new Rectangle(-10, -10, 100, 100), //topLeft vertice outside
            new Rectangle(934, -10, 100, 100), //topRight vertice outside
            new Rectangle(934, 678, 100, 100), //bottomRight vertice outside
            new Rectangle(-10, 678, 100, 100), //bottomLeft vertice outside
            new Rectangle(10, 678, 100, 100), //bottom side  outside
            new Rectangle(-10, 10, 100, 100), //left side outside
            new Rectangle(10, -10, 100, 100), //top side outside
            new Rectangle(934, 10, 100, 100), //right side outside
            new Rectangle(1034, 778, 100, 100) // contained
        ].forEach((rect) => {
            expect(viewport.isInBoundaries(rect)).toEqual(false);
        });
    });

    it("can position two rectangles in random positions in its boundaries without colision", () => {
        //ARRANGE
        const viewport = new ViewportManager(1024, 768);
        const rect1 = new Rectangle(0, 0, 100, 100);
        const rect2 = new Rectangle(0, 0, 200, 200);

        for (let i = 0; i < 1000; i++){ //run the test thousando times
            //ACT
            viewport.arrange(rect1, rect2)

            //ASSERT
            expect(viewport.isInBoundaries(rect1)).toEqual(true);
            expect(viewport.isInBoundaries(rect2)).toEqual(true);
            expect(rect1.colidesWith(rect2)).toEqual(false);
        }
    });
});
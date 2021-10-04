// const ViewportManager = require('./ViewportManager');
// const Rectangle = require('./Rectangle');

import Rectangle from '../js/Rectangle.js';
import ViewportManager from '../js/ViewportManager.js';

describe("Rectangle", () => {
    it("can be initialized with x, y, width and height", () => {
        const rect = new Rectangle(0, 0, 100, 50);

        expect(rect.x).toEqual(0);
        expect(rect.y).toEqual(0);
        expect(rect.width).toEqual(100);
        expect(rect.height).toEqual(50);
    });

    it("has the top left coordinates", () => {
        let rect = new Rectangle(0, 0, 100, 50);

        expect(rect.topLeft.x).toEqual(0);
        expect(rect.topLeft.y).toEqual(0);

        rect = new Rectangle(20, 30, 100, 50);

        expect(rect.topLeft.x).toEqual(20);
        expect(rect.topLeft.y).toEqual(30);
    });
    it("has the bottom right coordinates", () => {
        let rect = new Rectangle(0, 0, 100, 50);
        
        expect(rect.bottomRight.x).toEqual(100);
        expect(rect.bottomRight.y).toEqual(50);

        rect = new Rectangle(20, 30, 100, 50);

        expect(rect.bottomRight.x).toEqual(120);
        expect(rect.bottomRight.y).toEqual(80);
    });

    it("has the top right coordinates", () => {
        let rect = new Rectangle(0, 0, 100, 50);

        expect(rect.topRight.x).toEqual(100);
        expect(rect.topRight.y).toEqual(0);

        rect = new Rectangle(20, 30, 100, 50);

        expect(rect.topRight.x).toEqual(120);
        expect(rect.topRight.y).toEqual(30);
    });

    it("has the bottom left coordinates", () => {
        let rect = new Rectangle(0, 0, 100, 50);

        expect(rect.bottomLeft.x).toEqual(0);
        expect(rect.bottomLeft.y).toEqual(50);

        rect = new Rectangle(20, 30, 100, 50);

        expect(rect.bottomLeft.x).toEqual(20);
        expect(rect.bottomLeft.y).toEqual(80);
    });

    it("can detect colision with other rectangles", () =>{
        const rectangles = [
            new Rectangle(175, 175, 50, 50), // topLeft vertice colides
            new Rectangle(75, 175, 50, 50), // topRight vertice colides
            new Rectangle(75, 75, 50, 50), // bottomRight vertice colides
            new Rectangle(175, 75, 50, 50), // bottomLeft vertice colides
            new Rectangle(125, 75, 50, 50), // bottom side colides
            new Rectangle(175, 125, 50, 50), // left side colides
            new Rectangle(125, 175, 50, 50), // top side colides
            new Rectangle(75, 125, 50, 50), // right side colides
            new Rectangle(125, 125, 50, 50), // contained
        ];

        const rect1 = new Rectangle(100, 100, 100, 100);

        rectangles.forEach((rect) => {
            expect(rect1.colidesWith(rect)).toEqual(true);
            expect(rect.colidesWith(rect1)).toEqual(true);
        });
    });
    it("can detect NO colision with other rectangles", () => {
        const rectangles = [
            new Rectangle(0, 0, 50, 50), // at topLeft
            new Rectangle(225, 0, 50, 50), // at topRight
            new Rectangle(225, 225, 50, 50), // at bottomRight
            new Rectangle(0, 225, 50, 50), // at bottomLeft
            new Rectangle(125, 225, 50, 50), // at bottom
            new Rectangle(0, 125, 50, 50), // at left
            new Rectangle(125, 0, 50, 50), // at top
            new Rectangle(225, 125, 50, 50) // at right
        ];

        const rect1 = new Rectangle(100, 100, 100, 100);

        rectangles.forEach((rect) => {
            expect(rect1.colidesWith(rect)).toEqual(false);
            expect(rect.colidesWith(rect1)).toEqual(false);
        });
    });
    it("updates all vertices whenever x or y changes", () => {
        const rect1 = new Rectangle(0, 0, 100, 100);

        // rect1.setX(100);
        // rect1.setY(50);
        rect1.setPosition(100, 50);
        expect(rect1.topRight.x).toEqual(200);
        expect(rect1.topRight.y).toEqual(50);
        expect(rect1.bottomRight.x).toEqual(200);
        expect(rect1.bottomRight.y).toEqual(150);
        expect(rect1.topLeft.x).toEqual(100);
        expect(rect1.topLeft.y).toEqual(50);
        expect(rect1.bottomLeft.x).toEqual(100);
        expect(rect1.bottomLeft.y).toEqual(150);
    });
});

describe ('ViewportManager', () => {
    it ("can be initialized with width and height", () => {
        const screen = new ViewportManager(1200, 1600);

        expect(screen.width).toEqual(1200);
        expect(screen.height).toEqual(1600);
    });
    it("can position two rectangles in its boundaries", () => {
        const rect1 = new Rectangle(0, 0, 100, 100);
        const rect2 = new Rectangle(0, 0, 150, 250);

        const screen = new ViewportManager(1200, 1600);
        
        screen.arrange(rect1, rect2);


        expect (rect1.x).not.toEqual(0);
        expect (rect1.y).not.toEqual(0);
        expect (rect2.x).not.toEqual(0);
        expect (rect2.y).not.toEqual(0);
        expect (screen.isInBoundaries(rect1)).toEqual(true);
        expect (screen.isInBoundaries(rect2)).toEqual(true);
    });
    it("can detect if a rectangle is in its boundaries", () => {
        const rect1 = new Rectangle(0, 0, 100, 100);
        const rect2 = new Rectangle(-100, -200, 50, 50); // negative
        

        const screen = new ViewportManager(1200, 1600);
        

        const result = screen.isInBoundaries(rect1);
        const result2 = screen.isInBoundaries(rect2);

        expect(result).toEqual(true);
        expect(result2).toEqual(false);

        
    });
    it("can detect if a rectangle is NOT in its boundaries", () => {
        

        const rectangles = [
            new Rectangle(1300, 1800, 100, 100), // TR.x > screen.width
            new Rectangle(1100, 1800, 100, 100), // BL.y > screen.height
            new Rectangle(-100, 100, 100, 100), // TL.x < 0
            new Rectangle(0, -50, 100, 100) // TL.y < 0
        ];

        const screen = new ViewportManager(1200, 1600);

    
        rectangles.forEach((rect) => {
            expect(screen.isInBoundaries(rect)).toEqual(false);
        })

    });

    it("can position two rectangles in random positions in its boundaries without colision", () => {
      //ARRANGE
      const viewport = new ViewportManager(1024, 768);
      const rect1 = new Rectangle(0, 0, 100, 100);
      const rect2 = new Rectangle(0, 0, 200, 200);

      //ACT
      viewport.arrange(rect1, rect2);

      //ASSERT
      expect(viewport.isInBoundaries(rect1)).toEqual(true);
      expect(viewport.isInBoundaries(rect2)).toEqual(true);
      expect(rect1.colidesWith(rect2)).toEqual(false);
    })
});

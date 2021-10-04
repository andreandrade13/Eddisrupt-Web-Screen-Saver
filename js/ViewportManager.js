import { getRandomNumberInRange, isNumberInRange } from "./utilitaries.js"; //new version

export default class ViewportManager {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    arrange(rect1, rect2) {
        rect1.setPosition(
            getRandomNumberInRange(0, this.width - rect1.width),
            getRandomNumberInRange(0, this.height - rect1.height)
        );

        rect2.setPosition(
            getRandomNumberInRange(0, this.width - rect2.width),
            getRandomNumberInRange(0, this.height - rect2.height)
        );

        while (rect1.colidesWith(rect2)) {
        rect2.setPosition(
            getRandomNumberInRange(0, this.width - rect2.width),
            getRandomNumberInRange(0, this.height - rect2.height)
        );
        }
    }

    isInBoundaries(rect) {
        return (
            isNumberInRange(rect.topRight.x, 0, this.width) &&
            isNumberInRange(rect.topLeft.x, 0, this.width) &&
            isNumberInRange(rect.bottomLeft.y, 0, this.height) &&
            isNumberInRange(rect.topLeft.y, 0, this.height)
        );
    }
}

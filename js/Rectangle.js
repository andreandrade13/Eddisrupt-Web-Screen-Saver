import { isNumberInRange} from "./utilitaries.js";

export default class Rectangle {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.setPosition(x, y);
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.topLeft = { x, y };
        this.bottomRight = { x: x + this.width, y: y + this.height };
        this.bottomLeft = { x, y: y + this.height };
        this.topRight = { x: x + this.width, y };
    }

    colidesWith(rect) {
        const colision = new Rectangle (
            this.x - rect.width,
            this.y - rect.height,
            this.width + rect.width,
            this.height + rect.height
        );
        return (
            isNumberInRange(
                rect.topLeft.x,
                colision.topLeft.x,
                colision.topRight.x
            ) &&
            isNumberInRange(
                rect.topLeft.y,
                colision.topLeft.y,
                colision.bottomRight.y
            )
        );
    }
}

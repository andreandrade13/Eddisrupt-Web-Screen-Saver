import Rectangle from "./Rectangle.js";

export default class Logo {
    constructor(el) {
        this.el = el;
        this.rect = new Rectangle(0, 0, this.el.offsetWidth, this.el.offsetHeight);
    }

    render() {
        this.el.style.top = this.rect.y + "px";
        this.el.style.left = this.rect.x + "px";
    }
}
import Rectangle from "./Rectangle.js";

export default class Clock {
    constructor(element) {
        this.elHtml = element;
        this.updateTime();
        this.rect = new Rectangle(0, 0, this.elHtml.offsetWidth, this.elHtml.offsetHeight);
        
    }

    render() {
        this.updateTime();
        this.elHtml.style.top = this.rect.y + "px";
        this.elHtml.style.left = this.rect.x + "px";
    }

    updateTime() {
        this.elHtml.textContent = new Date().toLocaleTimeString();
    }

    refreshClock() {
        setInterval(() => {
            this.elHtml.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
        }, 100);
    }
}
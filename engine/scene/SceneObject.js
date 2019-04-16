export class SceneObject {
    constructor() {
        this.element = this._create();
        this.position = { x: 0, y: 0 };
        this._ai = [];
    }
    update(diff) {
        for (const ai of this._ai) {
            ai.update(diff);
        }
    }
    render() {
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
    }
    addAI(ai) {
        this._ai.push(ai);
    }
    hit(damage) {
        this.element.dispatchEvent(new CustomEvent('hit', { detail: damage }));
    }
}
//# sourceMappingURL=SceneObject.js.map
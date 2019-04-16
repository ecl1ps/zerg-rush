import { Position } from "../utils/MovementUtils.js";
export class Scene {
    constructor(board, events) {
        this.__objects = [];
        this._board = board;
        this._boundingRect = board.getBoundingClientRect();
        this._events = events;
    }
    get _objects() {
        return this.__objects;
    }
    prepare() {
        this.clear();
    }
    clear() {
        this._board.innerHTML = "";
        this.__objects = [];
    }
    add(sceneObject) {
        this.__objects.push({ obj: sceneObject });
    }
    remove(sceneObject) {
        const objForRemoval = this._objects.find(obj => obj.obj === sceneObject);
        if (!objForRemoval)
            throw new Error("Object being removed not found");
        objForRemoval.remove = true;
    }
    update(diff) {
        for (const event of this._events) {
            event.elapsed += diff;
            if (event.elapsed >= event.interval) {
                event.elapsed = 0;
                event.callback();
            }
        }
        for (const o of this._objects) {
            if (o.remove || !o.inScene)
                continue;
            o.obj.update(diff);
            if (!Position.isInside(o.obj.position, this._boundingRect))
                o.remove = true;
        }
    }
    render() {
        for (const o of this._objects) {
            if (!o.inScene && !o.remove) {
                this._board.appendChild(o.obj.element);
                o.inScene = true;
            }
            else if (o.inScene && o.remove) {
                this._board.removeChild(o.obj.element);
                o.inScene = false;
            }
            o.obj.render();
        }
    }
}
//# sourceMappingURL=Scene.js.map
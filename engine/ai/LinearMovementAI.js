import { Move } from "../utils/MovementUtils.js";
export class LinearMovementAI {
    constructor(controlledObject, speed, direction) {
        this._obj = controlledObject;
        this._speed = speed;
        this._direction = direction;
    }
    update(diff) {
        this._obj.position = Move.toDirection(this._obj.position, this._direction, this._speed * diff / 1000);
    }
}
//# sourceMappingURL=LinearMovementAI.js.map
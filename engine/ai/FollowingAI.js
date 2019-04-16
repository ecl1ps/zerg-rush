import { Move } from "../utils/MovementUtils.js";
export class FollowingAI {
    constructor(controlledObject, speed, target) {
        this._obj = controlledObject;
        this._speed = speed;
        this.target = target;
    }
    update(diff) {
        if (!this.target)
            return;
        this._obj.position = Move.to(this._obj.position, this.target.position, this._speed * diff / 1000);
    }
}
//# sourceMappingURL=FollowingAI.js.map
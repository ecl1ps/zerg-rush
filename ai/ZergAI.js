import { FollowingAI } from "../engine/ai/FollowingAI.js";
import { Position } from "../engine/utils/MovementUtils.js";
import { isCargo } from "../entity/Cargo.js";
export class ZergAI extends FollowingAI {
    constructor(controlledObject, speed, attack, sceneObjectsFunc) {
        super(controlledObject, speed);
        this._attackCooldown = 0;
        this._attackOptions = attack;
        this._getSceneObjects = sceneObjectsFunc;
    }
    update(diff) {
        this._pickTarget();
        if (!this.target)
            return;
        if (!this._tryAttack(diff))
            super.update(diff);
    }
    _pickTarget() {
        const proximityObjects = this._getSceneObjects()
            .filter(o => isCargo(o))
            .map(o => ({
            obj: o,
            dist: Position.distance(o.position, this._obj.position)
        }))
            .sort((a, b) => a.dist - b.dist);
        this.target = proximityObjects && proximityObjects.length > 0 ? proximityObjects[0].obj : undefined;
    }
    _tryAttack(diff) {
        this._attackCooldown += diff;
        if (this._attackCooldown < this._attackOptions.interval)
            return false;
        if (!isCargo(this.target))
            return false;
        if (Position.distance(this.target.position, this._obj.position) > this._attackOptions.distance)
            return false;
        this.target.hit(this._attackOptions.damage);
        this._attackCooldown = 0;
        return true;
    }
}
//# sourceMappingURL=ZergAI.js.map
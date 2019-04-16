import { Random } from "../engine/utils/RandomUtils.js";
import { LinearMovementAI } from "../engine/ai/LinearMovementAI.js";
import { MovementDirection } from "../engine/utils/MovementUtils.js";
import { CARGO_SIZE_MIN, CARGO_SIZE_MAX, CARGO_SPEED_MIN, CARGO_SPEED_MAX } from "./constants.js";
import { SceneObject } from "../engine/scene/SceneObject.js";
import { DamageableAI } from "../engine/ai/DamageableAI.js";
import { UnitType } from "./IEntity.js";
import { Teams } from "../scene/ZergScene.js";
class Cargo extends SceneObject {
    constructor() {
        super(...arguments);
        this.kind = UnitType.cargo;
    }
    _create() {
        const el = document.createElement("div");
        el.classList.add("cargo");
        return el;
    }
}
export function isCargo(instance) {
    return instance && instance.kind === UnitType.cargo;
}
export const spawnCargo = function (gameArea, sceneObjectsFunc, removeObjectFunc, adjustScoreFunc) {
    const cargo = new Cargo();
    const size = Random.getRandomIntInclusive(CARGO_SIZE_MIN, CARGO_SIZE_MAX);
    cargo.element.style.setProperty("--size", `${size}px`);
    cargo.element.style.backgroundColor = `rgb(${Random.getRandomInt(0, 256)}, ${Random.getRandomInt(0, 256)}, ${Random.getRandomInt(0, 256)})`;
    const cargoLaneStart = gameArea.height / 3;
    const cargoLaneEnd = (gameArea.height / 3) * 2;
    cargo.position = {
        x: 0,
        y: Random.getRandomIntInclusive(cargoLaneStart, cargoLaneEnd)
    };
    cargo.addAI(new LinearMovementAI(cargo, Random.getRandomReal(CARGO_SPEED_MIN, CARGO_SPEED_MAX), MovementDirection.right));
    cargo.addAI(new DamageableAI(cargo, 100, () => {
        removeObjectFunc(cargo);
        adjustScoreFunc(Teams.zergs, 1);
    }));
    return cargo;
};
//# sourceMappingURL=Cargo.js.map
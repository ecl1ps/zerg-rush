import { Random } from "../engine/utils/RandomUtils.js";
import { ZergAI } from "../ai/ZergAI.js";
import { ZERG_SIZE_MIN, ZERG_SIZE_MAX, ZERG_SPEED_MIN, ZERG_SPEED_MAX } from "./constants.js";
import { DamageableAI } from "../engine/ai/DamageableAI.js";
import { SceneObject } from "../engine/scene/SceneObject.js";
import { UnitType } from "./IEntity.js";
import { Teams } from "../scene/ZergScene.js";
class Zerg extends SceneObject {
    constructor() {
        super(...arguments);
        this.kind = UnitType.zerg;
    }
    _create() {
        const el = document.createElement("div");
        el.classList.add("zerg");
        return el;
    }
}
export function isZerg(instance) {
    return instance && instance.kind === UnitType.zerg;
}
export const spawnZerg = function (gameArea, sceneObjectsFunc, removeObjectFunc, adjustScoreFunc) {
    const zerg = new Zerg();
    const size = Random.getRandomIntInclusive(ZERG_SIZE_MIN, ZERG_SIZE_MAX);
    zerg.element.style.setProperty("--size", `${size}px`);
    zerg.position = {
        x: Random.getRandomInt(0, gameArea.width),
        y: Random.getRandomBool() ? 0 : gameArea.height - size
    };
    const zergAttack = {
        damage: 34,
        interval: 750,
        distance: 10
    };
    zerg.addAI(new ZergAI(zerg, Random.getRandomReal(ZERG_SPEED_MIN, ZERG_SPEED_MAX), zergAttack, sceneObjectsFunc));
    zerg.addAI(new DamageableAI(zerg, 100, () => {
        removeObjectFunc(zerg);
        adjustScoreFunc(Teams.player, 1);
    }));
    zerg.element.addEventListener("mousedown", () => zerg.hit(100));
    return zerg;
};
//# sourceMappingURL=Zerg.js.map
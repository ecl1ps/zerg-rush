import { Scene } from "../engine/scene/Scene.js";
import { isZerg } from "../entity/Zerg.js";
import { MAX_ZERG_COUNT } from "./constants.js";
export var Teams;
(function (Teams) {
    Teams[Teams["player"] = 0] = "player";
    Teams[Teams["zergs"] = 1] = "zergs";
})(Teams || (Teams = {}));
export class ZergScene extends Scene {
    constructor(board, cargoFactory, zergFactory, scoreBoard, initialCargo = 5) {
        const events = new Set([
            { elapsed: 0, interval: 500, callback: () => this._spawnZerg() },
            { elapsed: 500, interval: 1000, callback: () => this._spawnCargo() }
        ]);
        super(board, events);
        this._cargoFactory = cargoFactory;
        this._zergFactory = zergFactory;
        this._scoreBoard = scoreBoard;
        this._initialCargo = initialCargo;
    }
    prepare() {
        super.prepare();
        for (let i = 0; i < this._initialCargo; i++)
            this._spawnCargo();
    }
    _spawnZerg() {
        if (this._objects.filter(o => isZerg(o.obj) && o.inScene && !o.remove).length >= MAX_ZERG_COUNT)
            return;
        this._spawnUnit(this._zergFactory);
    }
    _spawnCargo() {
        this._spawnUnit(this._cargoFactory);
    }
    _spawnUnit(factory) {
        this.add(factory(this._boundingRect, () => this._getSceneObjects(), obj => this.remove(obj), (team, adjustment) => this._scoreBoard.adjustScore(team, adjustment)));
    }
    _getSceneObjects() {
        return this._objects.filter(o => o.inScene && !o.remove).map(o => o.obj);
    }
}
//# sourceMappingURL=ZergScene.js.map
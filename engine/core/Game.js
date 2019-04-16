import { timestamp } from "../utils/timeUtils.js";
export class Game {
    constructor(scene, slowDownFactor = 1, fps = 60) {
        this._stopRequested = false;
        this._scene = scene;
        this._slowDownFactor = slowDownFactor;
        this._fps = fps;
    }
    start() {
        this._stopRequested = false;
        this._scene.prepare();
        let last = timestamp();
        let diff = 0;
        const step = (1 / this._fps) * 1000;
        const slowStep = this._slowDownFactor * step;
        // https://github.com/darsain/fpsmeter
        // const fpsmeter = new FPSMeter(options.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '5px' });
        const updateCallback = () => {
            if (this._stopRequested)
                return;
            //fpsmeter.tickStart();
            const now = timestamp();
            diff = diff + Math.min(1000, now - last);
            while (diff > slowStep) {
                diff = diff - slowStep;
                this._update(step);
            }
            this._render();
            last = now;
            //fpsmeter.tick();
            requestAnimationFrame(updateCallback);
        };
        requestAnimationFrame(updateCallback);
    }
    stop() {
        this._stopRequested = true;
    }
    _update(diff) {
        this._scene.update(diff);
    }
    _render() {
        this._scene.render();
    }
}
//# sourceMappingURL=Game.js.map
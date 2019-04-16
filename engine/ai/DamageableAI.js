export class DamageableAI {
    constructor(controlledObject, hitpoints, destroyedCallback) {
        this._obj = controlledObject;
        this._hitpoints = hitpoints;
        this._destroyedCallback = destroyedCallback;
        this._obj.element.addEventListener("hit", (e) => this._hit(e.detail));
    }
    _hit(damage) {
        if (this._hitpoints <= 0)
            return;
        this._hitpoints -= damage;
        this._obj.element.classList.add("hit");
        setTimeout(() => {
            this._obj.element.classList.remove("hit");
            if (this._hitpoints <= 0)
                this._die();
        }, 100);
    }
    _die() {
        this._destroyedCallback();
    }
    update(diff) {
    }
}
//# sourceMappingURL=DamageableAI.js.map
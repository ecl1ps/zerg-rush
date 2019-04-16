import { Vector2 } from "./Vector2D.js";
export var MovementDirection;
(function (MovementDirection) {
    MovementDirection[MovementDirection["top"] = 0] = "top";
    MovementDirection[MovementDirection["right"] = 1] = "right";
    MovementDirection[MovementDirection["bottom"] = 2] = "bottom";
    MovementDirection[MovementDirection["left"] = 3] = "left";
})(MovementDirection || (MovementDirection = {}));
export class Move {
    static to(position, target, distance) {
        return new Vector2([position.x, position.y])
            .subtract(new Vector2([target.x, target.y]))
            .negate()
            .normalize()
            .scale(distance)
            .add(new Vector2([position.x, position.y]));
    }
    static toDirection(position, direction, distance) {
        switch (direction) {
            case MovementDirection.top:
                return Object.assign({}, position, { y: position.y - distance });
            case MovementDirection.right:
                return Object.assign({}, position, { x: position.x + distance });
            case MovementDirection.bottom:
                return Object.assign({}, position, { y: position.y + distance });
            case MovementDirection.left:
                return Object.assign({}, position, { x: position.x - distance });
        }
    }
}
export class Position {
    static isInside(position, boundingBox) {
        return position.x >= boundingBox.left && position.x <= boundingBox.right &&
            position.y >= boundingBox.top && position.y <= boundingBox.bottom;
    }
    static distance(position1, position2) {
        return Vector2.distance(new Vector2([position1.x, position1.y]), new Vector2([position2.x, position2.y]));
    }
}
//# sourceMappingURL=MovementUtils.js.map
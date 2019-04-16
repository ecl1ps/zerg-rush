/**
 * Copyright 2017 Alic Szecsei <aszecsei@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
export class Vector2 {
    constructor(values) {
        this._values = new Float32Array(2);
        if (values) {
            this.xy = values;
        }
    }
    /**
     * Retrieves a new instance of the vector (0, 0)
     * @returns {Vector2} The zero vector
     */
    static get zero() {
        return new Vector2([0, 0]);
    }
    /**
     * @returns {number} The x-component of the vector
     */
    get x() {
        return this._values[0];
    }
    /**
     * @returns {number} The y-component of the vectory
     */
    get y() {
        return this._values[1];
    }
    /**
     * @returns {number[]} An array containing the x-component and y-component of the vector
     */
    get xy() {
        return [this._values[0], this._values[1]];
    }
    /**
     * @param {number} value The new x-component of the vector
     */
    set x(value) {
        this._values[0] = value;
    }
    /**
     * @param {number} value The new y-component of the vector
     */
    set y(value) {
        this._values[1] = value;
    }
    /**
     * @param {number[]} values An array containing the new x-component and y-component of the vector
     */
    set xy(values) {
        this._values[0] = values[0];
        this._values[1] = values[1];
    }
    /**
     * Calculates the dot product of two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The dot product of the two vectors
     */
    static dot(vector, vector2) {
        return vector.x * vector2.x + vector.y * vector2.y;
    }
    /**
     * Calculates the distance between two vectors
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static distance(vector, vector2) {
        return Math.sqrt(this.squaredDistance(vector, vector2));
    }
    /**
     * Calculates the distance between two vectors squared
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @returns {number} The distance between the two vectors
     */
    static squaredDistance(vector, vector2) {
        let x = vector2.x - vector.x;
        let y = vector2.y - vector.y;
        return x * x + y * y;
    }
    /**
     * Calculates a normalized vector representing the direction from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static direction(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2();
        let x = vector.x - vector2.x;
        let y = vector.y - vector2.y;
        let length = Math.sqrt(x * x + y * y);
        if (length === 0) {
            dest.reset();
            return dest;
        }
        length = 1.0 / length;
        dest.x = x * length;
        dest.y = y * length;
        return dest;
    }
    /**
     * Performs a linear interpolation over two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} a
     * @param {Vector2} b
     * @param {number} t
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static lerp(a, b, t, dest) {
        if (!dest)
            dest = new Vector2();
        dest.x = a.x + t * (b.x - a.x);
        dest.y = a.y + t * (b.y - a.y);
        return dest;
    }
    /**
     * Adds two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static sum(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2();
        dest.x = vector.x + vector2.x;
        dest.y = vector.y + vector2.y;
        return dest;
    }
    /**
     * Subtracts two vectors.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static difference(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2();
        dest.x = vector.x - vector2.x;
        dest.y = vector.y - vector2.y;
        return dest;
    }
    /**
     * Multiplies two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static product(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2();
        dest.x = vector.x * vector2.x;
        dest.y = vector.y * vector2.y;
        return dest;
    }
    /**
     * Divides two vectors piecewise.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} vector
     * @param {Vector2} vector2
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    static quotient(vector, vector2, dest) {
        if (!dest)
            dest = new Vector2();
        dest.x = vector.x / vector2.x;
        dest.y = vector.y / vector2.y;
        return dest;
    }
    /**
     * Retrieves the x-component or y-component of the vector.
     * @param {number} index
     * @returns {number}
     */
    at(index) {
        return this._values[index];
    }
    /**
     * Sets both the x- and y-components of the vector to 0.
     */
    reset() {
        this.x = 0;
        this.y = 0;
    }
    /**
     * Copies the x- and y-components from one vector to another.
     * If no dest vector is specified, a new vector is instantiated.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    copy(dest) {
        if (!dest)
            dest = new Vector2();
        dest.xy = this.xy;
        return dest;
    }
    /**
     * Multiplies both the x- and y-components of a vector by -1.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    negate(dest) {
        if (!dest)
            dest = this;
        dest.x = -this.x;
        dest.y = -this.y;
        return dest;
    }
    /**
     * Returns the distance from the vector to the origin.
     * @returns {number}
     */
    length() {
        return Math.sqrt(this.squaredLength());
    }
    /**
     * Returns the distance from the vector to the origin, squared.
     * @returns {number}
     */
    squaredLength() {
        let x = this.x;
        let y = this.y;
        return x * x + y * y;
    }
    /**
     * Adds two vectors together.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    add(vector, dest) {
        if (!dest)
            dest = this;
        dest.x = this.x + vector.x;
        dest.y = this.y + vector.y;
        return dest;
    }
    /**
     * Subtracts one vector from another.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    subtract(vector, dest) {
        if (!dest)
            dest = this;
        dest.x = this.x - vector.x;
        dest.y = this.y - vector.y;
        return dest;
    }
    /**
     * Multiplies two vectors together piecewise.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    multiply(vector, dest) {
        if (!dest)
            dest = this;
        dest.x = this.x * vector.x;
        dest.y = this.y * vector.y;
        return dest;
    }
    /**
     * Divides two vectors piecewise.
     * @param {Vector2} vector
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    divide(vector, dest) {
        if (!dest)
            dest = this;
        dest.x = this.x / vector.x;
        dest.y = this.y / vector.y;
        return dest;
    }
    /**
     * Scales a vector by a scalar parameter.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {number} value
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    scale(value, dest) {
        if (!dest)
            dest = this;
        dest.x = this.x * value;
        dest.y = this.y * value;
        return dest;
    }
    /**
     * Normalizes a vector.
     * If no dest vector is specified, the operation is performed in-place.
     * @param {Vector2} dest
     * @returns {Vector2}
     */
    normalize(dest) {
        if (!dest)
            dest = this;
        dest.xy = this.xy;
        let length = dest.length();
        if (length === 1) {
            return dest;
        }
        if (length === 0) {
            dest.reset();
            return dest;
        }
        length = 1.0 / length;
        dest.x *= length;
        dest.y *= length;
        return dest;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
//# sourceMappingURL=Vector2D.js.map
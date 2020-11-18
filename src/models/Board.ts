export class Board {
    private width: Number;
    private height: Number;

    constructor(width: Number, height: Number){
        this.width = width;
        this.height = height;
    }

    public toString = () => `width = ${this.width}; height = ${this.height}`;
}

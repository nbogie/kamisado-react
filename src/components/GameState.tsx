export interface GameState {
    grid: Grid;
}

export interface Grid {
    rows: Cell[][];
}

export interface Cell {
    position: Position;
    colour: Flavour;
    piece?: Piece;
}
export type Piece = { type: PieceType; flavour: Flavour; owner: PlayerColour };
export type Flavour =
    | "orange"
    | "blue"
    | "purple"
    | "pink"
    | "yellow"
    | "red"
    | "green"
    | "brown";
export type PieceType = "standard";
export type PlayerColour = "white" | "black";
export type Position = { x: number; y: number };

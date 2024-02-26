import { positionToString } from "./createInitialGrid";

export interface GameState {
    winState: { type: "in-play" } | { type: "won"; winner: PlayerColour };
    nextFlavour: Flavour | null;
    whoseTurn: PlayerColour;
    grid: Grid;
    selection: {
        from: Position | null;
        to: Position | null;
    };
    //TODO: maintain last destination cell instead of nextFlavour directly
    //and highlight this cell for the players.
}

export interface Grid {
    rows: Cell[][];
}

export interface Cell {
    position: Position;
    flavour: Flavour;
    piece?: Piece;
}
export type PieceId = string;
export type Piece = {
    id: PieceId;
    type: PieceType;
    flavour: Flavour;
    owner: PlayerColour;
};
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

type CompleteSelection = { from: Position; to: Position };
export function selectionIsComplete(
    selection: GameState["selection"]
): selection is CompleteSelection {
    return selection.from !== null && selection.to !== null;
}

export function cellAt(pos: Position, gs: GameState): Cell {
    const cell = gs.grid.rows[pos.y][pos.x];
    if (!cell) {
        throw new Error("No cell (invalid position?) " + positionToString(pos));
    }
    return cell;
}
export function pieceAt(pos: Position, gs: GameState): Piece | null {
    const cell = cellAt(pos, gs);
    return cell?.piece ?? null;
}

export function clearSelection(gs: GameState) {
    gs.selection = { from: null, to: null };
}
export function isOnLine(from: Position, to: Position) {
    return (
        from.x === to.x ||
        from.y === to.y ||
        Math.abs(from.x - to.x) === Math.abs(from.y - to.y)
    );
}
export function isPositionInEndGoalFor(to: Position, owner: PlayerColour) {
    return (
        (to.y === 0 && owner === "black") || (to.y === 7 && owner === "white")
    );
}
export function flipWhoseTurn(gs: GameState) {
    gs.whoseTurn = gs.whoseTurn === "white" ? "black" : "white";
}

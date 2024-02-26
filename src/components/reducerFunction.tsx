import { GameState, Position } from "./GameState";

export type Action = ClickedAction;
export type ClickedAction = { type: "clicked"; pos: Position };

export function reducerFunction(gs: GameState, action: Action) {
    switch (action.type) {
        case "clicked": {
            if (!gs.selection.from) {
                gs.selection.from = action.pos;
            } else {
                gs.selection.to = action.pos;
            }

            if (selectionIsComplete(gs.selection)) {
                console.log("selection IS complete");
                moveSelectedPiece(gs);
            }
            break;
        }
    }
}

type CompleteSelection = { from: Position; to: Position };
function selectionIsComplete(
    selection: GameState["selection"]
): selection is CompleteSelection {
    return selection.from !== null && selection.to !== null;
}
function moveSelectedPiece(gs: GameState) {
    if (!selectionIsComplete(gs.selection)) {
        throw new Error("selection is not complete");
    }
    const { from, to } = gs.selection;
    const fromCell = gs.grid.rows[from.y][from.x];
    const toCell = gs.grid.rows[to.y][to.x];
    if (!fromCell.piece) {
        clearSelection(gs);

        return;
    }
    if (toCell.piece) {
        clearSelection(gs);

        return;
    }
    if (!isOnLine(from, to)) {
        clearSelection(gs);

        return;
    }
    const pieceToMove = fromCell.piece;
    fromCell.piece = undefined;
    toCell.piece = pieceToMove;
    console.log("moved piece");
    clearSelection(gs);
}
function clearSelection(gs: GameState) {
    gs.selection = { from: null, to: null };
}
function isOnLine(from: Position, to: Position) {
    return (
        from.x === to.x ||
        from.y === to.y ||
        Math.abs(from.x - to.x) === Math.abs(from.y - to.y)
    );
}

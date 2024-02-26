import {
    GameState,
    PlayerColour,
    Position,
    cellAt,
    pieceAt,
    selectionIsComplete,
} from "./GameState";
import { createInitialGameState } from "./createInitialGameState";

export type Action = ClickedAction | RestartAction;
export type ClickedAction = { type: "clicked"; pos: Position };
export type RestartAction = { type: "restart" };

export function reducerFunction(gs: GameState, action: Action) {
    switch (action.type) {
        case "clicked": {
            if (!gs.selection.from) {
                const p = pieceAt(action.pos, gs);
                if (
                    !p ||
                    p.owner !== gs.whoseTurn ||
                    (gs.nextFlavour && p.flavour !== gs.nextFlavour)
                ) {
                    return;
                }
                gs.selection.from = action.pos;
            } else {
                gs.selection.to = action.pos;
            }

            if (selectionIsComplete(gs.selection)) {
                moveSelectedPiece(gs);
            }
            break;
        }
        case "restart": {
            return createInitialGameState();
        }
    }
}

function moveSelectedPiece(gs: GameState) {
    if (!selectionIsComplete(gs.selection)) {
        throw new Error("selection is not complete");
    }
    const { from, to } = gs.selection;
    const fromCell = cellAt(from, gs);
    const toCell = cellAt(to, gs);

    if (!isOnLine(from, to)) {
        clearSelection(gs);
        return;
    }

    if (!fromCell.piece) {
        clearSelection(gs);
        return;
    }
    if (toCell.piece) {
        clearSelection(gs);
        return;
    }

    const pieceToMove = fromCell.piece;
    if (pieceToMove.owner !== gs.whoseTurn) {
        return;
    }
    if (gs.nextFlavour && gs.nextFlavour !== pieceToMove.flavour) {
        clearSelection(gs);
        return;
    }

    fromCell.piece = undefined;
    toCell.piece = pieceToMove;
    gs.nextFlavour = toCell.flavour;

    if (isPositionInEndGoalFor(to, pieceToMove.owner)) {
        gs.winState = { type: "won", winner: pieceToMove.owner };
    }
    flipWhoseTurn(gs);
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
function isPositionInEndGoalFor(to: Position, owner: PlayerColour) {
    return (
        (to.y === 0 && owner === "black") || (to.y === 7 && owner === "white")
    );
}
function flipWhoseTurn(gs: GameState) {
    gs.whoseTurn = gs.whoseTurn === "white" ? "black" : "white";
}

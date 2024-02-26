import { Dispatch } from "react";
import { Cell } from "./GameState";
import { PieceC } from "./PieceC";
import { Action } from "./reducerFunction";

export function CellC({
    cell,
    dispatch,
}: {
    cell: Cell;
    dispatch: Dispatch<Action>;
}) {
    return (
        <div
            className={"cell " + cell.flavour}
            onClick={() =>
                dispatch({
                    type: "clicked",
                    pos: cell.position,
                })
            }
        >
            {cell.piece && <PieceC piece={cell.piece} />}
        </div>
    );
}

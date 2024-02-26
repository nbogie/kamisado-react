import { GameState, Position } from "./GameState";

export type Action = ClickedAction;
export type ClickedAction = { type: "clicked"; pos: Position };

export function reducerFunction(gs: GameState, action: Action) {
    switch (action.type) {
        case "clicked": {
            const cell = gs.grid.rows[action.pos.y][action.pos.x];
            cell.colour = "yellow";
            break;
        }
    }
}

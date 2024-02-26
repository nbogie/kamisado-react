import { createInitialGrid } from "./createInitialGrid";
import { GameState } from "./GameState";

export function createInitialGameState(): GameState {
    return {
        grid: createInitialGrid()
    };
}

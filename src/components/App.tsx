import { useImmerReducer } from "use-immer";
import "./App.css";
import { createInitialGameState } from "../gameCore/createInitialGameState";
import { positionToString } from "../gameCore/createInitialGrid";
import { reducerFunction } from "../gameCore/reducerFunction";
import { CellC } from "./CellC";
import { GameOverOverlay } from "./GameOverOverlay";

function App() {
    const [gameState, dispatch] = useImmerReducer(
        reducerFunction,
        createInitialGameState()
    );

    return (
        <div className="App">
            <div className="grid">
                {gameState.winState.type === "won" && (
                    <GameOverOverlay
                        gameState={gameState}
                        dispatch={dispatch}
                    />
                )}
                {gameState.grid.rows.flatMap((row) =>
                    row.map((cell) => (
                        <CellC
                            key={
                                cell.piece
                                    ? cell.piece.id
                                    : positionToString(cell.position)
                            }
                            cell={cell}
                            dispatch={dispatch}
                        />
                    ))
                )}
            </div>
            <div>whose turn: {gameState.whoseTurn}</div>
            <div>win state: {gameState.winState.type}</div>
            <div>selection: {JSON.stringify(gameState.selection)}</div>
            <div>next flavour: {gameState.nextFlavour}</div>
        </div>
    );
}

export default App;

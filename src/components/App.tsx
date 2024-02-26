import { useImmerReducer } from "use-immer";
import "./App.css";
import { createInitialGameState } from "./createInitialGameState";
import { positionToString } from "./createInitialGrid";
import { reducerFunction } from "./reducerFunction";
import { CellC } from "./CellC";

function App() {
    const [gameState, dispatch] = useImmerReducer(
        reducerFunction,
        createInitialGameState()
    );

    console.log({ gameState });
    return (
        <div className="App">
            <div className="grid">
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
        </div>
    );
}

export default App;

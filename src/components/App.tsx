import { useImmerReducer } from "use-immer";
import "./App.css";
import { reducerFunction } from "./reducerFunction";
import { createInitialGameState } from "./createInitialGameState";
import { positionToString } from "./createInitialGrid";

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
                        <div
                            key={positionToString(cell.position)}
                            className={"cell " + cell.colour}
                            onClick={() =>
                                dispatch({
                                    type: "clicked",
                                    pos: cell.position,
                                })
                            }
                        >
                            {cell.colour}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;

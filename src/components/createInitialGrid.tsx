import { Cell, Flavour, Grid, Position } from "./GameState";

export function createInitialGrid(): Grid {
    const rows = [];
    for (let colIx = 0; colIx < 8; colIx++) {
        const row: Cell[] = [];
        rows.push(row);
        for (let rowIx = 0; rowIx < 8; rowIx++) {
            const pos: Position = { x: colIx, y: rowIx };
            const cell: Cell = {
                position: pos,
                colour: colourForPosition(pos),
            };
            row.push(cell);
        }
    }
    return { rows };
}

export function colourForPosition(pos: Position): Flavour {
    const data = `
    obpkyrgm
    rokgbymp
    gkorpmyb
    kpbomgry
    yrgmobpk
    bymprokg
    pmybgkor
    mgrykpbo
    `
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length === 8);
    const row = data[pos.y];
    const code = row[pos.x];

    const lookup: Record<string, Flavour> = {
        o: "orange",
        p: "purple",
        k: "pink",
        b: "blue",
        m: "brown",
        g: "green",
        y: "yellow",
        r: "red",
    };
    return lookup[code];
}

export function positionToString(position: Position): string {
    return `${position.x},${position.y}`;
}

import { generateAllPositionsBetweenDiagonal } from "./position";

test("diagonal 1", () => {
    const result = generateAllPositionsBetweenDiagonal(
        { x: 1, y: 1 },
        { x: 4, y: 4 }
    );
    expect(result).toEqual([
        { x: 2, y: 2 },
        { x: 3, y: 3 },
    ]);
});

test("diagonal 2a", () => {
    const result = generateAllPositionsBetweenDiagonal(
        { x: 4, y: 1 },
        { x: 1, y: 4 }
    );
    expect(result).toEqual([
        { x: 3, y: 2 },
        { x: 2, y: 3 },
    ]);
});

test("diagonal 2b", () => {
    const result = generateAllPositionsBetweenDiagonal(
        { x: 1, y: 4 },
        { x: 4, y: 1 }
    );
    expect(result).toEqual([
        { x: 2, y: 3 },
        { x: 3, y: 2 },
    ]);
});

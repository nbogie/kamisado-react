import { greet } from "./greet";

test("Thing", () => {
    expect(greet("Zaphod")).toEqual("Hello, Zaphod");
    expect(greet("Mo")).toEqual("Hello, Mo");
});

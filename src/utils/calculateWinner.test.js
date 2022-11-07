import { calculateWinner } from "./calculateWinner";

it("should return null if no squares are set", () => {
  expect(calculateWinner([])).toBeNull();
});

it("should return null if line so far is not populated by one player", () => {
  expect(calculateWinner(["X", "O", "X"])).toBeNull();
});

it("should winning details if a line is populated by one player", () => {
  expect(calculateWinner(["X", "X", "X"])).toEqual({
    name: "X",
    line: [0, 1, 2],
  });
});

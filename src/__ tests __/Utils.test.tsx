import { checkISINValidity } from "../utils";
import { mockISINs } from "./utils";

test("should not accept invalid ISINs", () => {
  let answers = [];
  mockISINs.forEach((isin) => {
    answers = [...answers, checkISINValidity(isin)];
  });
  expect(answers).toEqual([false, false, false, false, false, true]);
});

test("should not accept duplicate ISINs", () => {
  const testISIN = "DE1234567891";
  ///addISINToList function with test storage
  localStorage.setItem("testISINs", JSON.stringify([testISIN]));
  ///checkISINUniqueness function with test storage
  const mockCheckISINUniqueness = (isin: string) => {
    const subscribedISINs: string[] = JSON.parse(
      localStorage.getItem("testISINs")
    );
    if (subscribedISINs.length !== 0)
      for (let i = 0; i < subscribedISINs.length; i++) {
        if (
          subscribedISINs[i].toLowerCase().normalize() ===
          isin.toLowerCase().normalize()
        )
          return false;
      }
    return true;
  };
  expect(mockCheckISINUniqueness(testISIN)).toBeFalsy();
});

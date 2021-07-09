import kegListReducer from "../../reducers/keg-list-reducer";

describe("kegListReducer", () => {
  let action;
  const kegData = {
    name: 'The Green Dragon',
    brand: 'Against the Grain',
    price: '5.00',
    alcoholContent: '12.5',
    pintsLeft: 124,
    id: 1
  };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });
});
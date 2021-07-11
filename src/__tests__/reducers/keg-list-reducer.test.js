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

  const currentState = {
    1: {
      name: 'The Green Dragon',
      brand: 'Against the Grain',
      price: '5.00',
      alcoholContent: '12.5',
      pintsLeft: 124,
      id: 1
    },
    2: {
      name: 'The Hobbit: Smaug Stout',
      brand: 'Fish Tale',
      price: '5.00',
      alcoholContent: '9.5',
      pintsLeft: 124,
      id: 1
    }
  }

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(kegListReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully add new keg data to masterKegList", () => {
    const { name, brand, price, alcoholContent, pintsLeft, id } = kegData;
    action = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      pintsLeft: pintsLeft,
      id: id
    };

    expect(kegListReducer({}, action)).toEqual({
      [id] : {
        name: name,
        brand: brand,
        price: price,
        alcoholContent: alcoholContent,
        pintsLeft: pintsLeft,
        id: id
      }
    });
  });

  test("Should successfully delete a keg", () => {
    action = {
      type: 'DELETE_KEG',
      id: 1
    };
    expect(kegListReducer(currentState, action)).toEqual({
      2: {
        name: 'The Hobbit: Smaug Stout',
        brand: 'Fish Tale',
        price: '5.00',
        alcoholContent: '9.5',
        pintsLeft: 124,
        id: 1
      }
    });
  });

});
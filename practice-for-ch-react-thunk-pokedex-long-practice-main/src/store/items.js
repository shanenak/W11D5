export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

export const getItems = (id) => async (dispatch) => {
  const response = await fetch(`/api/pokemon/${id}/items`)

  if (response.ok) {
    const payload = await response.json();
    dispatch(load(payload, id))
  }
}

export const updateItem = (item) => async (dispatch) => {
  const response = await fetch(`/api/items/${item.id}`, {
    method: "PATCH",
    body: JSON.stringify(item),
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json",
    }
  });

  if (response.ok) {
    const payload = await response.json();
    dispatch(update(payload));
    return payload;
  }
}

export const deleteItem = (itemId, pokemonId) => async (dispatch) => {
  const response = await fetch(`/api/items/${itemId}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json",
    }
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data)
    dispatch(remove(data.id, pokemonId))
  }
}

export const createItem = (item) => async (dispatch) => {
  const response = await fetch(`/api/items`, {
    
  });
}

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: 
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM: 
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;
const initialState = {
  colNum: 5,
  rowNum: 6,
  soldiers: [
    { id: 'r1',   x: 0, y: 0 },
    { id: 'r5_1', x: 2, y: 2 },
    { id: 'r8_2', x: 3, y: 2 },
  ],
  gameState: 'SELECTING',
  selected: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_SOLDIER':
      return selectSoldier(state, action.payload);
    case 'SELECT_FIELD':
      return selectField(state, action.payload);
  }
  return state;
}

function copy(state) {
  return JSON.parse(JSON.stringify(state));
}

function selectSoldier(state, selectedSoldier) {
  const newState = copy(state);
  
  newState.gameState = 'SELECTED';
  newState.selected = selectedSoldier;
  
  return newState;
}

function selectField(state, {x, y}) {
  if (state.gameState !== 'SELECTED') {
    return state;
  }
  
  const newState = copy(state);
  newState.gameState = 'MOVING';
  
  for (const s of newState.soldiers) {
    if (s.id === newState.selected.id) {
      s.x = x;
      s.y = y;
      break;
    }
  }
  
  return newState;
}
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
  newState.gameState = 'SELECTING';
  
  for (const s of newState.soldiers) {
    if (s.id === newState.selected.id) {
      s.x = x;
      s.y = y;
      break;
    }
  }
  
  return newState;
}

function copy(state) {
  return JSON.parse(JSON.stringify(state));
}

function findSoldierById(state, id) {
  for (let i = 0; i<state.soldiers.length; i++) {
    let s = state.soldiers[i];
    if (s.id === id) {
      return {
        soldier: s,
        index: i,
      };
    }
  }
}

function getSoldierByXY(state, x, y) {
  for (let i = 0; i<state.soldiers.length; i++) {
    let s = state.soldiers[i];
    if (s.x === x && s.y === y) {
      return {
        soldier: s,
        index: i,
      };
    }
  }
  return false;
}

export function getValidFields(state, x, y) {
  function goodField(row, col, origRow, origCol, distance) {
    
    function allClearBetween() {
      if (row - origRow !== 0) {
        let startY = Math.min(row, origRow);
        let endY = Math.max(row, origRow);
        let x = col;
        
        startY += 1;
        while (startY < endY && !getSoldierByXY(state, x, startY)) {
          startY += 1;
        }
        return startY === endY;
      }
      else {
        let startX = Math.min(col, origCol);
        let endX = Math.max(col, origCol);
        let y = row;
        
        // console.log('eleje', startX, endX, y);
        
        startX += 1;
        while (startX < endX && !getSoldierByXY(state, startX, y)) {
          startX += 1;
        }
        
        // console.log('vege', startX, endX, y);
        
        return startX === endX;
      }
    }
    
    let good = true;
    let maxRow = state.dimensions.height;
    let maxCol = state.dimensions.width;
    
    // console.log(row, col);
    good = good && row >= 0 && row <= maxRow-1 && col >= 0 && col <= maxCol-1;
    // console.log(1, good);
    good = good && (row - origRow === 0 || col - origCol === 0);
    // console.log(2, good);
    good = good && !(row === origRow && col === origCol);
    // console.log(3, good);
    good = good && Math.max(Math.abs(row-origRow), Math.abs(col-origCol)) <= distance;
    // console.log(4, good);
    good = good && allClearBetween();
    // console.log(5, good);
    
    let soldierRC = getSoldierByXY(state, col, row);
    let soldierOrigRC = getSoldierByXY(state, origCol, origRow);
    
    // console.log(soldierRC, soldierOrigRC);
    if (soldierRC && soldierOrigRC) {
      good = good && soldierRC.soldier.color !== soldierOrigRC.soldier.color;
    }
    // console.log(6, good);

    return good;
  }

  const distance = {
    1: 1,
    2: Infinity,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
  };
  
  const validFields = [];
  
  const soldier = getSoldierByXY(state, x, y);
  
  if (soldier) {
  
    for (let i = 0; i < state.dimensions.height; i++) {
      for (let j = 0; j < state.dimensions.width; j++) {
        if (goodField(i, j, y, x, distance[soldier.soldier.value])) {
          validFields.push({x: j, y: i});
        }
      }
    }
  
  }
  
  return validFields;
}

const initialState = {
  application: {
    page: 'index',
  }, 
  colNum: 5,
  rowNum: 6,
  soldiers: [
    { id: 'r1',   x: 0, y: 0, value: 1, color: 'red' },
    { id: 'r5_1', x: 2, y: 2, value: 2, color: 'red' },
    { id: 'r8_2', x: 3, y: 2, value: 8, color: 'red' },
    { id: 'b8_1', x: 1, y: 3, value: 8, color: 'blue' },
  ],
  gameState: 'SELECTING',
  selected: false,
  playerToTurn: 'red',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_SOLDIER':
      return selectSoldier(state, action.payload);
    case 'SELECT_FIELD':
      return selectField(state, action.payload);
    case 'END_MOVING':
      return endMoving(state, action.payload);
    case 'START_PUBLIC_GAME':
      return startPublicGame(state);
    case 'JOIN_THE_GAME':
      return joinTheGame(state);
    case 'JOINED_THE_GAME':
      return joinedTheGame(state, action.payload);
    case 'START_THE_GAME':
      return startTheGame(state);
  }
  return state;
}

function selectSoldier(state, selectedSoldier) {
  if (state.gameState === 'MOVING') {
    return state;
  }
  
  if (selectedSoldier.color !== state.playerToTurn) {
    return state;
  }
  
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

function endMoving(state) {
  if (state.gameState !== 'MOVING') {
    return state;
  }
  
  const newState = copy(state);
  newState.gameState = 'SELECTING';
  newState.selected = false;
  newState.playerToTurn = newState.playerToTurn === 'red' ? 'blue' : 'red';
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
    let maxRow = state.rowNum;
    let maxCol = state.colNum;
    
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
  
    for (let i = 0; i < state.rowNum; i++) {
      for (let j = 0; j < state.colNum; j++) {
        if (goodField(i, j, y, x, distance[soldier.soldier.value])) {
          validFields.push({x: j, y: i});
        }
      }
    }
  
  }
  
  return validFields;
}

function startPublicGame(state) {
  var newState = copy(state);
  newState.application.page = 'game';
  return newState;
}

function joinTheGame(state) {
  var newState = copy(state);
  newState.gameState = 'JOINING';
  return newState;
}

function joinedTheGame(state, data) {
  var newState = copy(state);
  newState.gameState = 'JOINED';
  newState.player = data.color;
  newState.playerId = data.playerId;
  newState.gameId = data.gameId;
  return newState;
}

function startTheGame(state) {
  var newState = copy(state);
  newState.gameState = 'SELECTING';
  return newState;
}
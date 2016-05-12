export function selectSoldier(selectedSoldier) {
  return {
    type: 'SELECT_SOLDIER',
    payload: selectedSoldier,
  };
}

export function selectField(selectedField) {
  return {
    type: 'SELECT_FIELD',
    payload: selectedField,
  };
}

export function endMoving() {
  return {
    type: 'END_MOVING',
    payload: null,
  };
}

export function startPublicGame() {
  return {
    type: 'START_PUBLIC_GAME',
  };
}

export function joinTheGame() {
  return {
    type: 'JOIN_THE_GAME',
    meta: {
      remote: true,
    }
  };
}

export function joinedTheGame(serverData) {
  return {
    type: 'JOINED_THE_GAME',
    payload: serverData,
  };
}

export function startTheGame() {
  return {
    type: 'START_THE_GAME',
  };
}
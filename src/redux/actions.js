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
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

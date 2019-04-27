export function simpleUpdate(updateKey) {
  return function(state, { payload }) {
    return {
      ...state,
      [updateKey]: payload
    };
  };
}

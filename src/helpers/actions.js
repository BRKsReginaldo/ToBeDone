export function simpleAction(actionKey) {
  return function(parameter, dispatch) {
    dispatch({
      type: actionKey,
      payload: parameter
    });
  };
}

export function simpleActionCreator(actionFn, parameterDefault = null) {
  return function(parameter = parameterDefault) {
    return function(dispatch) {
      return actionFn(parameter, dispatch);
    };
  };
}

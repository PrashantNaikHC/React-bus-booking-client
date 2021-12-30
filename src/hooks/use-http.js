import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      status: "pending",
      data: null,
      error: null,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      status: "completed",
      data: action.data,
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      status: "completed",
      data: null,
      error: action.errorMessage,
    };
  }
  return state;
};

function useHttp(apiRequest, startWithPendingState = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPendingState ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (apiInputParams) => {
      dispatch({ type: "SEND" });
      try {
        const result = await apiRequest(apiInputParams);
        dispatch({ type: "SUCCESS", data: result });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.errorMessage || "Something went wrong!",
        });
      }
    },
    [apiRequest]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;

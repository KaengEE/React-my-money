import { createContext, useEffect, useReducer } from "react";
import { fireauth } from "../firebase/config";

//인증 컨텍스트 만들기
export const AuthContext = createContext();

// 리듀서 메서드
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

//인증 프로바이더에서 useReducer 사용, 리듀서 메서드 사용
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, //초기값
    authIsReady: false,
  });
  //console.log("인증 state: ", state);

  useEffect(() => {
    // 처음 시작시 유저를  확인해서 유저정보(없으면 null)와 인증확인 액션 디스패치
    const unsub = fireauth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

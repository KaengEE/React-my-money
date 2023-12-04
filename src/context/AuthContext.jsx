import { createContext, useReducer } from "react";

//인증 컨텍스트 만들기
export const AuthContext = createContext();

// 리듀서 메서드
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

//인증 프로바이더에서 useReducer 사용, 리듀서 메서드 사용
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, //초기값
  });
  console.log("인증 state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

//Authcontext를 사용하기 위한 hook(반복하여 사용할때)

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  //오류시
  if (!context) {
    throw Error(
      "useAuthContext는 AuthContextProvider 내에서만 사용가능합니다."
    );
  }

  return context;
};

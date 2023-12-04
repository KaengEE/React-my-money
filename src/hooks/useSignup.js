import { useEffect, useState } from "react";
import { fireauth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //이메일 패스워드로 가입
      const res = await fireauth.createUserWithEmailAndPassword(
        email,
        password
      );
      //console.log(res.user); //가입 후 유저정보 출력

      if (!res) {
        throw new Error("가입중 오류가 발생했습니다.");
      }
      //유저프로필에 이름 업데이트
      await res.user.updateProfile({ displayName: displayName });

      if (!isCancelled) {
        //유저정보를 state에 저장
        dispatch({ type: "LOGIN", payload: res.user });
      }

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  // 로그아웃 작업중 중간에 사라진다면
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};

import { useState } from "react";
import styles from "./Signup.module.css";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //가입하기 hook에서 가져옴
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(email, password, name);
    signup(email, password, name); //가입함수
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Sign up</h2>
      <label>
        {/* 이메일 */}
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        {/* 패스워드 */}
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        {/* 이름 */}
        <span>name:</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      {/* 에러와 로딩 */}
      {!isPending && <button className="btn">가입하기</button>}
      {isPending && (
        <button className="btn" disabled>
          로딩중...
        </button>
      )}
      {error && (
        <p>
          {" "}
          {error === "auth/invalid-email"
            ? "유효한 이메일 주소를 확인해주세요!"
            : error === "auth/weak-password"
            ? "비밀번호는 최소 6자 이상이어야 합니다."
            : error === "auth/email-already-in-use"
            ? "이미 사용 중인 이메일 주소입니다."
            : error}
        </p>
      )}
    </form>
  );
}

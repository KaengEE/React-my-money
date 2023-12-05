import { useState } from "react";
import styles from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(email, password);
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
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
      {/* 로딩 에러 추가 */}
      {!isPending && <button className="btn">로그인</button>}
      {isPending && (
        <button className="btn" disabled>
          로딩중...
        </button>
      )}
      {error && (
        <p>
          {error === "INVALID_LOGIN_CREDENTIALS"
            ? "이메일 또는 패스워드를 확인해주세요!"
            : error === "INVALID_EMAIL"
            ? "유효한 이메일 주소를  확인해주세요!."
            : error === "INVALID_PASSWORD"
            ? "유효한 패스워드를  확인해주세요!."
            : error}
        </p>
      )}
    </form>
  );
}

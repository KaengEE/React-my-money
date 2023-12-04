import { Link } from "react-router-dom";
//CSS모듈사용시 CSS클래스가 다른 컴포넌트에도 적용되는 것을 방지
import styles from "./Navbar.module.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>My Money</li>
        {/* 유저가 null일 경우 */}
        {!user && (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">가입</Link>
            </li>
          </>
        )}
        {/* 유저정보가 있을 경우 로그아웃 버튼 */}
        {user && (
          <>
            <li>안녕하세요, {user.displayName}님</li>
            <li>
              <button className="btn" onClick={logout}>
                로그아웃
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

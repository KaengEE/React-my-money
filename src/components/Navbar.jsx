import { Link } from "react-router-dom";
//CSS모듈사용시 CSS클래스가 다른 컴포넌트에도 적용되는 것을 방지
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>My Money</li>

        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/signup">가입</Link>
        </li>
      </ul>
    </nav>
  );
}

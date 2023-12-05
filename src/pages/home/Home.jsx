import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const [sortBy, setSortBy] = useState("createdAt"); // 기본값
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    [sortBy, "desc"]
  );

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 정렬 */}
        <select onChange={handleSortChange} value={sortBy}>
          <option value="createdAt">최신순</option>
          <option value="amount">비용순</option>
          <option value="name">가나다순</option>
        </select>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

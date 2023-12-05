import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const [sortBy, setSortBy] = useState({ by: "createdAt", order: "desc" }); // 기본값
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    [sortBy.by, sortBy.order]
  );

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortBy((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.selectbox}>
          {/* 정렬 */}
          <select name="by" onChange={handleSortChange} value={sortBy.by}>
            <option value="createdAt">최신순</option>
            <option value="amount">비용순</option>
            <option value="name">가나다순</option>
          </select>
          <select name="order" onChange={handleSortChange} value={sortBy.order}>
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </div>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

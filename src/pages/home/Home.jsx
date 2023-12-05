import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { TransactionInfo } from "./TransactionInfo";
import useSort from "../../hooks/useSort";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("transactions", [
    "uid",
    "==",
    user.uid,
  ]);

  const { sortedData, sortBy, sortDirection, handleSortChange } = useSort(
    documents,
    "createdAt",
    "asc"
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.selectbox}>
          {/* 정렬 */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value, sortDirection)}
          >
            <option value="createdAt">최신순</option>
            <option value="amount">비용순</option>
            <option value="name">가나다순</option>
          </select>
          <select
            value={sortDirection}
            onChange={(e) => handleSortChange(sortBy, e.target.value)}
          >
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </div>
        {error && <p>{error}</p>}
        {sortedData && <TransactionList transactions={sortedData} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
        <TransactionInfo uid={user.uid} />
      </div>
    </div>
  );
}

import styles from "./TransactionInfo.module.css";
import { useCollection } from "../../hooks/useCollection";

export const TransactionInfo = () => {
  const { total, count } = useCollection("transactions");
  return (
    <div>
      <form>
        <label>
          <span>총 거래수</span>
          <input
            readOnly="true"
            value={`${count} 건`}
            className={styles.input}
          />
        </label>
        <label>
          <span>총합계</span>
          <input readOnly="true" value={`${total} 원`} />
        </label>
      </form>
    </div>
  );
};

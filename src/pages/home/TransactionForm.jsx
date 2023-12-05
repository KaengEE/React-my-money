import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions"); //DB컬렉션 이름 transactions

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log({name, amount});
    addDocument({ uid, name, amount });
  };

  useEffect(() => {
    if (response.success) {
      //저장성공시 입력창 빈칸
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <div>
      <h3>거래 추가</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>거래명:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>가격(원):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>추가</button>
      </form>
    </div>
  );
}

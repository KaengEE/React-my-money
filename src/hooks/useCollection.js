import { useEffect, useState } from "react";
import { firedb } from "../firebase/config";

export const useCollection = (collection, query, sortChange) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let ref = firedb.collection(collection);

    // 쿼리가 있으면 배열을 값으로 변환 [1,2,3] => (1,2,3)
    if (query) {
      ref = ref.where(...query);
    }

    // 정렬 조건 적용
    if (sortChange) {
      ref = ref.orderBy(...sortChange);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        let total = 0;
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
          total += parseInt(doc.data().amount); //총합
        });

        setDocuments(results);
        setTotal(total);
        setCount(results.length);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError("데이터를 가져올 수 없습니다.");
      }
    );

    return () => unsub();
  }, [collection]);

  return { documents, error, total, count };
};

import { useEffect, useState } from "react";
import { firedb } from "../firebase/config";

export const useCollection = (collection, query) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = firedb.collection(collection);

    //쿼리가 있으면 배열을 값으로 변환 [1,2,3] => (1,2,3)
    if (query) {
      ref = ref.where(...query);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError("데이터를 가져올 수 없습니다.");
      }
    );

    return () => unsub();
  }, [collection]);

  return { documents, error };
};

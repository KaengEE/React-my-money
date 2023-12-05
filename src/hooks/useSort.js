import { useEffect, useState } from "react";

const useSort = (data, initialSortBy, initialSortDirection) => {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    if (Array.isArray(data)) {
      const newSortedData = [...data].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (sortBy === "createdAt") {
          if (sortDirection === "asc") {
            return aValue - bValue;
          }
          return bValue - aValue;
        }

        if (sortBy === "amount") {
          if (sortDirection === "asc") {
            return aValue - bValue;
          }
          return bValue - aValue;
        }

        if (sortBy === "name") {
          if (sortDirection === "asc") {
            return aValue.localeCompare(bValue);
          }
          return bValue.localeCompare(aValue);
        }

        if (sortDirection === "asc") {
          return aValue - bValue;
        }
        return bValue - aValue;
      });

      setSortedData(newSortedData);
    }
  }, [data, sortBy, sortDirection]);

  const handleSortChange = (newSortBy, newSortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
  };

  return { sortedData, sortBy, sortDirection, handleSortChange };
};

export default useSort;

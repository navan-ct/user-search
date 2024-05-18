import { useEffect, useMemo, useState } from "react";

import { type User } from "../../api/users";
import styles from "./SearchUsers.module.css";
import UserValue from "./UserValue";

export interface SearchUsersProps {
  users: User[];
}

export default function SearchUsers({ users }: SearchUsersProps) {
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  const results = useMemo(
    () =>
      query.length
        ? users.filter((user) =>
            Object.values(user).some((value) =>
              Array.isArray(value)
                ? value.some((nestedValue) =>
                    nestedValue.toLowerCase().includes(query.toLowerCase()),
                  )
                : value.toLowerCase().includes(query.toLowerCase()),
            ),
          )
        : users,
    [query, users],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (focusedIndex !== null && event.key === "ArrowDown") {
        setIsKeyboardMode(true);
        setFocusedIndex((value) => {
          const newValue =
            Number(value) < results.length - 1 ? Number(value) + 1 : value;
          document.getElementById(`result-${newValue}`)?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
          return newValue;
        });
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (focusedIndex !== null && event.key === "ArrowUp") {
        setIsKeyboardMode(true);
        setFocusedIndex((value) => {
          const newValue = value ? value - 1 : value;
          document.getElementById(`result-${newValue}`)?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
          return newValue;
        });
      }
    }

    function handleMouseMove() {
      if (isKeyboardMode) {
        setIsKeyboardMode(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [focusedIndex, isKeyboardMode, results.length]);

  return (
    <div className={styles.container}>
      <input
        className={styles.searchInput}
        placeholder="Search users by ID, name, or address"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className={styles.resultsContainer}>
        {results.length ? (
          results.map((result, index) => (
            <button
              key={result.id}
              id={`result-${index}`}
              className={`${styles.resultContainer} ${index === focusedIndex ? styles.isFocused : ""} ${isKeyboardMode ? styles.isKeyboardMode : ""}`}
              onMouseEnter={() => setFocusedIndex(index)}
              onMouseLeave={() => setFocusedIndex(null)}
            >
              <UserValue
                className={styles.userId}
                value={result.id}
                query={query}
              />
              <UserValue
                className={styles.userName}
                value={result.name}
                query={query}
              />
              <UserValue
                className={styles.userItems}
                value={result.items}
                query={query}
              />
              <UserValue
                className={styles.userAddress}
                value={`${result.address} ${result.pincode}`}
                query={query}
              />
            </button>
          ))
        ) : (
          <div className={styles.noResultsText}>No User Found</div>
        )}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";

import { type User } from "../../api/users";
import styles from "./Search.module.css";
import UserValue from "./UserValue";

export interface SearchUsersProps {
  users: User[];
}

export default function SearchUsers({ users }: SearchUsersProps) {
  const [query, setQuery] = useState("");

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

  return (
    <div className={styles.container}>
      <input
        placeholder="Search users by ID, name, or address"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.resultsContainer}>
        {results.map((result) => (
          <button key={result.id} className={styles.resultContainer}>
            <UserValue value={result.id} query={query} />
            <UserValue value={result.name} query={query} />
            <UserValue
              value={`${result.address} ${result.pincode}`}
              query={query}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

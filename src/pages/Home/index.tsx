import { useEffect, useState } from "react";

import { fetchUsers, type User } from "../../api/users";
import SearchUsers from "../../components/SearchUsers";
import styles from "./Home.module.css";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div className={styles.container}>
      <SearchUsers users={users} />
    </div>
  );
}

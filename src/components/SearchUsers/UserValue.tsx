import styles from "./UserValue.module.css";

export interface UserValueProps {
  value: string | string[];
  query: string;
  className?: string;
}

export default function UserValue({ value, query, className }: UserValueProps) {
  if (typeof value === "string") {
    const lowerValue = value.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const startIndex = lowerValue.indexOf(lowerQuery);

    if (startIndex !== -1) {
      // Split the text and apply special style rules to the query.
      const startText = startIndex ? (
        <span>{value.slice(0, startIndex)}</span>
      ) : null;
      const queryText = (
        <span className={styles.queryText}>
          {value.slice(startIndex, startIndex + query.length)}
        </span>
      );
      const stopText = <span>{value.slice(startIndex + query.length)}</span>;

      return (
        <span className={className}>
          {startText}
          {queryText}
          {stopText}
        </span>
      );
    }
  } else {
    if (
      query.length &&
      value.some((item) => item.toLowerCase().includes(query.toLowerCase()))
    ) {
      return (
        <span className={`${className} ${styles.nestedValue}`}>
          <span className={styles.queryText}>• {query}</span> found in items
        </span>
      );
    } else return null;
  }
  return <span className={className}>{value}</span>;
}

import styles from "./UserValue.module.css";

export interface UserValueProps {
  value: string;
  query: string;
  className?: string;
}

export default function UserValue({ value, query, className }: UserValueProps) {
  const lowerValue = value.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const startIndex = lowerValue.indexOf(lowerQuery);

  if (startIndex !== -1) {
    const startText = startIndex ? (
      <span>{value.slice(0, startIndex)}</span>
    ) : null;
    const queryText = (
      <span className={`${className} ${styles.queryText}`}>
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
  return <span>{value}</span>;
}

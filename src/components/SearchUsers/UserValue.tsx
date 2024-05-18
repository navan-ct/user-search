import styles from "./UserValue.module.css";

export interface UserValueProps {
  value: string;
  query: string;
  className?: string;
}

export default function UserValue({ value, query, className }: UserValueProps) {
  const lowerValue = value.toLowerCase();
  const lowerQuery = query.toLowerCase();

  if (lowerValue.includes(lowerQuery)) {
    const startIndex = lowerValue.indexOf(lowerQuery);
    const startText = startIndex ? (
      <span className={className}>{value.slice(0, startIndex)}</span>
    ) : null;
    const queryText = (
      <span className={`${className} ${styles.queryText}`}>
        {value.slice(startIndex, startIndex + query.length)}
      </span>
    );
    const stopText = (
      <span className={className}>
        {value.slice(startIndex + query.length)}
      </span>
    );

    return (
      <>
        {startText}
        {queryText}
        {stopText}
      </>
    );
  }
  return <span>{value}</span>;
}

export default function Badge({ children, tone = 'leaf' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

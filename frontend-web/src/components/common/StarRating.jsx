export default function StarRating({ rating = 5, count }) {
  return <span className="rating"><span aria-label={`${rating} out of 5 stars`}>★ {Number(rating).toFixed(1)}</span>{count != null && <span className="rating-count">({count})</span>}</span>;
}

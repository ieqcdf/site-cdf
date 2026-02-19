export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-brand-line rounded-2xl shadow-soft ${className}`}>
      {children}
    </div>
  );
}

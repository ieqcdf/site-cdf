import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-gold/30 disabled:opacity-60";

  const styles = {
    primary:
      "bg-brand-red text-white hover:bg-brand-red/90 shadow-sm",
    outline:
      "border border-brand-red/40 text-brand-red hover:bg-brand-red/5",
    dark:
      "bg-brand-ink text-white hover:bg-brand-ink/90 shadow-sm",
    gold:
      "bg-brand-gold text-brand-ink hover:bg-brand-gold/90 shadow-sm",
  };

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

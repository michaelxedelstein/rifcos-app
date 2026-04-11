interface PlaceholderCardProps {
  label: string;
  value?: string;
  detail?: string;
}

export function PlaceholderCard({
  label,
  value = "—",
  detail,
}: PlaceholderCardProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <p className="text-xs font-medium text-muted uppercase tracking-wide">
        {label}
      </p>
      <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
      {detail && <p className="text-xs text-muted mt-1">{detail}</p>}
    </div>
  );
}

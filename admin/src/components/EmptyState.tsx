interface EmptyStateProps {
  message: string;
  buildPhase?: string;
}

export function EmptyState({ message, buildPhase }: EmptyStateProps) {
  return (
    <div className="bg-surface rounded-xl border border-border border-dashed p-12 text-center">
      <p className="text-sm text-muted">{message}</p>
      {buildPhase && (
        <p className="text-xs text-muted/60 mt-2">
          Built during Roadmap {buildPhase}
        </p>
      )}
    </div>
  );
}

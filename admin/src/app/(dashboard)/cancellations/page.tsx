import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function CancellationsPage() {
  return (
    <>
      <PageHeader
        title="Cancellations"
        description="Review cancelled bookings, identify patterns, and flag issues"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <PlaceholderCard
          label="Today"
          value="0"
          detail="Cancellations today"
        />
        <PlaceholderCard
          label="This Week"
          value="0"
          detail="Cancellations this week"
        />
        <PlaceholderCard
          label="Rate"
          value="—"
          detail="Overall cancellation rate"
        />
      </div>

      <EmptyState
        message="Cancellation review table with reason codes and resolution tools will appear here"
        buildPhase="Phase 8 — Ops Dashboard and Controls"
      />
    </>
  );
}

import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Real-time snapshot of RIFCO operations"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <PlaceholderCard
          label="Active Requests"
          value="0"
          detail="No active requests"
        />
        <PlaceholderCard
          label="Online Providers"
          value="0"
          detail="No providers online"
        />
        <PlaceholderCard
          label="Jobs Today"
          value="0"
          detail="No jobs completed today"
        />
        <PlaceholderCard
          label="Revenue Today"
          value="$0"
          detail="No revenue recorded"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmptyState
          message="Live request feed will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
        <EmptyState
          message="Provider activity map will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
      </div>
    </>
  );
}

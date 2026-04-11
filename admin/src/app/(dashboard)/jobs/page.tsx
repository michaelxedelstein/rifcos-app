import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function JobsPage() {
  return (
    <>
      <PageHeader
        title="Live Jobs"
        description="Track all active jobs and provider progress in real-time"
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <PlaceholderCard label="En Route" value="0" />
        <PlaceholderCard label="On Site" value="0" />
        <PlaceholderCard label="In Progress" value="0" />
        <PlaceholderCard label="Completed Today" value="0" />
      </div>

      <EmptyState
        message="Live job tracking table with provider location and timeline will appear here"
        buildPhase="Phase 8 — Ops Dashboard and Controls"
      />
    </>
  );
}

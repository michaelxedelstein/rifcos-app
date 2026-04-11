import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function RequestsPage() {
  return (
    <>
      <PageHeader
        title="Live Requests"
        description="Monitor all incoming and active booking requests"
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <PlaceholderCard label="Pending" value="0" />
        <PlaceholderCard label="Matching" value="0" />
        <PlaceholderCard label="Confirmed" value="0" />
        <PlaceholderCard label="Completed Today" value="0" />
      </div>

      <EmptyState
        message="Live request table with status filters and detail views will appear here"
        buildPhase="Phase 8 — Ops Dashboard and Controls"
      />
    </>
  );
}

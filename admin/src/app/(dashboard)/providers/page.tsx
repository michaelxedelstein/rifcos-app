import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function ProvidersPage() {
  return (
    <>
      <PageHeader
        title="Providers"
        description="Review, approve, and manage provider accounts"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <PlaceholderCard
          label="Pending Approval"
          value="0"
          detail="No providers waiting"
        />
        <PlaceholderCard
          label="Approved"
          value="0"
          detail="Total approved providers"
        />
        <PlaceholderCard
          label="Online Now"
          value="0"
          detail="Currently active"
        />
      </div>

      <EmptyState
        message="Provider approval queue and management table will appear here"
        buildPhase="Phase 8 — Ops Dashboard and Controls"
      />
    </>
  );
}

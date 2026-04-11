import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Support"
        description="Look up users and providers, view booking details, and manage issues"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmptyState
          message="User and provider lookup search will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
        <EmptyState
          message="Booking detail viewer and support notes will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
      </div>
    </>
  );
}

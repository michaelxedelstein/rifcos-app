import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing Controls"
        description="View and adjust base fees, surge bands, and multiplier logic"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <PlaceholderCard
          label="Base Fee"
          value="—"
          detail="Not configured yet"
        />
        <PlaceholderCard
          label="Current Surge"
          value="1.0x"
          detail="Normal pricing"
        />
        <PlaceholderCard
          label="Avg Quote Today"
          value="—"
          detail="No quotes generated"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmptyState
          message="Pricing formula configuration panel will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
        <EmptyState
          message="Surge band controls and thresholds will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
      </div>
    </>
  );
}

import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function ZonesPage() {
  return (
    <>
      <PageHeader
        title="Zone Monitor"
        description="Geographic demand and supply visibility by zone"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <PlaceholderCard
          label="Active Zones"
          value="0"
          detail="No zones configured"
        />
        <PlaceholderCard
          label="Highest Demand"
          value="—"
          detail="No demand data yet"
        />
        <PlaceholderCard
          label="Provider Coverage"
          value="—"
          detail="No coverage data"
        />
      </div>

      <EmptyState
        message="Zone map with demand heatmap and provider coverage overlay will appear here"
        buildPhase="Phase 8 — Ops Dashboard and Controls"
      />
    </>
  );
}

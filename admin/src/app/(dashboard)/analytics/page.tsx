import { PageHeader } from "@/components/PageHeader";
import { PlaceholderCard } from "@/components/PlaceholderCard";
import { EmptyState } from "@/components/EmptyState";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Conversion rates, fulfillment metrics, revenue, and usage trends"
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <PlaceholderCard label="Conversion Rate" value="—" />
        <PlaceholderCard label="Completion Rate" value="—" />
        <PlaceholderCard label="Avg Rating" value="—" />
        <PlaceholderCard label="Repeat Users" value="—" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmptyState
          message="Booking volume chart will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
        <EmptyState
          message="Revenue trend chart will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
        <EmptyState
          message="Provider performance breakdown will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
        <EmptyState
          message="Demand by time-of-day heatmap will appear here"
          buildPhase="Phase 8 — Ops Dashboard and Controls"
        />
      </div>
    </>
  );
}

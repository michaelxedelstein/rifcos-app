import React from 'react';
import { ScreenShell } from '../../components/ui/ScreenShell';

export function ProviderPendingApprovalScreen() {
  return (
    <ScreenShell
      title="Under Review"
      subtitle="Your application is being reviewed. We'll notify you when you're approved."
    />
  );
}

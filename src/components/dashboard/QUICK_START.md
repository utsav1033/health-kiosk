/**
 * QUICK START GUIDE - Dashboard Component Usage
 * 
 * Copy-paste examples for using the new dashboard components
 */

// ===== 1. IMPORT COMPONENTS =====

import {
  MetricTile,
  SectionCard,
  HealthScoreCard,
  DashboardHeader,
  DashboardFooter,
  type PatientInfo,
  type HealthMetric,
} from '@/components/dashboard';

import { createDashboardData } from '@/constants/healthCategories';


// ===== 2. DISPLAY A SINGLE METRIC =====

// Example: Show one health metric with status color
<MetricTile
  label="Blood Pressure"
  value="120/80"
  unit="mmHg"
  status="normal"
  referenceRange="90-120 / 60-80"
/>


// ===== 3. DISPLAY A CATEGORY CARD =====

// Example: Show all vitals in one card
<SectionCard
  title="Vitals"
  icon="💓"
  metrics={[
    {
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
    },
    {
      label: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      status: 'normal',
    },
  ]}
  status="normal"
  description="Essential life signs"
  actionLabel="View History"
  onAction={() => console.log('View history clicked')}
/>


// ===== 4. DISPLAY OVERALL HEALTH SCORE =====

// Example: Show health score with circular progress
<HealthScoreCard
  score={85}
  label="Overall Health Score"
/>


// ===== 5. DISPLAY HEADER WITH PATIENT INFO =====

// Example: Show patient name, ID, and session status
<DashboardHeader
  patient={{
    name: 'John Doe',
    id: 'P-001',
    age: 34,
    gender: 'M',
    bloodGroup: 'O+',
  }}
  sessionStatus="active"
  elapsedTime="12:42"
  parametersCollected={54}
  parametersTotal={62}
/>


// ===== 6. DISPLAY FOOTER WITH CONTROLS =====

// Example: Show system status and session buttons
<DashboardFooter
  systemStatus="operational"
  parametersCollected={54}
  parametersTotal={62}
  elapsedTime="12:42"
  onPause={() => console.log('Pause clicked')}
  onComplete={() => console.log('Complete clicked')}
/>


// ===== 7. BUILD A COMPLETE DASHBOARD =====

// Example: Full dashboard with all components

export function MyDashboard() {
  // Get all health data organized into 5 categories
  const data = createDashboardData();

  const patient: PatientInfo = {
    name: 'John Doe',
    id: 'P-001',
    age: 34,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        patient={patient}
        sessionStatus="active"
        elapsedTime="12:42"
        parametersCollected={54}
        parametersTotal={62}
      />

      {/* Overall Score */}
      <HealthScoreCard score={85} />

      {/* Categories */}
      <div className="grid grid-cols-2 gap-8">
        <SectionCard
          title={data.vitals.title}
          icon={data.vitals.icon}
          metrics={data.vitals.metrics}
          status={data.vitals.status}
          description={data.vitals.description}
          actionLabel="View Details"
        />

        <SectionCard
          title={data.cardiac.title}
          icon={data.cardiac.icon}
          metrics={data.cardiac.metrics}
          status={data.cardiac.status}
          description={data.cardiac.description}
          actionLabel="View Details"
        />

        <SectionCard
          title={data.bodyComposition.title}
          icon={data.bodyComposition.icon}
          metrics={data.bodyComposition.metrics}
          status={data.bodyComposition.status}
          description={data.bodyComposition.description}
          actionLabel="View Details"
        />

        <SectionCard
          title={data.metabolicRisk.title}
          icon={data.metabolicRisk.icon}
          metrics={data.metabolicRisk.metrics}
          status={data.metabolicRisk.status}
          description={data.metabolicRisk.description}
          actionLabel="View Details"
        />
      </div>

      {/* Full-width Diagnostics */}
      <SectionCard
        title={data.diagnostics.title}
        icon={data.diagnostics.icon}
        metrics={data.diagnostics.metrics}
        status={data.diagnostics.status}
        description={data.diagnostics.description}
        actionLabel="View Details"
      />

      {/* Footer */}
      <DashboardFooter
        systemStatus="operational"
        parametersCollected={54}
        parametersTotal={62}
        elapsedTime="12:42"
        onPause={() => console.log('Pause')}
        onComplete={() => console.log('Complete')}
      />
    </div>
  );
}


// ===== 8. CUSTOMIZE STATUS COLORS =====

// Example: Override status colors in MetricTile

// In MetricTile.tsx, edit STATUS_COLORS:
const STATUS_COLORS = {
  normal: {
    bg: '#your-light-green',
    border: '#your-green',
    text: '#your-dark-green',
    dot: '#your-green',
  },
  warning: {
    bg: '#your-light-yellow',
    border: '#your-yellow',
    text: '#your-dark-yellow',
    dot: '#your-yellow',
  },
  critical: {
    bg: '#your-light-red',
    border: '#your-red',
    text: '#your-dark-red',
    dot: '#your-red',
  },
};


// ===== 9. CREATE CUSTOM CATEGORIES =====

// Example: Add a new health category

import { createDashboardData } from '@/constants/healthCategories';
import type { HealthCategory } from '@/constants/healthCategories';

// Create custom category
const customCategory: HealthCategory = {
  id: 'custom',
  title: 'Custom Category',
  icon: '📊',
  description: 'Custom health metrics',
  metrics: [
    {
      label: 'Custom Metric 1',
      value: 100,
      unit: 'unit',
      status: 'normal',
    },
    {
      label: 'Custom Metric 2',
      value: 200,
      unit: 'unit',
      status: 'warning',
    },
  ],
  status: 'warning',
};

// Use in component
<SectionCard
  title={customCategory.title}
  icon={customCategory.icon}
  metrics={customCategory.metrics}
  status={customCategory.status}
/>


// ===== 10. DEVICE DATA INTEGRATION =====

// Example: Connect real device data

import {
  transformDeviceVitals,
  transformDeviceCardiac,
  transformDeviceBodyComposition,
  transformDeviceMetabolic,
  transformDeviceDiagnostics,
} from '@/lib/deviceIntegration';

// In your component
const [dashboardData, setDashboardData] = useState(null);

useEffect(() => {
  // Connect to device (example)
  const device = new HealthDevice();

  device.on('data', (rawData) => {
    // Transform device data to dashboard format
    setDashboardData({
      vitals: {
        title: 'Vitals',
        icon: '💓',
        metrics: transformDeviceVitals(rawData.vitals),
        status: 'normal',
      },
      cardiac: {
        title: 'Cardiac Health',
        icon: '🫀',
        metrics: transformDeviceCardiac(rawData.cardiac),
        status: 'normal',
      },
      // ... transform other categories
    });
  });
}, []);


// ===== 11. RESPONSIVE GRID LAYOUTS =====

// 2-column layout on large screens (current)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <SectionCard {...props} />
  <SectionCard {...props} />
</div>

// 3-column layout on large screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <SectionCard {...props} />
  <SectionCard {...props} />
</div>

// 4-column layout on large screens
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  <SectionCard {...props} />
</div>


// ===== 12. VARIANT LAYOUTS =====

// Default card (standard appearance)
<SectionCard variant="default" {...props} />

// Compact card (smaller, minimal)
<SectionCard variant="compact" {...props} />

// Featured card (highlighted, darker)
<SectionCard variant="featured" {...props} />


// ===== 13. COMPONENT PROP REFERENCE =====

/*
MetricTile Props:
- label: string - Display label
- value: string | number - Metric value
- unit: string - Unit of measurement
- status: 'normal' | 'warning' | 'critical' - Health status
- referenceRange?: string - Reference range for display

SectionCard Props:
- title: string - Category title
- icon: string - Icon/emoji
- metrics: HealthMetric[] - Array of metrics
- status: HealthStatus - Overall status
- description?: string - Category description
- actionLabel?: string - Action button label
- onAction?: () => void - Action button handler
- variant?: 'default' | 'compact' | 'featured'

HealthScoreCard Props:
- score: number - Score 0-100
- label?: string - Display label

DashboardHeader Props:
- patient: PatientInfo - Patient information
- sessionStatus?: 'active' | 'completed'
- elapsedTime?: string - Formatted time (e.g., "12:42")
- parametersCollected?: number
- parametersTotal?: number

DashboardFooter Props:
- systemStatus?: 'operational' | 'maintenance' | 'offline'
- parametersCollected?: number
- parametersTotal?: number
- elapsedTime?: string
- onPause?: () => void
- onComplete?: () => void
*/


// ===== 14. COMMON PATTERNS =====

// Pattern 1: Error handling for missing metrics
if (!data.vitals.metrics || data.vitals.metrics.length === 0) {
  return <div>No vital metrics available</div>;
}

// Pattern 2: Conditional rendering based on status
const statusMessage = {
  normal: 'All metrics are normal',
  warning: 'Some metrics need attention',
  critical: 'Critical values detected',
};

// Pattern 3: Dynamic action handlers
const handleCategoryAction = (categoryId: string) => {
  console.log(`Showing details for ${categoryId}`);
  // Navigate or show modal
};

// Pattern 4: Session timer formatting
const formatSessionTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};


// ===== 15. ACCESSIBILITY =====

// All components are WCAG AAA compliant:
// - Touch targets: 48x48px minimum
// - Color contrast: AAA standard
// - ARIA labels included
// - Keyboard navigation supported
// - Screen reader friendly

// Component automatically includes:
// - Status indicators for visual + semantic meaning
// - Focus states for keyboard navigation
// - Semantic HTML structure
// - Proper heading hierarchy

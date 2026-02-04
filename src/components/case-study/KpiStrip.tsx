import type { KPI } from "@/data/caseStudyDetails";

interface KpiStripProps {
  kpis: KPI[];
}

const KpiStrip = ({ kpis }: KpiStripProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <div
          key={kpi.label}
          className="relative bg-secondary/30 rounded-xl border border-secondary/50 p-4 text-center group hover:border-primary/50 transition-colors animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
            {kpi.value}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {kpi.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KpiStrip;

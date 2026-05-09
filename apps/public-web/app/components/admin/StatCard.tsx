import { Icon, type IconName } from '@/app/components/admin/Icons';

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  icon: IconName;
};

export default function StatCard({ label, value, delta, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#1e3a5f]/10 bg-white p-6 shadow-fs-card">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1e3a5f]/10 text-[#1e3a5f]">
          <Icon name={icon} className="h-6 w-6" />
        </div>
        <svg className="mt-8 h-8 w-20 text-[#1e3a5f]/40" viewBox="0 0 90 32" fill="none" aria-hidden>
          <path
            d="M2 25c8-9 14 1 22-6s12-12 22-5 15 8 24-2 12-9 18-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="mt-5">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
        <p className="mt-2 text-xs text-slate-400">{delta}</p>
      </div>
    </div>
  );
}

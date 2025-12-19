import React from 'react'

export default function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.round((value / Math.max(1, total)) * 100)
  return (
    <div className="w-48">
      <div className="text-sm text-slate-400">Progress {pct}%</div>
      <div className="w-full h-2 bg-slate-700 rounded mt-1">
        <div className="h-2 bg-indigo-600 rounded" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

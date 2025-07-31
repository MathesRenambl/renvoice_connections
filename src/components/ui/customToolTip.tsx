import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-xl shadow-xl p-4 min-w-max max-w-xs">
      {label && (
        <div className="mb-3 pb-2 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {label}
          </p>
        </div>
      )}
      
      <div className="space-y-2.5">
        {payload.map((entry, i) => {
          const name = entry.name || entry.dataKey || 'Value';
          const val = entry.value;
          // Better color handling for pie charts
          const color = entry.payload?.fill || entry.fill || entry.color || '#8884d8';
          const pct = entry.payload?.percent;

          return (
            <div key={i} className="flex justify-between items-center group">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-md flex-shrink-0 shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-medium text-gray-600 capitalize">
                  {name}
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900 tabular-nums">
                  {typeof val === 'number' ? val.toLocaleString() : val}
                </span>
                {pct != null && (
                  <div className="text-xs text-gray-500 font-medium mt-0.5">
                    {(pct * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Subtle arrow indicator */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
        <div className="w-2 h-2 bg-white border-r border-b border-gray-200/80 transform rotate-45"></div>
      </div>
    </div>
  );
};
/**
 * ResponseHeatmap — Shows submission patterns by day-of-week × hour-of-day
 * Uses a grid of colored cells where intensity maps to submission count.
 * Gold palette matches the luxury design system.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

// Gold intensity scale from cream (0) to deep gold (max)
const HEAT_COLORS = [
  "rgba(201,169,110,0.04)", // 0 — near invisible
  "rgba(201,169,110,0.12)", // low
  "rgba(201,169,110,0.25)", // medium-low
  "rgba(201,169,110,0.42)", // medium
  "rgba(201,169,110,0.60)", // medium-high
  "rgba(201,169,110,0.80)", // high
  "rgba(201,169,110,1.00)", // max
];

function getHeatColor(value: number, max: number): string {
  if (max === 0 || value === 0) return HEAT_COLORS[0];
  const ratio = value / max;
  const idx = Math.min(
    Math.floor(ratio * (HEAT_COLORS.length - 1)) + 1,
    HEAT_COLORS.length - 1
  );
  return HEAT_COLORS[idx];
}

function formatHour(h: number): string {
  if (h === 0) return "12a";
  if (h < 12) return `${h}a`;
  if (h === 12) return "12p";
  return `${h - 12}p`;
}

interface ResponseHeatmapProps {
  /** Array of ISO date strings (createdAt from submissions) */
  timestamps: string[];
}

export default function ResponseHeatmap({ timestamps }: ResponseHeatmapProps) {
  const { grid, maxCount, peakDay, peakHour, totalCells } = useMemo(() => {
    // Build 7×24 grid
    const g: number[][] = Array.from({ length: 7 }, () =>
      Array.from({ length: 24 }, () => 0)
    );
    let max = 0;

    timestamps.forEach((ts) => {
      const d = new Date(ts);
      const day = d.getDay(); // 0=Sun
      const hour = d.getHours();
      g[day][hour]++;
      if (g[day][hour] > max) max = g[day][hour];
    });

    // Find peak
    let pDay = 0;
    let pHour = 0;
    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 24; h++) {
        if (g[d][h] > g[pDay][pHour]) {
          pDay = d;
          pHour = h;
        }
      }
    }

    return {
      grid: g,
      maxCount: max,
      peakDay: DAYS[pDay],
      peakHour: formatHour(pHour),
      totalCells: 7 * 24,
    };
  }, [timestamps]);

  if (timestamps.length === 0) return null;

  return (
    <motion.div
      className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Flame className="w-4.5 h-4.5 text-gold" />
            <h3 className="font-serif text-lg font-semibold text-charcoal">
              Response Heatmap
            </h3>
          </div>
          {maxCount > 0 && (
            <div className="text-right">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground/60 mb-0.5">
                Peak Activity
              </p>
              <p className="text-sm font-medium text-gold">
                {peakDay} at {peakHour}
              </p>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground/60 mt-1.5">
          Submissions by day of week and hour of day (local time)
        </p>
      </div>

      {/* Heatmap Grid */}
      <div className="px-6 py-5 overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Hour labels */}
          <div className="flex ml-[52px] mb-1.5">
            {HOURS.map((h) => (
              <div
                key={h}
                className="flex-1 text-center text-[0.55rem] text-muted-foreground/50 font-medium tabular-nums"
              >
                {h % 3 === 0 ? formatHour(h) : ""}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          <div className="space-y-[3px]">
            {DAYS.map((day, dayIdx) => (
              <div key={day} className="flex items-center gap-0">
                <span className="w-[48px] text-[0.7rem] font-medium text-muted-foreground/70 shrink-0 text-right pr-2">
                  {day}
                </span>
                <div className="flex flex-1 gap-[3px]">
                  {HOURS.map((hour) => {
                    const count = grid[dayIdx][hour];
                    return (
                      <motion.div
                        key={hour}
                        className="flex-1 aspect-square rounded-[3px] cursor-default relative group"
                        style={{
                          backgroundColor: getHeatColor(count, maxCount),
                          minHeight: "18px",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.005 * (dayIdx * 24 + hour),
                        }}
                        whileHover={{ scale: 1.3, zIndex: 10 }}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-charcoal text-white text-[0.6rem] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-20">
                          <span className="font-medium">{day}</span>{" "}
                          {formatHour(hour)}
                          <br />
                          {count} response{count !== 1 ? "s" : ""}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-[0.6rem] text-muted-foreground/50">Less</span>
            <div className="flex gap-[2px]">
              {HEAT_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-[0.6rem] text-muted-foreground/50">More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

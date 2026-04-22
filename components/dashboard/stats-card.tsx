import { Card, CardContent } from "@/components/ui/card"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  positive?: boolean
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  iconColor = "text-blue-600",
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
            {change && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  positive ? "text-green-600" : "text-red-500"
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div className={cn("rounded-lg bg-slate-50 p-2", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

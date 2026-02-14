import {
  CircleCheck,
  Info,
  Loader2,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4" />,
        error: <OctagonX className="size-4" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--popover))",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

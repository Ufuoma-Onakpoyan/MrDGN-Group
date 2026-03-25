import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="min-w-[84px] shrink-0 gap-2"
        aria-hidden
        disabled
      >
        <span className="text-xs font-semibold">...</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";
  const modeLabel = isDark ? "Dark" : "Light";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="min-w-[84px] shrink-0 gap-2"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="text-xs sm:text-sm font-semibold">{modeLabel}</span>
    </Button>
  );
}

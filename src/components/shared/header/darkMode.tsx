"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export const DarkMode = () => {
  const [mounted, SetMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    SetMounted(true);
  }, []);

  if (!mounted) return null;

  let icon;
  switch (theme) {
    case "system":
      icon = <SunMoon />;
      break;
    case "dark":
      icon = <MoonIcon />;
      break;
    case "light":
      icon = <SunIcon />;
      break;
    default:
      icon = <SunIcon />;
      break;
  }

  return (
    <DropdownMenu>
      {/* این تریگر منو را باز می‌کند */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          {icon}
        </Button>
      </DropdownMenuTrigger>

      {/* این بخش محتویات منو را نگه می‌دارد */}
      <DropdownMenuContent>
        <DropdownMenuLabel>Select mode</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={theme === "System"}
          onClick={() => setTheme("System")}
        >
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

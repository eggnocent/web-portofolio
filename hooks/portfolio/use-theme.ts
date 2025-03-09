"use client";

import { useContext } from "react";
import { ThemeContext } from "@/components/portfolio/theme/theme-provider";

export function useTheme() {
  const context = useContext(ThemeContext);

  console.log("useTheme() called, context:", context); // Debugging output

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

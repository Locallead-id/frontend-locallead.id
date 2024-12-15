import { SidebarProvider } from "@/hooks/use-sidebar";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme-provider";
import { UserProvider } from "@/lib/axios";
import { AssessmentProvider } from "@/lib/assesment";

export const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AssessmentProvider>
      <UserProvider>
        <HelmetProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
                <SidebarProvider>{children}</SidebarProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </BrowserRouter>
        </HelmetProvider>
      </UserProvider>
    </AssessmentProvider>
  );
}

import { Helmet } from "react-helmet";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import WeightInSpace from "./pages/WeightInSpace";
import Calculators from "./pages/Calculators";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/legal", element: <Legal /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/contact", element: <Contact /> },
  { path: "/weight-in-space", element: <WeightInSpace /> },
  { path: "/calculators", element: <Calculators /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogArticle /> },
  // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
  { path: "*", element: <NotFound /> },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Helmet>
        <html lang="en" />
      </Helmet>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteConfigProvider } from "@/lib/siteConfig";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index.tsx";
import Impact from "./pages/Impact.tsx";
import Donate from "./pages/Donate.tsx";
import About from "./pages/About.tsx";
import Stories from "./pages/Stories.tsx";
import StoryDetail from "./pages/StoryDetail.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteConfigProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin portal — no public navbar/footer */}
            <Route path="/admin" element={<Admin />} />

            {/* Public portal */}
            <Route path="*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/impact" element={<Impact />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/story/:source/:id" element={<StoryDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </SiteConfigProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

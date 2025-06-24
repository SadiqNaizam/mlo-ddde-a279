import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Checkoutpage from "./pages/Checkoutpage";
import Collectionpage from "./pages/Collectionpage";
import Customizationstudiopage from "./pages/Customizationstudiopage";
import Homepage from "./pages/Homepage";
import Userdashboardpage from "./pages/Userdashboardpage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/checkoutpage" element={<Checkoutpage />} />
          <Route path="/collectionpage" element={<Collectionpage />} />
          <Route path="/customizationstudiopage" element={<Customizationstudiopage />} />
          <Route path="/userdashboardpage" element={<Userdashboardpage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;

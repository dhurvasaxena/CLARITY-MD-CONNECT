import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Network from '@/pages/Network';
import Messages from '@/pages/Messages';
import Saved from '@/pages/Saved';
import PractitionerProfile from '@/pages/PractitionerProfile';
import VerifyDoctor from '@/pages/VerifyDoctor';
import DoctorProfile from '@/pages/DoctorProfile';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/network" element={<Network />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/verify" element={<VerifyDoctor />} />
          <Route path="/practitioner/:practitionerId" element={<PractitionerProfile />} />
          <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

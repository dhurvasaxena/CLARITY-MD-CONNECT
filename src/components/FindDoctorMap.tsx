import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Stethoscope, X, CheckCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoogleMapComponent from '@/components/GoogleMapComponent';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  verified: boolean;
  lat: number;
  lng: number;
  profilePath?: string;
}

const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'dr-dhurva-saxena',
    name: 'Dr. Dhurva Saxena',
    specialty: 'Cardiology',
    location: 'Connaught Place, New Delhi',
    verified: true,
    lat: 28.6315,
    lng: 77.2167,
    profilePath: '/doctor/dr-dhurva-saxena'
  },
  {
    id: 'dr-mandeep-singh',
    name: 'Dr. Mandeep Singh',
    specialty: 'Pediatrics',
    location: 'Karol Bagh, New Delhi',
    verified: true,
    lat: 28.6517,
    lng: 77.1909,
    profilePath: '/doctor/dr-mandeep-singh'
  },
  {
    id: 'dr-pranjal-sethi',
    name: 'Dr. Pranjal Sethi',
    specialty: 'Emergency Medicine',
    location: 'Lajpat Nagar, New Delhi',
    verified: true,
    lat: 28.5679,
    lng: 77.2431,
    profilePath: '/doctor/dr-pranjal-sethi'
  },
  {
    id: 'dr-priya-sharma',
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatology',
    location: 'Greater Kailash, New Delhi',
    verified: true,
    lat: 28.5504,
    lng: 77.2500,
    profilePath: '/doctor/dr-priya-sharma'
  },
  {
    id: 'dr-rajesh-kumar',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Orthopedics',
    location: 'Pitampura, New Delhi',
    verified: true,
    lat: 28.7041,
    lng: 77.1025,
    profilePath: '/doctor/dr-rajesh-kumar'
  },
  {
    id: 'dr-anita-gupta',
    name: 'Dr. Anita Gupta',
    specialty: 'Gynecology',
    location: 'Saket, New Delhi',
    verified: true,
    lat: 28.5355,
    lng: 77.2189,
    profilePath: '/doctor/dr-anita-gupta'
  }
];


export default function FindDoctorMap() {
  const [open, setOpen] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<{ [k: string]: boolean }>({
    cardiology: true,
    pediatrics: true,
    emergency: true,
    dermatology: true,
    orthopedics: true,
    gynecology: true,
    within25: true
  });

  const filtered = useMemo(() => {
    return MOCK_DOCTORS.filter((d) => {
      const matchesQuery = `${d.name} ${d.specialty} ${d.location}`.toLowerCase().includes(query.toLowerCase());
      const specOk =
        (filters.cardiology && d.specialty === 'Cardiology') ||
        (filters.pediatrics && d.specialty === 'Pediatrics') ||
        (filters.emergency && d.specialty === 'Emergency Medicine') ||
        (filters.dermatology && d.specialty === 'Dermatology') ||
        (filters.orthopedics && d.specialty === 'Orthopedics') ||
        (filters.gynecology && d.specialty === 'Gynecology');
      return matchesQuery && specOk;
    });
  }, [query, filters]);

  // Handler functions for map interactions
  const handleDoctorClick = (doctor: Doctor) => {
    setActiveId(doctor.id);
  };

  const handleDoctorHover = (doctorId: string | null) => {
    setHoverId(doctorId);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-blue-600" />
          <span>Find a Verified Doctor Near You</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Collapsed mini map */}
        <div className="relative w-full h-[150px] rounded-md overflow-hidden border">
          <GoogleMapComponent
            doctors={filtered.slice(0, 3)}
            onDoctorClick={handleDoctorClick}
            onDoctorHover={handleDoctorHover}
            hoveredDoctorId={hoverId}
            activeDoctorId={activeId}
            className="w-full h-full"
            isExpanded={false}
          />
          
          <div className="absolute bottom-2 right-2">
            <Button size="sm" onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Expand Map
            </Button>
          </div>
        </div>

        {/* Expanded modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl p-0 gap-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="flex items-center justify-between">
                <span>Find a Verified Doctor Near You</span>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="px-6 pb-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by specialty / location"
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <Checkbox checked={!!filters.cardiology} onCheckedChange={(v) => setFilters((f) => ({ ...f, cardiology: !!v }))} />
                    Cardiology
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={!!filters.pediatrics} onCheckedChange={(v) => setFilters((f) => ({ ...f, pediatrics: !!v }))} />
                    Pediatrics
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={!!filters.emergency} onCheckedChange={(v) => setFilters((f) => ({ ...f, emergency: !!v }))} />
                    Emergency
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={!!filters.dermatology} onCheckedChange={(v) => setFilters((f) => ({ ...f, dermatology: !!v }))} />
                    Dermatology
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={!!filters.orthopedics} onCheckedChange={(v) => setFilters((f) => ({ ...f, orthopedics: !!v }))} />
                    Orthopedics
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={!!filters.gynecology} onCheckedChange={(v) => setFilters((f) => ({ ...f, gynecology: !!v }))} />
                    Gynecology
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t">
              {/* Map area */}
              <div className="lg:col-span-2 relative h-[70vh]">
                <GoogleMapComponent
                  doctors={filtered}
                  onDoctorClick={handleDoctorClick}
                  onDoctorHover={handleDoctorHover}
                  hoveredDoctorId={hoverId}
                  activeDoctorId={activeId}
                  className="w-full h-full"
                  isExpanded={true}
                />
              </div>

              {/* Sidebar list */}
              <div className="border-l bg-white h-[70vh]">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-3">
                    {filtered.map((d) => (
                      <div
                        key={d.id}
                        className={`p-3 rounded-md border cursor-pointer ${activeId === d.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                        onMouseEnter={() => setHoverId(d.id)}
                        onMouseLeave={() => setHoverId(null)}
                        onClick={() => setActiveId(d.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{d.name}</span>
                              {d.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </div>
                            <p className="text-xs text-gray-600">{d.specialty} • {d.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8">Connect</Button>
                            {d.profilePath ? (
                              <Link to={d.profilePath}>
                                <Button size="sm" className="h-8">View Profile</Button>
                              </Link>
                            ) : (
                              <Button size="sm" className="h-8">View Profile</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {filtered.length === 0 && (
                      <p className="text-sm text-gray-500">No verified doctors match your filters.</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

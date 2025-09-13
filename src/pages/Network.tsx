import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  Home, 
  Users, 
  Bookmark, 
  Settings, 
  Search, 
  Filter,
  UserPlus,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';

// Mock data for current connections
const currentConnections = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    hospital: 'Mayo Clinic',
    location: 'Rochester, MN',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 12,
    lastActive: '2 hours ago',
    status: 'online'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    hospital: 'Johns Hopkins',
    location: 'Baltimore, MD',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 8,
    lastActive: '1 day ago',
    status: 'away'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Hospital',
    location: 'Boston, MA',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 15,
    lastActive: '3 hours ago',
    status: 'online'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    hospital: 'Cleveland Clinic',
    location: 'Cleveland, OH',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 6,
    lastActive: '5 days ago',
    status: 'offline'
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Dermatology',
    hospital: 'Mount Sinai',
    location: 'New York, NY',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 20,
    lastActive: '1 hour ago',
    status: 'online'
  }
];

// Mock data for potential connections
const potentialConnections = [
  {
    id: 6,
    name: 'Dr. David Kim',
    specialty: 'Emergency Medicine',
    hospital: 'UCLA Medical Center',
    location: 'Los Angeles, CA',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 3,
    experience: '8 years',
    rating: 4.8,
    recentActivity: 'Posted about emergency protocols'
  },
  {
    id: 7,
    name: 'Dr. Maria Garcia',
    specialty: 'Oncology',
    hospital: 'MD Anderson',
    location: 'Houston, TX',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 7,
    experience: '12 years',
    rating: 4.9,
    recentActivity: 'Shared research findings'
  },
  {
    id: 8,
    name: 'Dr. Robert Taylor',
    specialty: 'Psychiatry',
    hospital: 'Mass General',
    location: 'Boston, MA',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 4,
    experience: '6 years',
    rating: 4.7,
    recentActivity: 'Published new study'
  },
  {
    id: 9,
    name: 'Dr. Jennifer Lee',
    specialty: 'Radiology',
    hospital: 'Stanford Health',
    location: 'Palo Alto, CA',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 9,
    experience: '10 years',
    rating: 4.6,
    recentActivity: 'Contributed to diagnostic guidelines'
  },
  {
    id: 10,
    name: 'Dr. Ahmed Hassan',
    specialty: 'Internal Medicine',
    hospital: 'Cedars-Sinai',
    location: 'Los Angeles, CA',
    avatar: '/api/placeholder/60/60',
    verified: true,
    mutualConnections: 5,
    experience: '7 years',
    rating: 4.8,
    recentActivity: 'Joined ClarityMD community'
  }
];

const ConnectionCard = ({ doctor, isCurrent = false }: { doctor: any, isCurrent?: boolean }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={doctor.avatar} alt={doctor.name} />
              <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {isCurrent && (
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                doctor.status === 'online' ? 'bg-green-500' : 
                doctor.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{doctor.name}</h3>
              {doctor.verified && (
                <CheckCircle className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <p className="text-sm font-medium text-blue-600">{doctor.specialty}</p>
            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
              <MapPin className="h-3 w-3" />
              <span>{doctor.hospital}, {doctor.location}</span>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{doctor.mutualConnections} mutual connections</span>
              {isCurrent ? (
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Last active {doctor.lastActive}</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{doctor.rating} ({doctor.experience})</span>
                </span>
              )}
            </div>
            {!isCurrent && (
              <p className="text-xs text-gray-500 mt-1">{doctor.recentActivity}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isCurrent ? (
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>Message</span>
            </Button>
          ) : (
            <Button size="sm" className="flex items-center space-x-1">
              <UserPlus className="h-4 w-4" />
              <span>Connect</span>
            </Button>
          )}
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Network() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#3a54e8] border-b border-[#2d42c7] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold text-white">ClarityMD Connect</span>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm">Network</Badge>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white hover:bg-white/10 hover:text-white transition-all duration-200">
                <Users className="h-4 w-4" />
                <span>Network</span>
              </Button>
              <Link to="/messages">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </Button>
              </Link>
              <Link to="/saved">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <Bookmark className="h-4 w-4" />
                  <span>Saved</span>
                </Button>
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Link to="/verify">
                <Button size="sm" className="bg-white text-[#3a54e8] hover:bg-white/90">
                  Verify as a Doctor
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="relative text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full border border-white"></div>
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Network</h1>
          <p className="text-gray-600">Connect with healthcare professionals and expand your network</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search doctors by name, specialty, or hospital..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Current Connections ({currentConnections.length})</span>
            </TabsTrigger>
            <TabsTrigger value="potential" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Suggested Connections ({potentialConnections.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Current Connections Tab */}
          <TabsContent value="current" className="space-y-6">
            <div className="grid gap-6">
              {currentConnections.map((doctor) => (
                <ConnectionCard key={doctor.id} doctor={doctor} isCurrent={true} />
              ))}
            </div>
          </TabsContent>

          {/* Potential Connections Tab */}
          <TabsContent value="potential" className="space-y-6">
            <div className="grid gap-6">
              {potentialConnections.map((doctor) => (
                <ConnectionCard key={doctor.id} doctor={doctor} isCurrent={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{currentConnections.length}</div>
              <p className="text-xs text-gray-500">+2 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Mutual Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {currentConnections.reduce((sum, doc) => sum + doc.mutualConnections, 0)}
              </div>
              <p className="text-xs text-gray-500">Across your network</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Online Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {currentConnections.filter(doc => doc.status === 'online').length}
              </div>
              <p className="text-xs text-gray-500">Available for chat</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

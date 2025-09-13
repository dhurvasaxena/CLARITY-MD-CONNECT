import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Link, useParams } from 'react-router-dom';
import {
  Bell,
  MessageSquare,
  Home,
  Users,
  Bookmark,
  Settings,
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Stethoscope,
  Star,
  MessageCircle,
  Phone,
  Video,
  Clock,
  Heart,
  Share2
} from 'lucide-react';

// Mock data for practitioner profiles (e.g., nurses, PAs, NPs)
const practitionerProfiles: Record<string, any> = {
  'nurse-rishabh-koul': {
    id: 'nurse-rishabh-koul',
    name: 'Nurse Practitioner Rishabh Koul',
    title: 'Family Medicine | Community Health',
    role: 'Nurse Practitioner',
    specialty: 'Family Medicine',
    organization: 'Community Health Clinic',
    location: 'New Delhi, India',
    avatar: '/api/placeholder/120/120',
    verified: true,
    rating: 4.7,
    reviewCount: 64,
    experience: '9 years',
    education: 'MSN, All India Institute of Medical Sciences',
    certifications: ['Board Certified Family Nurse Practitioner', 'BLS/ACLS Certified'],
    languages: ['English', 'Hindi'],
    bio: 'Rishabh is a Family Nurse Practitioner focused on preventive care and community health programs. Passionate about improving access to care and simplifying medical education for patients.',
    achievements: [
      'Led vaccination drives across three districts',
      'Developed patient education workshops for chronic diseases',
      'Co-authored community health best-practices guide'
    ],
    recentPosts: [
      {
        id: 1,
        content: 'Excited to announce our clinic\'s partnership with ClarityMD for simplified medical documents. Patient engagement is improving every week.',
        timestamp: '8h ago',
        likes: 156,
        comments: 34,
        tags: ['Partnership', 'CommunityHealth', 'PatientEmpowerment']
      }
    ],
    availability: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 4:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  }
};

const PostCard = ({ post }: { post: any }) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <p className="text-gray-800 mb-3">{post.content}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map((tag: string, index: number) => (
          <Badge key={index} variant="secondary" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Heart className="h-3 w-3" />
            <span>{post.likes}</span>
          </span>
          <span className="flex items-center space-x-1">
            <MessageCircle className="h-3 w-3" />
            <span>{post.comments}</span>
          </span>
        </div>
        <span className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{post.timestamp}</span>
        </span>
      </div>
    </CardContent>
  </Card>
);

export default function PractitionerProfile() {
  const { practitionerId } = useParams<{ practitionerId: string }>();
  const practitioner = practitionerId ? practitionerProfiles[practitionerId as keyof typeof practitionerProfiles] : null;

  if (!practitioner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Practitioner Not Found</h1>
          <p className="text-gray-600 mb-6">The practitioner profile you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#3a54e8] border-b border-[#2d42c7] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold text-white">ClarityMD Connect</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Button>
              </Link>
              <Link to="/network">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200">
                  <Users className="h-4 w-4" />
                  <span>Network</span>
                </Button>
              </Link>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Practitioner Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={practitioner.avatar} alt={practitioner.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">
                      {practitioner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{practitioner.name}</h1>
                  <p className="text-purple-700 font-medium mb-2">{practitioner.title}</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{practitioner.rating}</span>
                    </div>
                    <span className="text-gray-500">({practitioner.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{practitioner.organization}, {practitioner.location}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Send Message</span>
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Video className="h-4 w-4" />
                      <span>Video</span>
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                    <p className="text-sm text-gray-600">{practitioner.experience}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                    <p className="text-sm text-gray-600">{practitioner.education}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-1">
                      {practitioner.languages.map((lang: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Stethoscope className="h-5 w-5" />
                      <span>About {practitioner.role}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{practitioner.bio}</p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <Award className="h-4 w-4" />
                          <span>Certifications</span>
                        </h3>
                        <ul className="space-y-1">
                          {practitioner.certifications.map((cert: string, index: number) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <div className="h-1 w-1 bg-purple-500 rounded-full"></div>
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Posts Tab */}
              <TabsContent value="posts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {practitioner.recentPosts.length > 0 ? (
                      <div className="space-y-4">
                        {practitioner.recentPosts.map((post: any) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No recent posts</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Availability</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(practitioner.availability).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium capitalize">{day}</span>
                          <span className="text-gray-600">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

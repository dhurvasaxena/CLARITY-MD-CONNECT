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
  Mail,
  ExternalLink,
  Clock,
  Heart,
  Share2
} from 'lucide-react';

// Mock data for doctor profiles
const doctorProfiles = {
  'dr-dhurva-saxena': {
    id: 'dr-dhurva-saxena',
    name: 'Dr. Dhurva Saxena',
    title: 'Cardiologist | Heart Health Specialist',
    specialty: 'Cardiology',
    hospital: 'Mayo Clinic',
    location: 'Rochester, MN',
    avatar: '/api/placeholder/120/120',
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    experience: '12 years',
    education: 'MD, Harvard Medical School',
    certifications: ['Board Certified Cardiologist', 'Fellow of American College of Cardiology'],
    languages: ['English', 'Hindi', 'Spanish'],
    bio: 'Dr. Dhurva Saxena is a board-certified cardiologist with over 12 years of experience in treating heart conditions. He specializes in interventional cardiology and has performed over 2,000 cardiac procedures. Dr. Saxena is passionate about using technology to improve patient care and communication.',
    achievements: [
      'Published 45+ research papers in cardiology journals',
      'Recipient of the American Heart Association Excellence Award',
      'Led clinical trials for innovative heart treatments',
      'Mentor to 20+ medical residents and fellows'
    ],
    recentPosts: [
      {
        id: 1,
        content: 'Just completed my first 50 patient consultations using ClarityMD\'s document translation feature. The impact on patient understanding has been remarkable.',
        timestamp: '3h ago',
        likes: 47,
        comments: 12,
        tags: ['ClarityMD', 'PatientCare', 'HealthTech']
      },
      {
        id: 2,
        content: 'New research shows that early intervention in heart disease can reduce mortality by 40%. Early detection is key to better outcomes.',
        timestamp: '1d ago',
        likes: 89,
        comments: 23,
        tags: ['Research', 'HeartDisease', 'Prevention']
      }
    ],
    availability: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 3:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  },
  'dr-pranjal-sethi': {
    id: 'dr-pranjal-sethi',
    name: 'Dr. Pranjal Sethi',
    title: 'Emergency Medicine | Patient Advocate',
    specialty: 'Emergency Medicine',
    hospital: 'Johns Hopkins',
    location: 'Baltimore, MD',
    avatar: '/api/placeholder/120/120',
    verified: true,
    rating: 4.8,
    reviewCount: 89,
    experience: '8 years',
    education: 'MD, Johns Hopkins University',
    certifications: ['Board Certified Emergency Medicine', 'Fellow of American College of Emergency Physicians'],
    languages: ['English', 'Hindi', 'French'],
    bio: 'Dr. Pranjal Sethi is an emergency medicine physician dedicated to improving patient outcomes in critical care settings. She has extensive experience in trauma care and emergency procedures, with a focus on patient communication and family support during medical crises.',
    achievements: [
      'Developed emergency protocols adopted by 15+ hospitals',
      'Author of "Emergency Medicine Best Practices" guide',
      'Trained 100+ emergency medicine residents',
      'Led disaster response teams in 3 major incidents'
    ],
    recentPosts: [
      {
        id: 3,
        content: 'Sharing insights from our latest study on patient communication barriers. We found that 73% of patients leave appointments without fully understanding their diagnosis.',
        timestamp: '5h ago',
        likes: 89,
        comments: 23,
        tags: ['Research', 'PatientEducation', 'Communication']
      }
    ],
    availability: {
      monday: '7:00 AM - 7:00 PM',
      tuesday: '7:00 AM - 7:00 PM',
      wednesday: '7:00 AM - 7:00 PM',
      thursday: '7:00 AM - 7:00 PM',
      friday: '7:00 AM - 7:00 PM',
      saturday: '7:00 AM - 7:00 PM',
      sunday: '7:00 AM - 7:00 PM'
    }
  },
  'dr-mandeep-singh': {
    id: 'dr-mandeep-singh',
    name: 'Dr. Mandeep Singh',
    title: 'Pediatrician | Child Health Specialist',
    specialty: 'Pediatrics',
    hospital: 'Children\'s Hospital',
    location: 'Boston, MA',
    avatar: '/api/placeholder/120/120',
    verified: true,
    rating: 4.9,
    reviewCount: 156,
    experience: '15 years',
    education: 'MD, Boston University School of Medicine',
    certifications: ['Board Certified Pediatrician', 'Fellow of American Academy of Pediatrics'],
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Dr. Mandeep Singh is a dedicated pediatrician with 15 years of experience caring for children from infancy through adolescence. He specializes in developmental pediatrics and has a particular interest in helping parents understand their children\'s health needs.',
    achievements: [
      'Cared for over 10,000 children in his career',
      'Developed parent education programs used nationwide',
      'Published research on childhood development',
      'Volunteer pediatrician for underserved communities'
    ],
    recentPosts: [
      {
        id: 4,
        content: 'Question for the community: How do you explain complex pediatric conditions to parents? I\'ve been using ClarityMD to help translate medical reports.',
        timestamp: '12h ago',
        likes: 67,
        comments: 18,
        tags: ['Pediatrics', 'ParentEducation', 'BestPractices']
      }
    ],
    availability: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 4:00 PM',
      saturday: '9:00 AM - 2:00 PM',
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

export default function DoctorProfile() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const doctor = doctorId ? doctorProfiles[doctorId as keyof typeof doctorProfiles] : null;

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
          <p className="text-gray-600 mb-6">The doctor profile you're looking for doesn't exist.</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-blue-600 font-medium mb-2">{doctor.title}</p>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-500">({doctor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.hospital}, {doctor.location}</span>
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
                    <p className="text-sm text-gray-600">{doctor.experience}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                    <p className="text-sm text-gray-600">{doctor.education}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang, index) => (
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Stethoscope className="h-5 w-5" />
                      <span>About Dr. {doctor.name.split(' ')[1]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{doctor.bio}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <Award className="h-4 w-4" />
                          <span>Certifications</span>
                        </h3>
                        <ul className="space-y-1">
                          {doctor.certifications.map((cert, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <div className="h-1 w-1 bg-blue-500 rounded-full"></div>
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4" />
                          <span>Key Achievements</span>
                        </h3>
                        <ul className="space-y-2">
                          {doctor.achievements.map((achievement, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                              <div className="h-1 w-1 bg-green-500 rounded-full mt-2"></div>
                              <span>{achievement}</span>
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
                    {doctor.recentPosts.length > 0 ? (
                      <div className="space-y-4">
                        {doctor.recentPosts.map((post) => (
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
                      {Object.entries(doctor.availability).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium capitalize">{day}</span>
                          <span className="text-gray-600">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews Coming Soon</h3>
                      <p className="text-gray-600">Patient reviews will be displayed here once available.</p>
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

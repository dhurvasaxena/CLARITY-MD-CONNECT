import CreatePost from '@/components/CreatePost';
import ForumPost from '@/components/ForumPost';
import UserProfile from '@/components/UserProfile';
import HealthTopics from '@/components/HealthTopics';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, Home, Users, Bookmark, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';


const forumPosts = [
  {
    author: {
      name: 'Dr. Dhurva Saxena',
      title: 'Cardiologist | Heart Health Specialist',
      avatar: '/api/placeholder/40/40',
      verified: true,
      type: 'doctor',
      id: 'dr-dhurva-saxena'
    },
    content: 'Just completed my first 50 patient consultations using ClarityMD\'s document translation feature. The impact on patient understanding has been remarkable. Patients are asking more informed questions and showing better treatment adherence. This is exactly what healthcare communication needed.',
    timestamp: '3h ago',
    likes: 47,
    comments: 12,
    tags: ['ClarityMD', 'PatientCare', 'HealthTech']
  },
  {
    author: {
      name: 'Sarah M.',
      title: 'Patient | Looking for Advice',
      avatar: '/api/placeholder/40/40',
      verified: false,
      type: 'patient'
    },
    content: 'Hi doctors, I recently received my lab results and I\'m having trouble understanding what my cholesterol levels mean. My doctor mentioned something about LDL and HDL, but I\'m confused about the numbers. Can someone help explain this in simple terms? I\'m 45 and trying to take better care of my health.',
    timestamp: '2h ago',
    likes: 23,
    comments: 8,
    tags: ['Cholesterol', 'LabResults', 'PatientQuestion']
  },
  {
    author: {
      name: 'Dr. Pranjal Sethi',
      title: 'Emergency Medicine | Patient Advocate',
      avatar: '/api/placeholder/40/40',
      verified: true,
      type: 'doctor',
      id: 'dr-pranjal-sethi'
    },
    content: 'Sharing insights from our latest study on patient communication barriers. We found that 73% of patients leave appointments without fully understanding their diagnosis. Tools like ClarityMD are crucial for bridging this gap. What strategies do you use in your practice?',
    timestamp: '5h ago',
    likes: 89,
    comments: 23,
    tags: ['Research', 'PatientEducation', 'Communication']
  },
  {
    author: {
      name: 'Michael R.',
      title: 'Patient | Parent Seeking Help',
      avatar: '/api/placeholder/40/40',
      verified: false,
      type: 'patient'
    },
    content: 'My 8-year-old daughter has been having frequent headaches for the past month. Our pediatrician ordered some tests but we won\'t get results for another week. I\'m worried and wondering if there are any warning signs I should watch for. Any advice from pediatric specialists would be greatly appreciated.',
    timestamp: '6h ago',
    likes: 15,
    comments: 12,
    tags: ['Pediatrics', 'Headaches', 'ParentConcern']
  },
  {
    author: {
      name: 'Nurse Practitioner Rishabh Koul',
      title: 'Family Medicine | Community Health',
      avatar: '/api/placeholder/40/40',
      verified: true,
      type: 'nurse',
      id: 'nurse-rishabh-koul'
    },
    content: 'Excited to announce our clinic\'s partnership with ClarityMD! We\'re now providing simplified medical document explanations to all our patients. The feedback has been overwhelmingly positive. Patients feel more empowered and engaged in their care.',
    timestamp: '8h ago',
    likes: 156,
    comments: 34,
    tags: ['Partnership', 'CommunityHealth', 'PatientEmpowerment']
  },
  {
    author: {
      name: 'Jennifer L.',
      title: 'Patient | Diabetes Management',
      avatar: '/api/placeholder/40/40',
      verified: false,
      type: 'patient'
    },
    content: 'I was recently diagnosed with Type 2 diabetes and I\'m feeling overwhelmed with all the information. My doctor gave me a lot of instructions about diet and medication, but I\'m struggling to understand what I can and can\'t eat. Are there any resources or tips that have helped other patients manage this condition?',
    timestamp: '10h ago',
    likes: 31,
    comments: 15,
    tags: ['Diabetes', 'PatientSupport', 'Lifestyle']
  },
  {
    author: {
      name: 'Dr. Mandeep Singh',
      title: 'Pediatrician | Child Health Specialist',
      avatar: '/api/placeholder/40/40',
      verified: true,
      type: 'doctor',
      id: 'dr-mandeep-singh'
    },
    content: 'Question for the community: How do you explain complex pediatric conditions to parents? I\'ve been using ClarityMD to help translate medical reports, and it\'s been a game-changer for parent-doctor communication. Would love to hear your approaches!',
    timestamp: '12h ago',
    likes: 67,
    comments: 18,
    tags: ['Pediatrics', 'ParentEducation', 'BestPractices']
  },
  {
    author: {
      name: 'Robert K.',
      title: 'Patient | Post-Surgery Recovery',
      avatar: '/api/placeholder/40/40',
      verified: false,
      type: 'patient'
    },
    content: 'I had knee replacement surgery 3 weeks ago and I\'m following my physical therapy plan, but I\'m concerned about the swelling and stiffness. Is this normal for this stage of recovery? When should I be worried? My surgeon mentioned it could take 6-8 weeks to see significant improvement.',
    timestamp: '1d ago',
    likes: 19,
    comments: 9,
    tags: ['Orthopedics', 'Recovery', 'PhysicalTherapy']
  }
];

export default function Index() {
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
              <Badge className="bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm">Forum</Badge>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white hover:bg-white/10 hover:text-white transition-all duration-200">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <UserProfile />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            <SearchBar />
            <CreatePost />
            
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Healthcare Discussions</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
                  Most Recent
                </Button>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-0">
              {forumPosts.map((post, index) => (
                <ForumPost key={index} {...post as any} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Discussions
              </Button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <HealthTopics />
          </div>
        </div>
      </main>
    </div>
  );
}
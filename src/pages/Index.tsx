import CreatePost from '@/components/CreatePost';
import ForumPost from '@/components/ForumPost';
import UserProfile from '@/components/UserProfile';
import HealthTopics from '@/components/HealthTopics';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, Home, Users, Bookmark, Settings } from 'lucide-react';


const forumPosts = [
  {
    author: {
      name: 'Dr. Dhurva Saxena',
      title: 'Cardiologist | Heart Health Specialist',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    content: 'Just completed my first 50 patient consultations using ClarityMD\'s document translation feature. The impact on patient understanding has been remarkable. Patients are asking more informed questions and showing better treatment adherence. This is exactly what healthcare communication needed.',
    timestamp: '3h ago',
    likes: 47,
    comments: 12,
    tags: ['ClarityMD', 'PatientCare', 'HealthTech']
  },
  {
    author: {
      name: 'Dr. Pranjal Sethi',
      title: 'Emergency Medicine | Patient Advocate',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    content: 'Sharing insights from our latest study on patient communication barriers. We found that 73% of patients leave appointments without fully understanding their diagnosis. Tools like ClarityMD are crucial for bridging this gap. What strategies do you use in your practice?',
    timestamp: '5h ago',
    likes: 89,
    comments: 23,
    tags: ['Research', 'PatientEducation', 'Communication']
  },
  {
    author: {
      name: 'Nurse Practitioner Rishabh Koul',
      title: 'Family Medicine | Community Health',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    content: 'Excited to announce our clinic\'s partnership with ClarityMD! We\'re now providing simplified medical document explanations to all our patients. The feedback has been overwhelmingly positive. Patients feel more empowered and engaged in their care.',
    timestamp: '8h ago',
    likes: 156,
    comments: 34,
    tags: ['Partnership', 'CommunityHealth', 'PatientEmpowerment']
  },
  {
    author: {
      name: 'Dr. Mandeep Singh',
      title: 'Pediatrician | Child Health Specialist',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    content: 'Question for the community: How do you explain complex pediatric conditions to parents? I\'ve been using ClarityMD to help translate medical reports, and it\'s been a game-changer for parent-doctor communication. Would love to hear your approaches!',
    timestamp: '12h ago',
    likes: 67,
    comments: 18,
    tags: ['Pediatrics', 'ParentEducation', 'BestPractices']
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ClarityMD Connect</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700 text-xs">Forum</Badge>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-blue-600">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Users className="h-4 w-4" />
                <span>Network</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Bookmark className="h-4 w-4" />
                <span>Saved</span>
              </Button>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5 text-gray-600" />
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
                <ForumPost key={index} {...post} />
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
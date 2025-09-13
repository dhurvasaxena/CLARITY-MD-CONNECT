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
  Heart,
  Share2,
  MessageCircle,
  MoreHorizontal,
  Calendar,
  Tag,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';

// Mock data for saved posts
const savedPosts = [
  {
    id: 1,
    author: {
      name: 'Dr. Sarah Johnson',
      title: 'Cardiologist | Heart Health Specialist',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    content: 'Just completed my first 50 patient consultations using ClarityMD\'s document translation feature. The impact on patient understanding has been remarkable. Patients are asking more informed questions and showing better treatment adherence. This is exactly what healthcare communication needed.',
    timestamp: '3h ago',
    likes: 47,
    comments: 12,
    tags: ['ClarityMD', 'PatientCare', 'HealthTech'],
    savedAt: '2h ago',
    category: 'Forum Post'
  },
  {
    id: 2,
    author: {
      name: 'Dr. Michael Chen',
      title: 'Emergency Medicine | Patient Advocate',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    content: 'Sharing insights from our latest study on patient communication barriers. We found that 73% of patients leave appointments without fully understanding their diagnosis. Tools like ClarityMD are crucial for bridging this gap. What strategies do you use in your practice?',
    timestamp: '5h ago',
    likes: 89,
    comments: 23,
    tags: ['Research', 'PatientEducation', 'Communication'],
    savedAt: '4h ago',
    category: 'Research'
  },
  {
    id: 3,
    author: {
      name: 'Dr. Emily Rodriguez',
      title: 'Pediatrician | Child Health Specialist',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    content: 'Question for the community: How do you explain complex pediatric conditions to parents? I\'ve been using ClarityMD to help translate medical reports, and it\'s been a game-changer for parent-doctor communication. Would love to hear your approaches!',
    timestamp: '12h ago',
    likes: 67,
    comments: 18,
    tags: ['Pediatrics', 'ParentEducation', 'BestPractices'],
    savedAt: '10h ago',
    category: 'Discussion'
  }
];

// Mock data for saved articles/resources
const savedResources = [
  {
    id: 4,
    title: 'Best Practices for Patient Communication in Digital Health',
    author: 'Dr. Lisa Thompson',
    source: 'Medical Journal of Digital Health',
    url: '#',
    excerpt: 'A comprehensive guide on improving patient communication through digital health tools and platforms.',
    savedAt: '1d ago',
    category: 'Article',
    tags: ['Digital Health', 'Communication', 'Best Practices']
  },
  {
    id: 5,
    title: 'ClarityMD Implementation Guide for Healthcare Providers',
    author: 'ClarityMD Team',
    source: 'ClarityMD Documentation',
    url: '#',
    excerpt: 'Step-by-step guide for healthcare providers to implement ClarityMD in their practice.',
    savedAt: '2d ago',
    category: 'Guide',
    tags: ['ClarityMD', 'Implementation', 'Guide']
  },
  {
    id: 6,
    title: 'Patient Engagement Strategies in Modern Healthcare',
    author: 'Dr. James Wilson',
    source: 'Healthcare Innovation Review',
    url: '#',
    excerpt: 'Exploring innovative strategies to improve patient engagement and health outcomes.',
    savedAt: '3d ago',
    category: 'Research',
    tags: ['Patient Engagement', 'Innovation', 'Healthcare']
  }
];

const SavedPostCard = ({ post }: { post: any }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-sm font-semibold text-gray-900">{post.author.name}</h3>
            {post.author.verified && (
              <Badge className="bg-blue-100 text-blue-700 text-xs">Verified</Badge>
            )}
            <Badge variant="outline" className="text-xs">{post.category}</Badge>
          </div>
          <p className="text-xs text-gray-600 mb-2">{post.author.title}</p>
          <p className="text-sm text-gray-800 mb-3">{post.content}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{post.likes}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>{post.comments}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Posted {post.timestamp}</span>
              </span>
            </div>
            <span className="text-green-600 font-medium">Saved {post.savedAt}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
            <Bookmark className="h-4 w-4 fill-current" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SavedResourceCard = ({ resource }: { resource: any }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
            <Badge variant="outline" className="text-xs">{resource.category}</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">By {resource.author} • {resource.source}</p>
          <p className="text-sm text-gray-700 mb-3">{resource.excerpt}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="text-green-600 font-medium">Saved {resource.savedAt}</span>
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              View Source
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
            <Bookmark className="h-4 w-4 fill-current" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Saved() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = savedPosts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredResources = savedResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <Badge className="bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm">Saved</Badge>
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
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white hover:bg-white/10 hover:text-white transition-all duration-200">
                <Bookmark className="h-4 w-4" />
                <span>Saved</span>
              </Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Items</h1>
          <p className="text-gray-600">Your collection of saved posts, articles, and resources</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search saved items..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Saved Posts ({savedPosts.length})</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span>Saved Resources ({savedResources.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Saved Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6">
                {filteredPosts.map((post) => (
                  <SavedPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved posts found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'Try adjusting your search terms' : 'Start saving posts you find interesting'}
                </p>
                {!searchQuery && (
                  <Link to="/">
                    <Button>Browse Posts</Button>
                  </Link>
                )}
              </Card>
            )}
          </TabsContent>

          {/* Saved Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            {filteredResources.length > 0 ? (
              <div className="grid gap-6">
                {filteredResources.map((resource) => (
                  <SavedResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved resources found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'Try adjusting your search terms' : 'Start saving articles and resources you find useful'}
                </p>
                {!searchQuery && (
                  <Link to="/">
                    <Button>Browse Content</Button>
                  </Link>
                )}
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{savedPosts.length + savedResources.length}</div>
              <p className="text-xs text-gray-500">Items saved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saved Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{savedPosts.length}</div>
              <p className="text-xs text-gray-500">Forum discussions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saved Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{savedResources.length}</div>
              <p className="text-xs text-gray-500">Articles & guides</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

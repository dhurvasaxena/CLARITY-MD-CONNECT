import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  Home, 
  Users, 
  Bookmark, 
  Settings, 
  Search, 
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';
import { useState } from 'react';

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'Thanks for sharing that research paper. Very insightful!',
    timestamp: '2m ago',
    unread: 2,
    online: true,
    verified: true
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'The patient case you mentioned is quite interesting...',
    timestamp: '1h ago',
    unread: 0,
    online: false,
    verified: true
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'Can we schedule a call to discuss the new protocols?',
    timestamp: '3h ago',
    unread: 1,
    online: true,
    verified: true
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'I\'ll send you the X-ray images shortly.',
    timestamp: '1d ago',
    unread: 0,
    online: false,
    verified: true
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Dermatology',
    avatar: '/api/placeholder/40/40',
    lastMessage: 'The conference was amazing! We should collaborate on a project.',
    timestamp: '2d ago',
    unread: 0,
    online: true,
    verified: true
  }
];

// Mock data for messages
const messages = [
  {
    id: 1,
    senderId: 1,
    content: 'Hi! I wanted to discuss the patient case we talked about yesterday.',
    timestamp: '10:30 AM',
    status: 'read'
  },
  {
    id: 2,
    senderId: 0, // Current user
    content: 'Of course! I\'ve been reviewing the test results. What are your thoughts on the treatment approach?',
    timestamp: '10:32 AM',
    status: 'read'
  },
  {
    id: 3,
    senderId: 1,
    content: 'I think we should consider the conservative approach first, given the patient\'s age and medical history.',
    timestamp: '10:35 AM',
    status: 'read'
  },
  {
    id: 4,
    senderId: 0,
    content: 'I agree. The patient seems to be responding well to the current medication. Should we schedule a follow-up in two weeks?',
    timestamp: '10:37 AM',
    status: 'read'
  },
  {
    id: 5,
    senderId: 1,
    content: 'That sounds perfect. I\'ll coordinate with the patient\'s family and let you know.',
    timestamp: '10:40 AM',
    status: 'read'
  },
  {
    id: 6,
    senderId: 1,
    content: 'Thanks for sharing that research paper. Very insightful!',
    timestamp: '2m ago',
    status: 'delivered'
  }
];

const ConversationItem = ({ conversation, isActive, onClick }: { conversation: any, isActive: boolean, onClick: () => void }) => (
  <div 
    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-start space-x-3">
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        {conversation.online && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{conversation.name}</h3>
            {conversation.verified && (
              <Check className="h-3 w-3 text-blue-500" />
            )}
          </div>
          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
        </div>
        <p className="text-xs text-blue-600 font-medium">{conversation.specialty}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
          {conversation.unread > 0 && (
            <Badge className="bg-blue-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
              {conversation.unread}
            </Badge>
          )}
        </div>
      </div>
    </div>
  </div>
);

const MessageBubble = ({ message, isOwn }: { message: any, isOwn: boolean }) => (
  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
      isOwn 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-100 text-gray-900'
    }`}>
      <p className="text-sm">{message.content}</p>
      <div className={`flex items-center justify-end space-x-1 mt-1 ${
        isOwn ? 'text-blue-100' : 'text-gray-500'
      }`}>
        <span className="text-xs">{message.timestamp}</span>
        {isOwn && (
          <div className="flex items-center">
            {message.status === 'read' ? (
              <CheckCheck className="h-3 w-3" />
            ) : message.status === 'delivered' ? (
              <Check className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
              <Badge className="bg-white/20 text-white border-white/30 text-xs backdrop-blur-sm">Messages</Badge>
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
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white hover:bg-white/10 hover:text-white transition-all duration-200">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Badge className="bg-blue-100 text-blue-700">
                    {conversations.filter(c => c.unread > 0).length}
                  </Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search conversations..." 
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  {conversations.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isActive={selectedConversation.id === conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                    />
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                        <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                        {selectedConversation.verified && (
                          <Check className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-blue-600">{selectedConversation.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-24rem)] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={message.senderId === 0}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal, Clock, Bookmark } from 'lucide-react';

interface ForumPostProps {
  author: {
    name: string;
    title: string;
    avatar?: string;
    verified?: boolean;
    type?: 'doctor' | 'patient' | 'nurse';
    id?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags?: string[];
  image?: string;
}

export default function ForumPost({ author, content, timestamp, likes, comments, tags, image }: ForumPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would save/unsave the post to the backend
    console.log(isSaved ? 'Post unsaved' : 'Post saved');
  };

  return (
    <Card className={`mb-6 hover:shadow-md transition-shadow ${
      author.type === 'patient' ? 'border-l-4 border-l-green-400 bg-green-50/30' : ''
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            {author.type === 'doctor' && author.id ? (
              <Link to={`/doctor/${author.id}`}>
                <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                  <AvatarImage src={author.avatar || "/api/placeholder/40/40"} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : author.type === 'nurse' && author.id ? (
              <Link to={`/practitioner/${author.id}`}>
                <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
                  <AvatarImage src={author.avatar || "/api/placeholder/40/40"} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Avatar className="h-12 w-12">
                <AvatarImage src={author.avatar || "/api/placeholder/40/40"} />
                <AvatarFallback className={
                  author.type === 'patient' ? 'bg-green-100 text-green-600' :
                  author.type === 'nurse' ? 'bg-purple-100 text-purple-600' :
                  'bg-blue-100 text-blue-600'
                }>
                  {author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <div className="flex items-center space-x-2">
                {author.type === 'doctor' && author.id ? (
                  <Link to={`/doctor/${author.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                      {author.name}
                    </h3>
                  </Link>
                ) : author.type === 'nurse' && author.id ? (
                  <Link to={`/practitioner/${author.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                      {author.name}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="font-semibold text-gray-900">{author.name}</h3>
                )}
                {author.verified && (
                  <div className="h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                )}
                {author.type === 'patient' && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Patient
                  </Badge>
                )}
                {author.type === 'nurse' && (
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                    Nurse
                  </Badge>
                )}
                {author.type === 'doctor' && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    Doctor
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{author.title}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3" />
                <span>{timestamp}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-4">
          {author.type === 'patient' && (
            <div className="mb-3 p-3 bg-green-100 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Patient seeking medical advice</span>
              </div>
            </div>
          )}
          <p className="text-gray-800 leading-relaxed mb-3">{content}</p>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Image */}
          {image && (
            <div className="rounded-lg overflow-hidden">
              <img src={image} alt="Post content" className="w-full h-auto" />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-600'} hover:text-red-500`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-green-500">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`flex items-center space-x-2 ${isSaved ? 'text-orange-500' : 'text-gray-600'} hover:text-orange-500`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, MessageSquare } from 'lucide-react';

const topics = [
  { name: 'Cardiology', posts: 245, trending: true },
  { name: 'Mental Health', posts: 189, trending: true },
  { name: 'Pediatrics', posts: 156, trending: false },
  { name: 'Diabetes Care', posts: 134, trending: true },
  { name: 'Oncology', posts: 98, trending: false },
  { name: 'Nutrition', posts: 87, trending: false },
  { name: 'Telemedicine', posts: 76, trending: true },
  { name: 'Emergency Medicine', posts: 65, trending: false }
];

const recentDiscussions = [
  { title: 'New Treatment Guidelines for Hypertension', replies: 23, time: '2h ago' },
  { title: 'Patient Communication Best Practices', replies: 18, time: '4h ago' },
  { title: 'Digital Health Tools in Practice', replies: 15, time: '6h ago' },
  { title: 'Managing Chronic Pain Effectively', replies: 12, time: '8h ago' }
];

export default function HealthTopics() {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topics.slice(0, 6).map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
                    #{topic.name}
                  </span>
                  {topic.trending && (
                    <Badge variant="secondary" className="text-xs bg-orange-50 text-orange-600">
                      Trending
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">{topic.posts}</span>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-4 text-blue-600 hover:text-blue-700">
            View All Topics
          </Button>
        </CardContent>
      </Card>

      {/* Recent Discussions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
            Recent Discussions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDiscussions.map((discussion, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <h4 className="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2 mb-1">
                  {discussion.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <span>{discussion.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ClarityMD News */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-800">
            ClarityMD News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm">
              <h4 className="font-medium text-blue-800 mb-1">New AI Features Released</h4>
              <p className="text-blue-600 text-xs">Enhanced medical document analysis now available</p>
              <span className="text-blue-500 text-xs">1h ago • 156 readers</span>
            </div>
            <div className="text-sm">
              <h4 className="font-medium text-blue-800 mb-1">Community Milestone</h4>
              <p className="text-blue-600 text-xs">10,000+ healthcare professionals joined</p>
              <span className="text-blue-500 text-xs">1d ago • 289 readers</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-4 text-blue-600 hover:text-blue-700">
            Show More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
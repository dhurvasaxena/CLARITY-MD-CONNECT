import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Eye } from 'lucide-react';

export default function UserProfile() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="/api/placeholder/80/80" />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">DR</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-gray-900">Dr. Dhurva Saxena</h2>
          <p className="text-sm text-gray-600 mb-2">Cardiologist | Healthcare Advocate</p>
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span>New Delhi, India</span>
          </div>
          <Badge className="bg-green-100 text-green-700 text-xs">Verified Healthcare Professional</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Profile views</span>
            <div className="flex items-center text-blue-600 font-medium">
              <Eye className="h-4 w-4 mr-1" />
              <span>247</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Forum posts</span>
            <span className="text-blue-600 font-medium">42</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Connections</span>
            <div className="flex items-center text-blue-600 font-medium">
              <Users className="h-4 w-4 mr-1" />
              <span>1,234</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Member since</span>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Jan 2023</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex items-center space-x-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search discussions, topics, or healthcare professionals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border-gray-200 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button variant="outline" size="sm" className="flex items-center space-x-2 border-gray-200 hover:bg-gray-50">
        <Filter className="h-4 w-4" />
        <span>Filter</span>
      </Button>
    </div>
  );
}
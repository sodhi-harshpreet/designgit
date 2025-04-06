import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Search, Plus, Filter, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { Repository } from '@/types';

export function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'shared'>('all');

  // Mock data - replace with actual API call
  const repositories: Repository[] = [
    {
      id: '1',
      name: 'Brand Guidelines',
      lastUpdated: new Date('2024-03-10'),
      versionsCount: 12,
      isShared: false
    },
    {
      id: '2',
      name: 'Website Icons',
      lastUpdated: new Date('2024-03-15'),
      versionsCount: 8,
      isShared: true
    },
    {
      id: '3',
      name: 'Logo Variations',
      lastUpdated: new Date('2024-03-18'),
      versionsCount: 5,
      isShared: false
    }
  ];

  const filteredRepos = repositories
    .filter(repo => filter === 'all' || (filter === 'shared' && repo.isShared))
    .filter(repo => 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-xl font-semibold text-slate-900">DesignGit</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Repository
              </Button>
              <div className="h-8 w-8 rounded-full bg-slate-200"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'shared' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('shared')}
            >
              Shared with me
            </Button>
          </div>
        </div>

        {/* Repository Grid */}
        {filteredRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <Link
                key={repo.id}
                to={`/repositories/${repo.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                      {repo.name}
                    </h3>
                    {repo.isShared && (
                      <Share2 className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(repo.lastUpdated)}
                    </div>
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-1" />
                      {repo.versionsCount} versions
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Code2 className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-900">No repositories found</h3>
            <p className="mt-2 text-slate-500">Get started by creating a new repository.</p>
            <Button variant="primary" size="lg" className="mt-6">
              <Plus className="h-5 w-5 mr-2" />
              Create Repository
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
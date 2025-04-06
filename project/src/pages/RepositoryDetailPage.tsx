import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GitFork, ArrowLeft, Download, Clock, MessageSquare, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { Version } from '@/types';

export function RepositoryDetailPage() {
  const { id } = useParams();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const versions: Version[] = [
    {
      id: 'v1',
      commitMessage: 'Updated primary logo colors',
      timestamp: new Date('2024-03-18T14:30:00'),
      previewUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
      downloadUrl: '#'
    },
    {
      id: 'v2',
      commitMessage: 'Added secondary logo variations',
      timestamp: new Date('2024-03-17T09:15:00'),
      previewUrl: 'https://images.unsplash.com/photo-1557683324-8665f3b4c9f7?w=400',
      downloadUrl: '#'
    },
    {
      id: 'v3',
      commitMessage: 'Initial logo design',
      timestamp: new Date('2024-03-16T11:45:00'),
      previewUrl: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400',
      downloadUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/repositories" className="flex items-center text-slate-500 hover:text-slate-700">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Repositories
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Share
              </Button>
              <div className="h-8 w-8 rounded-full bg-slate-200"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Repository Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <GitFork className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Logo Design</h1>
              <p className="text-slate-500">Repository ID: {id}</p>
            </div>
          </div>
          <Button variant="primary">
            <Plus className="h-5 w-5 mr-2" />
            Add Version
          </Button>
        </div>

        {/* Version History */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Version History</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {versions.map((version) => (
              <div
                key={version.id}
                className={`p-6 hover:bg-slate-50 transition-colors ${
                  selectedVersion === version.id ? 'bg-slate-50' : ''
                }`}
                onClick={() => setSelectedVersion(version.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-slate-900">{version.commitMessage}</h3>
                      <span className="text-sm text-slate-500">#{version.id}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(version.timestamp)}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(version.downloadUrl, '_blank');
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                {selectedVersion === version.id && (
                  <div className="mt-4">
                    <img
                      src={version.previewUrl}
                      alt={`Version ${version.id} preview`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
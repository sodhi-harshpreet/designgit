import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Github, FileCode2, Users, Download, ArrowRight } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-slate-50 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
              Version Control for Designers
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              Track, manage, and collaborate on your design files like GitHub—but for creatives.
              Built specifically for SVG version control and design collaboration.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Button size="lg" as={Link} to="/auth">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" as={Link} to="/auth?mode=login">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Feature
              icon={<FileCode2 className="h-8 w-8 text-indigo-600" />}
              title="Version Control"
              description="Track changes in your SVG files with detailed version history and visual diffs."
            />
            <Feature
              icon={<Users className="h-8 w-8 text-indigo-600" />}
              title="Team Collaboration"
              description="Share designs, review changes, and collaborate seamlessly with your team."
            />
            <Feature
              icon={<Download className="h-8 w-8 text-indigo-600" />}
              title="Instant Downloads"
              description="Download any version of your SVG files instantly, with full edit history."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DesignGit</h3>
              <p className="text-slate-400">Version control for designers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-indigo-400">About</Link></li>
                <li>
                  <a 
                    href="https://github.com/sodhi-harshpreet/designgit" 
                    className="hover:text-indigo-400 inline-flex items-center"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </li>
                <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
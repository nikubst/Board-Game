'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, EmptyState } from '@/components/ui/Card';
import { Inspiration } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { useTranslations } from '@/hooks/useTranslations';

// Mock inspiration data
const mockInspirations: Inspiration[] = [
  {
    id: '1',
    title: 'Minimalist Logo Design',
    category: 'Branding',
    image_url: '/images/inspiration-1.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Vibrant Color Palette',
    category: 'Color Theory',
    image_url: '/images/inspiration-2.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Modern Website Layout',
    category: 'Web Design',
    image_url: '/images/inspiration-3.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Typography Collection',
    category: 'Typography',
    image_url: '/images/inspiration-4.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Mobile App UI',
    category: 'UI/UX',
    image_url: '/images/inspiration-5.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Packaging Design',
    category: 'Product Design',
    image_url: '/images/inspiration-6.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Abstract Illustration',
    category: 'Illustration',
    image_url: '/images/inspiration-7.jpg',
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Photography Composition',
    category: 'Photography',
    image_url: '/images/inspiration-8.jpg',
    created_at: new Date().toISOString(),
  },
];

const categories = [
  'All',
  'Branding',
  'Web Design',
  'UI/UX',
  'Typography',
  'Color Theory',
  'Illustration',
  'Photography',
  'Product Design',
];

export default function InspirationsPage() {
  const { t } = useTranslations();
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('inspirations')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError || !data || data.length === 0) {
          setInspirations(mockInspirations);
        } else {
          setInspirations(data);
        }
      } catch (err) {
        console.error('Error fetching inspirations:', err);
        setInspirations(mockInspirations);
      } finally {
        setLoading(false);
      }
    };

    fetchInspirations();
  }, []);

  const filteredInspirations = inspirations.filter((inspiration) => {
    const matchesCategory = selectedCategory === 'All' || inspiration.category === selectedCategory;
    const matchesSearch = inspiration.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       inspiration.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (category: string) => {
    if (category === 'All') return inspirations.length;
    return inspirations.filter((i) => i.category === category).length;
  };

  const copyToClipboard = (inspiration: Inspiration) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`Inspiration: ${inspiration.title} (${inspiration.category})`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {t('inspirations', 'title')}
        </h1>
        <p className="text-slate-500">
          {t('inspirations', 'subtitle')}
        </p>
      </div>

      {/* Search and Filter */}
      <Card padding="md" className="animate-slide-up">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('ideas', 'searchIdeas')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-slate-500 mb-2">{t('ideas', 'filter')}</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All' ? t('ideas', 'all') : category} ({getCategoryCount(category)})
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Inspirations Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="animate-pulse aspect-square">
              <div className="w-full h-full bg-slate-200 rounded-lg"></div>
            </Card>
          ))}
        </div>
      ) : filteredInspirations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredInspirations.map((inspiration) => (
            <Card
              key={inspiration.id}
              className="group overflow-hidden cursor-pointer"
              hoverEffect
              onClick={() => copyToClipboard(inspiration)}
            >
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                {/* Placeholder image - in a real app, this would be the actual image */}
                <div
                  className="w-full h-full bg-slate-200"
                  style={{
                    background: getCategoryGradient(inspiration.category),
                  }}
                />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-slate-900/10 backdrop-blur-sm text-slate-900">
                    {inspiration.category}
                  </span>
                </div>

                {/* Copy button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(inspiration);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-slate-100 transition-colors shadow-sm"
                  title="Copy inspiration info"
                >
                  <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 truncate">{inspiration.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{inspiration.category}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Inspirations Found"
          description={`No inspirations found ${selectedCategory !== 'All' ? `in the ${selectedCategory} category` : ''}. Try a different category or search term.`}
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
      )}

      {/* Stats */}
      {inspirations.length > 0 && (
        <Card padding="md" className="text-center">
          <p className="text-slate-500">
            Showing {filteredInspirations.length} of {inspirations.length} inspirations
          </p>
        </Card>
      )}
    </div>
  );
}

// Helper function to generate category-specific gradients
function getCategoryGradient(category: string): string {
  const gradients = {
    'Branding': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'Web Design': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'UI/UX': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'Typography': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'Color Theory': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'Illustration': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'Photography': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'Product Design': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  };

  return gradients[category as keyof typeof gradients] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}
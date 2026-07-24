'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Lightbox } from '@/components/ui/Lightbox';
import { useTranslations } from '@/hooks/useTranslations';

export default function Home() {
  const { t } = useTranslations();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{src: string; title: string; desc: string} | null>(null);

  const openLightbox = (src: string, title: string, desc: string) => {
    setSelectedImage({ src, title, desc });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: t('featureCards', 'creativeConcepts.title'),
      description: t('featureCards', 'creativeConcepts.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('featureCards', 'projectManagement.title'),
      description: t('featureCards', 'projectManagement.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: t('featureCards', 'colorSystems.title'),
      description: t('featureCards', 'colorSystems.description'),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: t('featureCards', 'designGallery.title'),
      description: t('featureCards', 'designGallery.description'),
    },
  ];

  const stats = [
    { number: '150+', label: t('stats', 'completedProjects') },
    { number: '50+', label: t('stats', 'satisfiedClients') },
    { number: '300+', label: t('stats', 'colorSystems') },
    { number: '200+', label: t('stats', 'designPieces') },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.14),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_40%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-right">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                <span className="inline" dangerouslySetInnerHTML={{ __html: t('hero', 'tagline') }} />
              </div>

              <p className="mb-8 max-w-2xl text-lg text-slate-700 sm:text-xl">
                {t('hero', 'description')}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="#gallery">
                  <Button variant="primary" size="lg" className="text-lg">
                    {t('common', 'viewGallery')}
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" size="lg" className="text-lg">
                    {t('common', 'exploreStudio')}
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
                  <span className="block font-semibold text-slate-900">150+</span>
                  <span className="inline">{t('stats', 'completedProjects')}</span>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
                  <span className="block font-semibold text-slate-900">24/7</span>
                  <span className="inline">{t('stats', 'creativeCollaboration')}</span>
                </div>
              </div>
            </div>

            <Card className="border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_80px_-24px_rgba(15,23,42,0.35)] lg:p-8">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 p-6 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t('studioFocus', 'title')}</p>
                    <h3 className="mt-2 text-xl font-semibold">{t('studioFocus', 'thisMonth')}</h3>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-cyan-100">
                    3 {t('studioFocus', 'newConcepts')}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="font-semibold">{t('studioFocus', 'brandSystems')}</p>
                    <p className="mt-1 text-sm text-slate-200">{t('studioFocus', 'brandSystemsDesc')}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="font-semibold">{t('studioFocus', 'creativeCampaigns')}</p>
                    <p className="mt-1 text-sm text-slate-200">{t('studioFocus', 'creativeCampaignsDesc')}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="font-semibold">{t('studioFocus', 'digitalExperiences')}</p>
                    <p className="mt-1 text-sm text-slate-200">{t('studioFocus', 'digitalExperiencesDesc')}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="animate-slide-up p-6" style={{ animationDelay: `${index * 100}ms` }} hoverEffect>
                <div className="mb-4 text-cyan-500">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-200">
                  <span className="text-3xl sm:text-4xl font-bold text-slate-900">{stat.number}</span>
                </div>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm text-cyan-600">{t('features', 'title')}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t('features', 'title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              {t('features', 'subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: t('features', 'items.strategy.title'),
                text: t('features', 'items.strategy.text'),
              },
              {
                title: t('features', 'items.visual.title'),
                text: t('features', 'items.visual.text'),
              },
              {
                title: t('features', 'items.collaboration.title'),
                text: t('features', 'items.collaboration.text'),
              },
            ].map((item, index) => (
              <Card key={item.title} className="border-slate-200/80 bg-slate-50/80 p-8" hoverEffect>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                  <span className="text-lg font-semibold">0{index + 1}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-slate-100 border-t border-slate-200">
        <div className="section-container text-center">
          <p className="inline-block px-6 py-2.5 rounded-full bg-white shadow-sm text-cyan-600 text-sm font-medium mb-8 border border-slate-200">
            {t('common', 'letCollaborate')}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t('cta', 'title')}
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            {t('cta', 'description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="primary">
                {t('common', 'startYourProject')}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-lg">
                {t('common', 'viewOurWork')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Art Gallery Section */}
      <section id="gallery" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium border border-slate-200">
                {t('gallery', 'title')}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
                {t('gallery', 'subtitle')}
              </h2>
              <p className="mt-3 text-slate-600 max-w-xl">
                {t('gallery', 'description')}
              </p>
            </div>
            <p className="text-sm text-slate-500">
              {t('gallery', 'updated')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                src: '/gallery1.jpg',
                title: 'Dreamlines — Composition I',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery2.jpg',
                title: 'Ocean Bloom — Palette Study',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery3.jpg',
                title: 'Skyway — Motion Study',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery4.jpg',
                title: 'Citrus Echo — Warm Studies',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery5.jpg',
                title: 'Petal Drift — Soft Study',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery6.jpg',
                title: 'Neon Tides — Contrast Study',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery7.jpg',
                title: 'Amber Veil — Texture Play',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery8.jpg',
                title: 'Lavender Echo — Minimal Forms',
                artist: 'Public Domain',
                desc: 'Photograph of a public-domain painting from Wikimedia Commons.',
              },
              {
                src: '/gallery9.png',
                title: 'Graphic Study — Abstract Background',
                artist: 'Public Domain',
                desc: 'Graphic design background / vector rasterized from Wikimedia Commons.',
              },
              {
                src: '/gallery10.svg',
                title: 'Graphic Banner — Historic Motif',
                artist: 'Public Domain',
                desc: 'Scalable vector graphic sourced from Wikimedia Commons.',
              },
              {
                src: '/gallery11.png',
                title: 'Vector Swan — Illustration',
                artist: 'Public Domain',
                desc: 'High-resolution vector illustration exported as PNG for web.',
              },
              {
                src: '/gallery12.svg',
                title: 'Coat of Arms — Emblem',
                artist: 'Public Domain',
                desc: 'SVG emblem sourced from Wikimedia Commons (rendered inline).',
              },
            ].map((item) => (
              <div key={item.src} className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer" onClick={() => openLightbox(item.src, item.title, item.desc)}>
                <div className="relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{t('gallery', 'featuredStudy')}</p>
                    <p className="mt-1 font-medium">{item.artist}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          imageSrc={selectedImage.src}
          title={selectedImage.title}
          description={selectedImage.desc}
        />
      )}

      {/* Footer */}
      <footer className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="section-container">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-sky-200/80">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-600">
                NIKOO
              </span>
            </div>
            <p className="text-slate-600 mb-3">
              {t('footer', 'copyright').replace('{year}', new Date().getFullYear().toString())}
            </p>
            <p className="text-sm text-slate-500/80">
              {t('footer', 'description')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

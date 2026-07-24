'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function RegisterPage() {
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useTranslations();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError(t('auth', 'fillAllFields'));
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth', 'passwordsNotMatch'));
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t('auth', 'passwordTooShort'));
      setLoading(false);
      return;
    }

    try {
      const res = await register(formData.email, formData.password);
      if (res?.requiresConfirmation) {
        setSuccess('ثبت‌نام با موفقیت انجام شد! لینک تایید به ایمیل شما ارسال گردید. لطفاً ایمیل خود را بررسی کنید.');
      } else {
        setSuccess(t('auth', 'registrationSuccess'));
      }
    } catch (err: any) {
      setError(err.message || t('auth', 'registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('auth', 'backToHome')}
          </Link>
        </div>

        <Card padding="lg" className="bg-white/95 shadow-lg border border-slate-200">
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-cyan-500/25">
                <span className="text-2xl font-bold text-slate-900">{t('common', 'studioName')}</span>
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                {t('hero', 'title')}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900">{t('auth', 'createAccount')}</h1>
            <p className="text-slate-600 mt-2">
              {t('auth', 'joinStudio')}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-2xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-500 rounded-2xl">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('auth', 'email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('auth', 'emailPlaceholder')}
              required
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              hint={t('auth', 'emailHint')}
            />

            <Input
              label={t('auth', 'password')}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('auth', 'passwordPlaceholder')}
              required
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              hint={t('auth', 'passwordHint')}
            />

            <Input
              label={t('auth', 'confirmPassword')}
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('auth', 'passwordPlaceholder')}
              required
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              error={formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword ? t('auth', 'passwordsNotMatch') : undefined}
            />

            <div className="text-sm text-slate-600">
              {t('auth', 'termsAgreementRegister')}
            </div>

            <Button
              type="submit"
              isLoading={loading || authLoading}
              disabled={!formData.email || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
              fullWidth
              size="lg"
              variant="primary"
            >
              {t('auth', 'signUp')}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              {t('auth', 'alreadyHaveAccount')}
              <Link
                href="/auth/login"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                {t('auth', 'signIn')}
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              {t('auth', 'orSignUpWith')}
            </p>
            <div className="mt-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setError(t('auth', 'socialLoginComingSoon'))}
                disabled
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setError(t('auth', 'socialLoginComingSoon'))}
                disabled
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setError(t('auth', 'socialLoginComingSoon'))}
                disabled
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.173 4.71-1.277 1.277-2.852 2.004-4.71 2.173-.38.035-.747.035-1.127.035s-.747 0-1.127-.035c-1.858-.169-3.433-.896-4.71-2.173C2.596 11.593 1.869 10.018 1.7 8.16 1.665 7.78 1.665 7.413 1.7 7.033c.035-.38.035-.747.035-1.127s0-.747.035-1.127C1.869 4.266 2.596 2.691 3.863 1.414 5.14 0.137 6.715-.59 8.568-.758c.38-.035.747-.035 1.127-.035s.747 0 1.127.035c1.858.169 3.433.896 4.71 2.173 1.277 1.277 2.004 2.852 2.173 4.71.035.38.035.747.035 1.127s0 .747-.035 1.127zm-5.568 3.428c-1.623 0-2.948 1.325-2.948 2.948s1.325 2.948 2.948 2.948 2.948-1.325 2.948-2.948-1.325-2.948-2.948-2.948z" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6">
          {t('auth', 'termsAgreementRegister')}
        </p>
      </div>
    </div>
  );
}
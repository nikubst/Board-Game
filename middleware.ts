import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // For now, just pass through without Supabase auth check
  // This is a temporary workaround for Node.js 24 compatibility
  // In production, you would implement proper auth checks
  
  return res;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
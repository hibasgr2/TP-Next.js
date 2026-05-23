// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// export function middleware(request: NextRequest) {
// const session = request.cookies.get('session');

// // Si pas de cookie et route protégée → redirect login
// if (!session) {
// return NextResponse.redirect(new URL('/login', request.url));
// }
// return NextResponse.next();
// }
// // Quelles routes protéger :
// export const config = {
// matcher: ['/dashboard/:path*', '/projects/:path*'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const pathname = request.nextUrl.pathname;

  // Ne pas protéger ces routes
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Protéger le reste
  if (!session && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

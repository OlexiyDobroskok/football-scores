import { NextRequest, NextResponse } from 'next/server';

import { appSearchParams, defaultLeague } from '@shared/config/search-params';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const handleSearchParams = (request: NextRequest): NextResponse => {
  const searchParams = request.nextUrl.searchParams;
  const chosenLeague = searchParams.get(appSearchParams.LEAGUE);

  if (chosenLeague) {
    return NextResponse.next();
  }

  searchParams.set(appSearchParams.LEAGUE, defaultLeague);
  const pathname = request.nextUrl.pathname;
  const url = new URL(`${pathname}?${searchParams.toString()}`, request.url);
  return NextResponse.redirect(url);
};

export function middleware(request: NextRequest) {
  return handleSearchParams(request);
}

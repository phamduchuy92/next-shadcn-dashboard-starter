// Protecting routes with next-authentication
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

// export { default } from "next-authentication/middleware";
// export const config = { matcher: ["/admin/:path*"] };
// import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const locales = ["en", "vi"] as const;
//
// const intlMiddleware = createMiddleware({
//   // A list of all locales that are supported
//   locales: locales,
//
//   // Used when no locale matches
//   defaultLocale: "en",
//   localeDetection: false,
// });

const authMiddleware = withAuth(
  function onSuccess(req) {
    // return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/authentication/signin",
    },
  }
);

export default function middleware(req: NextRequest) {
  // Define a regex pattern for private URLs
  const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    // Apply Next-Intl middleware for public pages
    // return intlMiddleware(req);
  } else {
    // Apply Next-Auth middleware for private pages
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

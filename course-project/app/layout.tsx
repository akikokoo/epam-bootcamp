import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { NavLogout } from '@/components/nav-logout';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InnovatEPAM Portal',
  description: 'Employee Innovation Management Platform',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                IE
              </div>
              <span className="font-bold text-lg text-slate-800">InnovatEPAM</span>
              <span className="hidden sm:block text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Portal</span>
            </Link>

            <div className="flex items-center gap-3 text-sm">
              {user ? (
                <>
                  <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-xs bg-slate-100 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <span>{user.email}</span>
                    <span className="bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-medium ml-1">
                      {user.role === 'admin' ? 'Admin' : 'Submitter'}
                    </span>
                  </div>
                  {user.role === 'submitter' && (
                    <Link href="/submitter/ideas" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                      My Ideas
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link href="/admin/ideas" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                      All Ideas
                    </Link>
                  )}
                  <NavLogout />
                </>
              ) : (
                <>
                  <Link href="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
          InnovatEPAM Portal — Employee Innovation Management Platform
        </footer>
      </body>
    </html>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import acmeDarkLogo from '@public/logos/acme-logo-light.png';
import acmeLightLogo from '@public/logos/acme-logo-dark.png';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Menu from 'lucide-react/dist/esm/icons/menu';
import { classNames } from '@/utils/classNames';
import { ThemeToggle } from '@/components/presentational/tailwind/ThemeToggle';
import { Anchor } from '@/components/Anchor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/Select';

export function ExternalNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const activeLinkStyle = 'text-[#2563eb]';
  const isHome = pathname ? pathname === '/' : false;

  const navigation: Array<{
    name: string;
    href: string;
  }> = useMemo(() => {
    const nav = [
      { name: 'My Feed', href: '/feed' },
      {
        name: 'Discussions',
        href: '/discussions',
      },
      {
        name: 'Headless',
        href: '/headless',
      },
      {
        name: 'More',
        href: '/roadmap',
      },
    ];

    return nav;
  }, []);

  // Define the text color based on isDarkBg prop
  // const textColorClass = isDarkBg ? 'text-white' : 'text-gray-800';

  return (
    <header className="sticky inset-x-0 w-full top-0 bg-white/80 dark:bg-slate-900/90  z-50 border-b border-gray-200/20 dark:border-gray-700/40 backdrop-blur">
      <div className="inset-0" onClick={() => setMobileMenuOpen(false)} />
      <nav
        className="flex items-center w-full h-[54px] md:container justify-between px-6 md:px-8"
        aria-label="Global"
      >
        <div className="flex space-x-8">
          <Link href="/" className={classNames('font-bold text-xl ')}>
            <div className="relative flex space-x-2 w-10 h-10 md:w-fit items-center justify-center text-black dark:text-white dark:-ml-4 -ml-2">
              <Image
                src={acmeLightLogo}
                width={40}
                height={40}
                alt="logo"
                className="dark:hidden block h-8 w-8"
              />
              <Image
                src={acmeDarkLogo}
                width={40}
                height={40}
                alt="logo"
                className="hidden dark:block h-8 w-8"
              />
              <span className="hidden font-bold lg:inline-block">acme</span>
            </div>
          </Link>
        </div>

        <ul className="hidden -ml-24 lg:flex gap-8 font-medium items-center">
          {navigation.map(({ name, href }) => (
            <li
              key={name}
              className={`font-regular text-sm hover:text-gray-800 dark:hover:text-gray-500 ${pathname === href ? activeLinkStyle : ''
                }`}
            >
              <Link href={{ pathname: href, query: { navbar: 'external' } }}>{name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex space-x-10 items-center lg:-mr-2">
          <ThemeToggle />

          <div className="ml-6 hidden lg:block">
            <Anchor href="/login">
              <Button variant="default" size="default" className="group">
                Log In
                <svg
                  className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Anchor>
          </div>

        </div>
        <Menu
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="hover:cursor-pointer lg:hidden -mr-2"
        />
      </nav>
      {mobileMenuOpen && (
        <ul className="md:hidden w-full shadow-2xl py-2 flex flex-col items-start font-medium pb-2">
          {navigation.map(({ name, href }) => (
            <li
              key={name}
              className="px-4 py-2 rounded-lg text-gray-900 dark:text-gray-300"
            >
              <Link href={href} onClick={() => setMobileMenuOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
          <hr className="w-full h-2" />
          <Anchor href="/login" className="px-4 w-full">
            <Button variant="default" size="default" className="group w-full">
              Log In
              <svg
                className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Anchor>
        </ul>
      )}
    </header>
  );
}

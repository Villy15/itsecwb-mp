'use client';

import clsx from 'clsx';
import {
  Bell,
  Home,
  MessageCircle,
  Package2,
  Settings,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const links = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/discussions', icon: MessageCircle, label: 'Discussions' },
  { href: '/admin', icon: Users, label: 'Admin' },
];

const settings = {
  href: '/settings',
  icon: Settings,
  label: 'Settings',
};

const config = {
  title: 'ITSECWB Site',
};

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 hidden h-full w-[220px] border-r bg-muted/40 md:block lg:w-[280px]">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="text-sm">{config.title}</span>
          </a>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link, index) => (
              <div key={index}>
                <NavLink
                  to={link.href}
                  className={({ isActive, isPending }) => {
                    return clsx(
                      'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                      {
                        'bg-muted text-primary': isActive,
                        'text-muted-foreground': isPending,
                      }
                    );
                  }}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-auto px-2 text-sm font-medium lg:px-4">
          <a
            href={settings.href}
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <settings.icon className="h-4 w-4" />
            {settings.label}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

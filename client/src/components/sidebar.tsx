'use client';

import clsx from 'clsx';
import {
  Bell,
  GanttChartSquare,
  Home,
  Package,
  Package2,
  Settings,
  Users,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const links = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/users', icon: Users, label: 'Users' },
  {
    href: '/reports',
    icon: GanttChartSquare,
    label: 'Reports',
    sublinks: [
      { href: '/reports/replenish', label: 'Replenish Report' },
      { href: '/reports/expired', label: 'Expired Report' },
      { href: '/reports/descrepancy', label: 'Descrepancy Report' },
      { href: '/reports/physical-count', label: 'Physical Count Report' },
    ],
  },
  {
    href: '/inventory',
    icon: Package,
    label: 'Inventory',
    sublinks: [
      { href: '/inventory/low-stock', label: 'Low Stock' },
      { href: '/inventory/variants', label: 'Variants' },
    ],
  },
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
  const pathname = useLocation().pathname;

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
                <a
                  href={link.href}
                  className={clsx(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                    {
                      'bg-muted text-primary': pathname === link.href,
                      'text-muted-foreground': pathname !== link.href,
                    }
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </a>
                {link.sublinks &&
                  link.sublinks.map((sublink, subIndex) => (
                    <a
                      key={subIndex}
                      href={sublink.href}
                      className={clsx(
                        'ml-4 flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                        {
                          'bg-muted text-primary': pathname === sublink.href,
                          'text-muted-foreground': pathname !== sublink.href,
                        }
                      )}
                    >
                      {sublink.label}
                    </a>
                  ))}
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

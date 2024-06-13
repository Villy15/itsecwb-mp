'use client';

import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// import { ModeToggle } from './ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/admin', label: 'Admin' },
  {
    href: '/reports',
    label: 'Reports',
    sublinks: [
      { href: '/reports/replenish', label: 'Replenish Report' },
      { href: '/reports/replenish', label: 'Expired Report' },
      { href: '/reports/replenish', label: 'Descrepancy Report' },
      { href: '/reports/replenish', label: 'Physical Count Report' },
    ],
  },
  {
    href: '/inventory',
    label: 'Inventory',
    sublinks: [
      { href: '/inventory/low-stock', label: 'Low Stock' },
      { href: '/inventory/variants', label: 'Variants' },
    ],
  },
];

type HeaderProps = {
  isAuthorized: boolean | null;
};

const Header = ({ isAuthorized }: HeaderProps) => {
  const pathname = useLocation().pathname;

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/logout', {
        credentials: 'include',
        method: 'POST',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <a
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </a>
            <a
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </a>
            <a
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Customers
            </a>
            <a
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Analytics
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <div className="text-xl font-bold">
          {links.find(link => link.href === pathname)?.label}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAuthorized ? (
            <DropdownMenuItem asChild>
              <a onClick={logout}>Logout</a>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <a href="/login">Login</a>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <ModeToggle /> */}
    </header>
  );
};

export default Header;

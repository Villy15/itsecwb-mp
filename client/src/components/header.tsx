'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Home, Menu, MessageCircle, Users } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import API_URL from '@/lib/config';

// import { ModeToggle } from './ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const links = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/discussions', icon: MessageCircle, label: 'Discussions' },
  { href: '/admin', icon: Users, label: 'Admin' },
];

interface AuthResponse {
  authorized: boolean;
  isAdmin: boolean;
}

async function checkAuthorization(): Promise<AuthResponse> {
  try {
    const { data } = await axios.post(`${API_URL}/api/auth/checkAuth`, null, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const Header = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthorization,
  });

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        credentials: 'include',
        method: 'POST',
      });

      if (response.ok) {
        // queryClient.invalidateQueries({ queryKey: ['auth'] });
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {links.map((link, index) => (
              <NavLink
                to={link.href}
                key={index}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1" />
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
          <DropdownMenuItem asChild className="font-bold">
            <Link to="/profile">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {data?.authorized ? (
            <DropdownMenuItem asChild>
              <a onClick={logout}>Logout</a>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link to="/login">Login</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <ModeToggle /> */}
    </header>
  );
};

export default Header;

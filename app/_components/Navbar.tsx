"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Atom, LogIn, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Animated Logo Component
const AnimatedLogo = () => {
  return (
    <div className="text-2xl font-light flex items-center overflow-hidden">
      <span className="inline-flex">
        {'Atomi'.split('').map((letter, index) => (
          <span 
            key={index}
            className="inline-block transform hover:scale-125 transition-transform cursor-default"
            style={{ 
              animation: `
                float 2s ease-in-out infinite ${index * 0.1}s,
                sparkle 1.5s ease-in-out infinite ${index * 0.2}s,
                colorCycle 8s ease-in-out infinite ${index * 0.3}s
              `,
            }}
          >
            {letter}
          </span>
        ))}
      </span>
      <span className="font-bold relative">
        <span 
          className="animate-gradient relative z-10"
          style={{
            backgroundImage: 'linear-gradient(90deg, #4f46e5, #ec4899, #8b5cf6, #4f46e5)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          City
        </span>
        <span 
          className="absolute top-0 left-0 animate-pulse-glow z-0"
          style={{
            filter: 'blur(4px)',
            opacity: 0.7,
            backgroundImage: 'linear-gradient(90deg, #4f46e5, #ec4899, #8b5cf6, #4f46e5)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          City
        </span>
        <span className="absolute inset-0 animate-shine pointer-events-none"></span>
      </span>
    </div>
  );
};

// Enhanced CSS Styles for animations
const styles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg); 
    }
    50% { 
      transform: translateY(-5px) rotate(2deg); 
    }
  }

  @keyframes sparkle {
    0%, 100% { 
      text-shadow: 0 0 4px rgba(79, 70, 229, 0.3),
                   0 0 8px rgba(79, 70, 229, 0.3);
    }
    50% { 
      text-shadow: 0 0 8px rgba(236, 72, 153, 0.5),
                   0 0 16px rgba(236, 72, 153, 0.5);
    }
  }

  @keyframes colorCycle {
    0%, 100% { color: #4f46e5; }
    33% { color: #ec4899; }
    66% { color: #8b5cf6; }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.7;
    }
    50% { 
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  @keyframes shine {
    from {
      left: -100%;
      background-position: -100%;
    }
    to {
      left: 100%;
      background-position: 100%;
    }
  }

  .animate-gradient {
    animation: gradient 8s linear infinite;
  }

  .animate-pulse-glow {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-shine {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    width: 200%;
    height: 100%;
    animation: shine 3s infinite;
  }

  /* Interactive hover effects */
  .logo:hover .inline-block {
    animation-duration: 1s !important;
  }

  .logo:hover .animate-gradient {
    animation-duration: 4s !important;
  }
`;

const UserMenu = () => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button variant="ghost" className="text-purple-500">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      </SignInButton>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
            <AvatarFallback>{user?.firstName?.charAt(0) || ''}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <Link href={'/dashboard/user'}>
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <SignOutButton redirectUrl="/events">Sign out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const [isFloating, setIsFloating] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsFloating(scrollPosition > heroHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <Card
        className={`w-full border-b-transparent transition-all duration-300 ${
          isFloating
            ? "fixed top-0 left-0 right-0 z-50 shadow-xl bg-opacity-90 backdrop-blur-xl"
            : ""
        }`}
      >
        <CardContent className="flex items-center p-4">
          {/* Left section: Logo and Navigation Links */}
          <div className="flex items-center flex-1">
            <Link href={"/"}>
              <div className="logo mr-8 flex items-center space-x-2">
                <Image
                  src={'/imgs/atomicity_logo.png'}
                  alt={'Atomicity Logo'}
                  width={40}
                  height={40}
                  className="bg-purple-200 border-[1px] border-purple-500 rounded-lg"
                />
                <AnimatedLogo />
              </div>
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-full p-6 lg:w-[500px] rounded-md shadow-lg bg-white">
                      <div className="flex items-center justify-between space-x-4 p-4 bg-gradient-to-b from-muted/50 to-muted rounded-md">
                        <div className="flex flex-col items-center text-center">
                          <Image
                            src="/imgs/atomicity_logo.png"
                            height={60}
                            width={60}
                            alt="logo"
                            className="mb-3"
                          />
                          <div className="text-lg text-gray-800">
                            <AnimatedLogo />
                            <span className="block italic font-light text-sm text-gray-500">
                              @Admin
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center text-left">
                          <p className="text-md leading-snug font-extralight text-gray-700">
                            Join as an admin and shape the future of event
                            management! Lead teams, manage events, and create
                            impactful experiences.
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Link
                          href="https://admin-atomicity.vercel.app/"
                          className="w-full"
                          target="_blank"
                        >
                          <Button className="w-full">Apply for Admin</Button>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right section: Events and User Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/events" className="hidden md:block">
              <Button
                className="text-xl text-black px-6 py-2 bg-purple-200 rounded-full border-[1px] border-purple-500 hover:bg-purple-500 hover:text-white shadow-lg transition-all duration-300"
              >
                Events
              </Button>
            </Link>

            <div className="auth-btns flex items-center gap-x-3">
              <ClerkLoaded>
                <SignedOut>
                  <Button variant="ghost" className="text-primary">
                    <SignInButton mode="modal" fallbackRedirectUrl={"/events"} />
                  </Button>
                  <Button variant="default">
                    <SignUpButton
                      mode="modal"
                      fallbackRedirectUrl={"/dashboard/user/complete-signin"}
                    />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <span className="flex font-semibold text-sm items-center gap-1">
                    <Atom/>{user?.username} 
                  </span>
                  <UserMenu/>
                </SignedIn>
              </ClerkLoaded>
              <ClerkLoading>
                <Button variant="ghost" disabled>
                  Sign in
                </Button>
                <Button variant="default" disabled>
                  Sign up
                </Button>
              </ClerkLoading>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Navbar;
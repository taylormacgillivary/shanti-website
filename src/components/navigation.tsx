"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/home-test";

  React.useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const navHeight = 64; // h-16 = 64px
      
      // Check if we're over the hero video (first screen minus nav height)
      const heroVideoEnd = viewportHeight - navHeight;
      
      // Get the community video section position dynamically
      const communityVideoSection = document.getElementById('community-video-section');
      let communityVideoStart = 0;
      let communityVideoEnd = 0;
      
      if (communityVideoSection) {
        const rect = communityVideoSection.getBoundingClientRect();
        communityVideoStart = scrollY + rect.top;
        communityVideoEnd = communityVideoStart + rect.height;
      }
      
      const isOverHeroVideo = scrollY < heroVideoEnd * 0.7;
      const isOverCommunityVideo = communityVideoSection && 
                                   scrollY + navHeight >= communityVideoStart && 
                                   scrollY + navHeight <= communityVideoEnd;
      
      // Calculate progress based on whether we're in a video section or not
      let progress;
      if (isOverHeroVideo) {
        // Transitioning away from hero video
        progress = Math.min(Math.max((scrollY - heroVideoEnd * 0.7) / (heroVideoEnd * 0.3), 0), 1);
      } else if (isOverCommunityVideo) {
        // Transitioning into/out of community video
        const distanceIntoVideo = scrollY + navHeight - communityVideoStart;
        const transitionZone = viewportHeight * 0.2;
        
        if (distanceIntoVideo < transitionZone) {
          // Fading to white as we enter
          progress = 1 - (distanceIntoVideo / transitionZone);
        } else if (distanceIntoVideo > (viewportHeight * 0.8) - transitionZone) {
          // Fading back to color as we exit
          const distanceFromEnd = (viewportHeight * 0.8) - distanceIntoVideo;
          progress = 1 - (distanceFromEnd / transitionZone);
        } else {
          // Fully in the video section
          progress = 0;
        }
      } else {
        // Not over any video
        progress = 1;
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate dynamic styles based on scroll progress
  const bgOpacity = isHomePage ? scrollProgress * 0.95 : 0.95;
  const borderOpacity = isHomePage ? scrollProgress : 1;

  return (
    <header 
      className="w-full transition-all duration-500 backdrop-blur"
      style={{
        backgroundColor: isHomePage 
          ? `rgba(255, 255, 255, ${bgOpacity})`
          : 'rgba(255, 255, 255, 0.95)',
        borderBottomWidth: '1px',
        borderBottomColor: `rgba(226, 232, 240, ${borderOpacity})`,
        backgroundImage: isHomePage && scrollProgress < 0.3
          ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent)'
          : 'none',
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 relative">
          {/* White logo - fades out */}
          <Image
            src="/images-in-use/Logos/shantiyoga-logo-white.png"
            alt="Shanti Hot Yoga"
            width={120}
            height={40}
            className="h-10 w-auto transition-opacity duration-500 absolute"
            priority
            style={{ 
              height: 'auto',
              opacity: isHomePage ? (1 - scrollProgress) : 0
            }}
          />
          {/* Color logo - fades in */}
          <Image
            src="/images-in-use/Logos/shantiyoga-logo-color.png"
            alt="Shanti Hot Yoga"
            width={120}
            height={40}
            className="h-10 w-auto transition-opacity duration-500"
            priority
            style={{ 
              height: 'auto',
              opacity: isHomePage ? scrollProgress : 1
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="hover:!bg-white/10 transition-all duration-500"
                style={{
                  backgroundColor: 'transparent',
                  color: isHomePage 
                    ? scrollProgress < 1 
                      ? `rgb(${255 - scrollProgress * 224}, ${255 - scrollProgress * 229}, ${255 - scrollProgress * 231})`
                      : undefined
                    : undefined
                }}
              >
                Studios
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {siteConfig.studiosNav.map((item) => (
                    <ListItem
                      key={item.title}
                      href={item.href}
                      title={item.title}
                      featured={item.featured}
                      image={item.image}
                      external={item.external}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {siteConfig.mainNav.map((item) => {
                // If item has sub-items, render as dropdown
                if (item.items) {
                    return (
                        <NavigationMenuItem key={item.title}>
                            <NavigationMenuTrigger 
                                className="hover:!bg-white/10 transition-all duration-500"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: isHomePage 
                                        ? scrollProgress < 1 
                                            ? `rgb(${255 - scrollProgress * 224}, ${255 - scrollProgress * 229}, ${255 - scrollProgress * 231})`
                                            : undefined
                                        : undefined
                                }}
                            >
                                {item.title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4">
                                    {item.items.map((subItem) => (
                                        <ListItem
                                            key={subItem.title}
                                            href={subItem.href}
                                            title={subItem.title}
                                        >
                                            {subItem.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    );
                }
                // Otherwise render as simple link
                return item.href ? (
                    <NavigationMenuItem key={item.title}>
                        <Link 
                          href={item.href} 
                          className={`${navigationMenuTriggerStyle()} hover:!bg-white/10 transition-all duration-500`}
                          style={{
                            backgroundColor: 'transparent',
                            color: isHomePage 
                              ? scrollProgress < 1 
                                ? `rgb(${255 - scrollProgress * 224}, ${255 - scrollProgress * 229}, ${255 - scrollProgress * 231})`
                                : undefined
                              : undefined
                          }}
                        >
                            {item.title}
                        </Link>
                    </NavigationMenuItem>
                ) : null;
            })}

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className="hover:!bg-white/10 transition-all duration-500"
                style={{
                  backgroundColor: 'transparent',
                  color: isHomePage 
                    ? scrollProgress < 1 
                      ? `rgb(${255 - scrollProgress * 224}, ${255 - scrollProgress * 229}, ${255 - scrollProgress * 231})`
                      : undefined
                    : undefined
                }}
              >
                Teacher Training
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="text-center py-2 px-4 text-sm text-muted-foreground italic">
                  Scroll down to view more
                </div>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] max-h-[70vh] overflow-y-auto">
                  {siteConfig.teacherTrainingNav.map((item) => (
                    <ListItem
                      key={item.title}
                      href={item.href}
                      title={item.title}
                      isNew={item.isNew}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://clients.mindbodyonline.com/classic/mainclass?studioid=11233"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium transition-colors hover:opacity-70"
            style={{
              color: isHomePage 
                ? scrollProgress < 1 
                  ? `rgb(${255 - scrollProgress * 224}, ${255 - scrollProgress * 229}, ${255 - scrollProgress * 231})`
                  : undefined
                : undefined
            }}
          >
            Mindbody Login
          </a>
          <Button 
            asChild 
            className="transition-all duration-500 border-2"
            style={{
              background: isHomePage 
                ? scrollProgress < 0.5
                  ? `rgba(255, 255, 255, ${0.1 + scrollProgress * 0.2})`
                  : `linear-gradient(135deg, rgb(${150 * scrollProgress}, ${191 * scrollProgress}, ${80 * scrollProgress}) 0%, rgb(${130 * scrollProgress}, ${171 * scrollProgress}, ${60 * scrollProgress}) 100%)`
                : 'linear-gradient(135deg, rgb(150, 191, 80) 0%, rgb(130, 171, 60) 100%)',
              borderColor: isHomePage 
                ? `rgba(${255 - scrollProgress * 105}, ${255 - scrollProgress * 64}, ${255 - scrollProgress * 175}, ${0.3 + scrollProgress * 0.7})`
                : 'transparent',
              color: 'white',
            }}
          >
            <Link href="/schedule">
              Book Class
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              className="md:hidden transition-colors duration-500"
              style={{
                color: isHomePage 
                  ? scrollProgress < 1 
                    ? `rgb(${255 - scrollProgress * 224}, ${255 - scrollProgress * 229}, ${255 - scrollProgress * 231})`
                    : undefined
                  : undefined
              }}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate to different sections of our website
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="studios">
                        <AccordionTrigger className="text-lg font-medium">
                            Studios
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-4 flex flex-col gap-2">
                                {siteConfig.studiosNav.map((item) => (
                                    <MobileNavLink
                                    key={item.href}
                                    href={item.href}
                                    onOpenChange={setIsMobileMenuOpen}
                                    external={item.external}
                                    >
                                    {item.title}
                                    </MobileNavLink>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {siteConfig.mainNav.map((item) => {
                    // If item has sub-items, render as accordion
                    if (item.items) {
                        return (
                            <Accordion key={item.title} type="multiple" className="w-full">
                                <AccordionItem value={item.title.toLowerCase()}>
                                    <AccordionTrigger className="text-lg font-medium">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pl-4 flex flex-col gap-2">
                                            {item.items.map((subItem) => (
                                                <MobileNavLink
                                                    key={subItem.href}
                                                    href={subItem.href || '#'}
                                                    onOpenChange={setIsMobileMenuOpen}
                                                >
                                                    {subItem.title}
                                                </MobileNavLink>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        );
                    }
                    // Otherwise render as simple link
                    return item.href ? (
                        <MobileNavLink
                            key={item.href}
                            href={item.href}
                            onOpenChange={setIsMobileMenuOpen}
                            className="text-lg font-medium border-b py-4 block"
                        >
                            {item.title}
                        </MobileNavLink>
                    ) : null;
                })}
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="teacher-training">
                        <AccordionTrigger className="text-lg font-medium">
                            Teacher Training
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-4 flex flex-col gap-2">
                            {siteConfig.teacherTrainingNav.map((item) => (
                                <MobileNavLink
                                key={item.href}
                                href={item.href}
                                onOpenChange={setIsMobileMenuOpen}
                                isNew={item.isNew}
                                >
                                {item.title}
                                </MobileNavLink>
                            ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { featured?: boolean, image?: string, isNew?: boolean, external?: boolean }
>(({ title, children, featured, href, image, isNew, external, ...props }, ref) => {
  // Check if this is the 200 Hour YTT option
  const isYTT200Hour = title === "YTT 200 Hour";
  
  // Add external link props if needed
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  
  if (featured && image) {
    return (
      <li className="row-span-4">
        <NavigationMenuLink asChild>
          <Link
            href={href ?? ''}
            ref={ref}
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md relative"
            style={{ backgroundImage: `url(${image})` }}
            {...externalProps}
            {...props}>
            <div className="absolute inset-0 bg-black/40 rounded-md" />
            <div className="relative z-10">
              <div className="border border-white/40 rounded-md px-3 py-2 inline-block backdrop-blur-sm bg-black/20">
                <div className="mb-2 text-lg font-medium text-white">{title}</div>
                <p className="text-sm leading-tight text-white/90">
                  {children}
                </p>
              </div>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
  if (featured) {
    return (
      <li className="row-span-4">
        <NavigationMenuLink asChild>
          <Link
            href={href ?? ''}
            ref={ref}
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            {...externalProps}
            {...props}>
            <MapPin className="h-6 w-6 text-primary" />
            <div className="mb-2 mt-4 text-lg font-medium">{title}</div>
            <p className="text-sm leading-tight text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href ?? ''}
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
            isYTT200Hour 
              ? "bg-sage-green/20 hover:bg-sage-green/30 border border-sage-green/30 focus:bg-sage-green/30" 
              : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }`}
          {...externalProps}
          {...props}>
          <div className={`text-sm font-medium leading-none ${isYTT200Hour ? "text-foreground font-semibold" : ""} flex items-center gap-2`}>
            {title}
            {isNew && (
              <Badge variant="destructive" className="text-xs px-1 py-0 bg-red-500 text-white">
                NEW!
              </Badge>
            )}
          </div>
          <p className={`line-clamp-2 text-sm leading-snug ${isYTT200Hour ? "text-foreground/80" : "text-muted-foreground"}`}>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  className?: string;
  isNew?: boolean;
  external?: boolean;
}

function MobileNavLink({
  href,
  children,
  onOpenChange,
  className,
  isNew,
  external,
}: MobileNavLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  
  return (
    <Link
      href={href}
      onClick={() => onOpenChange(false)}
      className={
        className
          ? className
          : "text-base hover:text-sage-green transition-colors flex items-center gap-2"
      }
      {...externalProps}>
      {children}
      {isNew && (
        <Badge variant="destructive" className="text-xs px-1 py-0 bg-red-500 text-white">
          NEW!
        </Badge>
      )}
    </Link>
  );
}
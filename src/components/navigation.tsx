"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Menu } from "lucide-react";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">

          <Image
            src="/images-in-use/Logos/shantiyoga-logo-color.png"
            alt="Shanti Hot Yoga"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
            style={{ height: 'auto' }}
          />

        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Studios</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {siteConfig.studiosNav.map((item) => (
                    <ListItem
                      key={item.title}
                      href={item.href}
                      title={item.title}
                      featured={item.featured}
                      image={item.image}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {siteConfig.mainNav.map((item) => (
                item.href && (
                    <NavigationMenuItem key={item.title}>
                        <Link href={item.href} className={navigationMenuTriggerStyle()}>
                            {item.title}
                        </Link>
                    </NavigationMenuItem>
                )
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger>Teacher Training</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] max-h-[70vh] overflow-y-auto">
                  {siteConfig.teacherTrainingNav.map((item) => (
                    <ListItem
                      key={item.title}
                      href={item.href}
                      title={item.title}
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
          <Button asChild className="gradient-sage hover:opacity-90 text-white">
            <Link href="/schedule">
              Book Class
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
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
                                    >
                                    {item.title}
                                    </MobileNavLink>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {siteConfig.mainNav.map((item) => (
                    <MobileNavLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setIsMobileMenuOpen}
                    className="text-lg font-medium border-b py-4 block"
                    >
                    {item.title}
                    </MobileNavLink>
                ))}
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
  React.ComponentPropsWithoutRef<"a"> & { featured?: boolean, image?: string }
>(({ title, children, featured, href, image, ...props }, ref) => {
  // Check if this is the 200 Hour YTT option
  const isYTT200Hour = title === "YTT 200 Hour";
  
  if (featured && image) {
    return (
      <li className="row-span-4">
        <NavigationMenuLink asChild>
          <Link
            href={href ?? ''}
            ref={ref}
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md relative"
            style={{ backgroundImage: `url(${image})` }}
            {...props}>
            <div className="absolute inset-0 bg-black/40 rounded-md" />
            <div className="relative z-10">
              <div className="mb-2 mt-4 text-lg font-medium text-white">{title}</div>
              <p className="text-sm leading-tight text-white/90">
                {children}
              </p>
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
          {...props}>
          <div className={`text-sm font-medium leading-none ${isYTT200Hour ? "text-foreground font-semibold" : ""}`}>
            {title}
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
}

function MobileNavLink({
  href,
  children,
  onOpenChange,
  className,
}: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange(false)}
      className={
        className
          ? className
          : "text-base hover:text-sage-green transition-colors"
      }>
      {children}
    </Link>
  );
}
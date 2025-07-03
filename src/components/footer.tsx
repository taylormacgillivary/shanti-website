import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Instagram, Facebook, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images-in-use/Logos/shantiyoga-logo-white.png"
                alt="Shanti Hot Yoga"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your practice with hot yoga across our three beautiful locations in Halifax, Bedford, and Dartmouth.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/shyyoga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sage-green transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16M7T8C1An"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sage-green transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/studios" className="text-gray-300 hover:text-sage-green transition-colors">
                  Our Studios
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-300 hover:text-sage-green transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-300 hover:text-sage-green transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-sage-green transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-300 hover:text-sage-green transition-colors">
                  Book Class
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Studios</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sage-green">Halifax</h4>
                <p className="text-sm text-gray-300">Downtown Halifax</p>
                <p className="text-sm text-gray-300">Est. 2015</p>
              </div>
              <div>
                <h4 className="font-medium text-sage-green">Bedford</h4>
                <p className="text-sm text-gray-300">Bedford Community</p>
                <p className="text-sm text-gray-300">Est. 2013</p>
              </div>
              <div>
                <h4 className="font-medium text-sage-green">Dartmouth</h4>
                <p className="text-sm text-gray-300">Original Studio</p>
                <p className="text-sm text-gray-300">Est. 2010</p>
              </div>
            </div>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Hours</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Open Daily</p>
                  <p className="text-sm text-gray-300">6:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">info@shantihotyoga.ca</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">(902) 555-0123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2024 Shanti Hot Yoga. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-sage-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-sage-green transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-sage-green transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
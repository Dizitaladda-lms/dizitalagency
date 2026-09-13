'use client';

import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#050512] border-t border-cyan-500/10 overflow-hidden">
      {/* Top neon glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-purple-900/60" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Company Info (NO MAP HERE NOW) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative items-start">
              <img 
                src="/final-logo.png" 
                alt="Digital Adda Logo"
                className="h-auto md:h-[10vw] w-full object-cover md:object-contain scale-100 md:scale-200" 
              />
              <div className="absolute -inset-1 bg-cyan-500/20 blur-2xl -z-10 animate-pulse" />
            </div>

            <div className="space-y-5 text-gray-400 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  2nd Floor, Office No. 201, Spacetime Management Pvt Ltd Design House, behind Savitri Cinema Complex, Greater Kailash II, New Delhi-110048
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>+91 9355121681</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>Info@digitaladdagagency.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {['SEO & AI SEO', 'Social Media Marketing', 'PPC Advertising', 'Content Strategy', 'Web Development', 'Brand Identity'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: 'About Us', href: '/Aboutus' },
                { name: 'Portfolio', href: '/Portfolio' },
                { name: 'Blog', href: '/blogs' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-cyan-400 transition block">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations + MAP BELOW */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Our Locations</h3>
              {/* <ul className="space-y-3 text-gray-400 text-sm">
                {['Delhi'].map((city) => (
                  <li key={city} className="hover:text-cyan-400 transition cursor-pointer">
                    {city}
                  </li>
                ))}
              </ul> */}
            </div>

            {/* Standard Maps embed keeps the iframe tied to the address shown above. */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 group">
              <iframe
                title="Digital Adda Agency location in Greater Kailash II, New Delhi"
                src="https://www.google.com/maps?q=2nd+Floor%2C+Office+No.+201%2C+Spacetime+Management+Pvt+Ltd+Design+House%2C+behind+Savitri+Cinema+Complex%2C+Greater+Kailash+II%2C+New+Delhi+110048&z=16&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700 group-hover:brightness-110"
              />
              
              <a
                href="https://www.google.com/maps/search/?api=1&query=2nd+Floor%2C+Office+No.+201%2C+Spacetime+Management+Pvt+Ltd+Design+House%2C+behind+Savitri+Cinema+Complex%2C+Greater+Kailash+II%2C+New+Delhi+110048"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 bg-purple-600 hover:bg-purple-700 backdrop-blur-lg border border-cyan-400/30 px-5 py-2.5 rounded-full text-cyan-300 text-sm font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <MapPin className="w-4 h-4" />
                Open in Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-gray-500">
            © 2025 Digital Adda • Made with <span className="text-cyan-400">♥</span> in India
          </p>

          <div className="flex gap-5">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800/40 border border-gray-700 flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group"
              >
                <Icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#12022a]" />
    </footer>
  );
}

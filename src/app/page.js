import Homesection1 from "@/Homesections/Homesection1";
import Homesection2 from "@/Homesections/Homesection2";
import Homesection3 from "@/Homesections/Homesection3";
import HomesectionTrust from "@/Homesections/HomesectionTrust";
import Homesection4 from "@/Homesections/Homesection4";
import Homesection5 from "@/Homesections/Homesection5";
import Homesection6 from "@/Homesections/Homesection6"; 
import Homesection2_1 from "@/Homesections/Homesection2_1";
import Homesection2_2 from "@/Homesections/Homesection2_2";

import Script from "next/script";

export default function Home() {
  return (
    <div>
      {/* Schema Markup */}
      <Script
        id="digitaladda-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "DigitalAdda Digital Marketing Agency",
            "url": "http://localhost:3000/",
            "telephone": "09355121681",
            "address": {
              "@type": "PostalAddress",
              "streetAddress":
                "ground Complex, Spacetime LGF, building No.1, at Desein House, Behind Savitri Cinema, Greater Kailash II",
              "addressLocality": "New Delhi",
              "postalCode": "110048",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 28.5415141,
              "longitude": 77.240201
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "10:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.instagram.com/digitaladdaagency/",
              "https://www.linkedin.com/in/digitaladda-agency-283322372/",
              "http://localhost:3000/",
              "https://www.facebook.com/profile.php?id=61571980529782"
            ]
          })
        }}
      />

      {/* Page Sections */}
      <Homesection1 />
      {/*<Homesection2_1 />*/}
      
      <Homesection2_2 />
      <Homesection2 />
      <Homesection3 />
      <HomesectionTrust />
      <Homesection4 />
      <Homesection6 />
      <Homesection5 />
    </div>
  );
}

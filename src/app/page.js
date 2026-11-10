import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import prisma from "@/lib/prisma";
import servicesData from "./Data/services.json";
import industriesData from "./Data/industries.json";
import HomeLeadForm from "@/components/HomeLeadForm";

export const dynamic = "force-dynamic";

const serviceLinks = [
  ["seo", "SEO"],
  ["local-seo", "Local SEO"],
  ["ppc", "PPC advertising"],
  ["social-media-marketing", "Social media"],
  ["website-designing", "Web development"],
  ["content-writing", "Content"],
  ["graphic-design", "Brand identity"],
  ["video-editing", "Video production"],
];

const industrySlugs = [
  "education",
  "startup",
  "b2b",
  "fashion",
  "healthcare",
  "real-estate",
  "finance",
  "travel-tour",
  "lawyer",
];

const clientBrands = [
  { name: "CUET-Adda", image: "/brands/1.png" },
  { name: "DesigningVidya", image: "/brands/2.png" },
  { name: "Digiwarms", image: "/brands/3.png" },
  { name: "Economics with Gulshan Sir", image: "/brands/6.png" },
  { name: "LawPrep", image: "/brands/10.png" },
  { name: "Blumera", image: "/brands/17.png" },
];

const caseStudies =
  servicesData.services["Search Engine Optimization"].caseStudies.slice(0, 3);

const caseStudyDetails = [
  {
    challenge: "Grow organic discovery for an education business.",
    approach: "SEO audit, keyword-led content, and on-page improvements.",
  },
  {
    challenge: "Improve search visibility for an online store.",
    approach: "Technical SEO, product-page optimization, and authority building.",
  },
  {
    challenge: "Turn local search demand into qualified enquiries.",
    approach: "Search optimization focused on high-intent local keywords.",
  },
];

const testimonials = [
  {
    quote:
      "DizitalAdda transformed our online presence. We went from page 5 to page 1 in just 3 months. Their team is exceptional.",
    name: "Rajesh Kumar",
    company: "CEO, TechStart",
  },
  {
    quote:
      "The ROI we've seen from their SEO services is incredible. Our leads increased by 300%.",
    name: "Priya Sharma",
    company: "Marketing Head, EduCorp",
  },
  {
    quote:
      "Professional team with proven results. They delivered exactly what they promised.",
    name: "Amit Patel",
    company: "Owner, HealthPlus",
  },
  {
    quote:
      "The website they built exceeded our expectations. Sales jumped 40% in the first month!",
    name: "Vikram Malhotra",
    company: "Founder, StyleHub",
  },
  {
    quote:
      "Professional team, stunning design, and delivered ahead of schedule. Highly recommended.",
    name: "Sneha Reddy",
    company: "Director, EduLearn",
  },
  {
    quote:
      "Best web design agency we've worked with. Clean code, beautiful design, great support.",
    name: "Karan Singh",
    company: "CEO, TechNova",
  },
];

const faqs = [
  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on the service, scope, competition, and goals. We’ll review your requirements and provide a clear proposal before any work begins. SEO package details are available on our SEO service page.",
  },
  {
    question: "Do you require a minimum contract term?",
    answer:
      "The right engagement term depends on the work. We’ll explain the scope, milestones, and any commitment in the proposal so you can review it before signing.",
  },
  {
    question: "How often will I receive reports?",
    answer:
      "Reporting frequency is agreed in your plan. Our approach includes transparent performance updates and regular reviews with your team.",
  },
  {
    question: "Who owns my website, ad accounts, and campaign data?",
    answer:
      "Your business should retain ownership of its digital properties and campaign data. Account access and deliverables are documented as part of the project scope.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "It depends on the channel and starting point. SEO often needs several months; the SEO service page notes initial improvements may take 3–4 months, with more significant results taking 6–12 months.",
  },
  {
    question: "Is the work handled in-house?",
    answer:
      "DigitalAdda works with an in-house team of strategists, creatives, and specialists. Your proposal will outline the people and responsibilities for your engagement.",
  },
  {
    question: "Do you guarantee first-page rankings or a specific result?",
    answer:
      "No ethical agency can guarantee a particular search ranking. We focus on sound practices, transparent reporting, and measurable progress toward the goals agreed with you.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work across education and EdTech, startups, B2B, fashion, healthcare, real estate, finance, travel, and other sectors. See the industry pages for more detail.",
  },
  {
    question: "What happens after I request a free audit?",
    answer:
      "We’ll review the information you share and get in touch to understand your goals. The contact team aims to respond within 2–4 business hours.",
  },
];

export default async function Home() {
  let blogs = [];
  let blogLoadError = false;
  try {
    blogs = await prisma.blog.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        metaDescription: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error("Unable to load latest homepage articles:", error);
    blogLoadError = true;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitaladdaagency.com";

  return (
    <div className="globe-page overflow-hidden text-white">
      <Script
        id="digitaladda-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "DigitalAdda Digital Marketing Agency",
            url: siteUrl,
            telephone: "+919355121681",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "2nd Floor, Office No. 201, Spacetime Management Pvt Ltd Design House, behind Savitri Cinema Complex, Greater Kailash II",
              addressLocality: "New Delhi",
              postalCode: "110048",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.instagram.com/digitaladdaagency/",
              "https://www.linkedin.com/in/digitaladda-agency-283322372/",
              "https://www.facebook.com/profile.php?id=61571980529782",
            ],
          }),
        }}
      />

      <section className="globe-home-hero relative min-h-[680px] overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
        <div className="absolute inset-0 globe-home-hero-backdrop" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:70px_70px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-fuchsia-300">
              Digital growth, built around your business
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Performance marketing for{" "}
              <span className="text-fuchsia-300">education and growth brands</span>
              , from Delhi.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              SEO, paid media, content, and websites that bring your next stage
              of growth into focus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#free-audit"
                className="rounded-full bg-fuchsia-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-fuchsia-400"
              >
                Get Free Audit
              </a>
              <a
                href="#case-studies"
                className="rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:border-fuchsia-300 hover:text-fuchsia-200"
              >
                See Results
              </a>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-6">
              {[
                ["18", "brand logos showcased"],
                [String(Object.keys(industriesData.industrySlugMap).length), "industry pages"],
                [String(Object.keys(servicesData.serviceSlugMap).length), "service pages"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black text-white sm:text-3xl">
                    {value}+
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-400 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-fuchsia-500/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-slate-900">
              <Image
                src="/dapic/group4.jpeg"
                alt="DigitalAdda leadership and strategy team"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08001a]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-200">
                  Strategy. Creative. Performance.
                </p>
                <p className="mt-2 text-xl font-bold sm:text-2xl">
                  One team for your digital growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Client brands" className="border-y border-white/10 bg-white/[0.025] px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            Brands in our portfolio
          </p>
          <div className="grid grid-cols-2 items-center gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {clientBrands.map((brand) => (
              <div
                key={brand.name}
                className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4"
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={160}
                  height={64}
                  loading="lazy"
                  sizes="(max-width: 640px) 40vw, 16vw"
                  className="max-h-10 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Selected outcomes"
            title="Growth you can put a number to."
            description="A snapshot of the SEO outcomes currently documented in our service portfolio."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <article
                key={study.client}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#100b24] p-6 sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                  {study.client}
                </p>
                <h3 className="mt-4 text-xl font-bold">{caseStudyDetails[index].challenge}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-slate-200">Approach: </span>
                  {caseStudyDetails[index].approach}
                </p>
                <div className="mt-auto border-t border-white/10 pt-6">
                  <p className="text-4xl font-black text-fuchsia-300">
                    {study.metric}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{study.label}</p>
                  <p className="mt-1 text-xs text-slate-400">{study.growth}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Results shown are the case-study figures published in our SEO service
            content; outcomes vary by account and campaign.
          </p>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-[#0d0820] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we do"
            title="The right mix of growth services."
            description="Specialist execution across the channels that shape discovery, demand, and conversion."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {serviceLinks.map(([slug, label], index) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group flex min-h-36 flex-col justify-between rounded-xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-fuchsia-400/50 hover:bg-fuchsia-500/[0.06]"
              >
                <span className="text-xs font-bold text-fuchsia-300">
                  0{index + 1}
                </span>
                <span className="flex items-center justify-between gap-3 text-lg font-bold">
                  {label}
                  <span className="text-fuchsia-300 transition group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Who we help"
            title="Built for the way your industry grows."
            description="Start with education and EdTech, then explore the sectors we work across."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {industrySlugs.map((slug) => (
              <Link
                key={slug}
                href={`/industries/${slug}`}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  slug === "education"
                    ? "border-fuchsia-300 bg-fuchsia-500 text-white hover:bg-fuchsia-400"
                    : "border-white/15 bg-white/[0.03] text-slate-200 hover:border-fuchsia-300/60 hover:text-white"
                }`}
              >
                {industriesData.industrySlugMap[slug]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d0820] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="A clear process"
            title="From first look to measurable progress."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Audit", "Understand your goals, current performance, and biggest opportunities."],
              ["02", "Strategy", "Agree on priorities, channels, scope, and how success will be measured."],
              ["03", "Execution", "Put the plan into action with regular collaboration and optimization."],
              ["04", "Reporting", "Review performance, share what changed, and plan the next iteration."],
            ].map(([number, title, copy]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-[#08001a] p-6">
                <p className="text-sm font-bold text-fuchsia-300">{number}</p>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why DigitalAdda"
            title="A partner that stays close to the work."
          />
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["In-house collaboration", "Work with a connected team of strategists, creatives, and channel specialists."],
              ["Direct strategist access", "Discuss priorities and decisions with the people shaping your plan."],
              ["Clear performance reporting", "See the work, the signals, and the next steps without guesswork."],
              ["Multi-channel capability", "Bring search, paid media, social, content, and web into one growth plan."],
            ].map(([title, copy]) => (
              <div key={title} className="border-l-2 border-fuchsia-400 pl-5">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d0820] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/group.jpeg"
              alt="DigitalAdda founders and lead strategists"
              width={1200}
              height={900}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
              The people behind the work
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Meet your growth team.
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              DigitalAdda brings strategists, creatives, and digital specialists
              together to help ambitious businesses grow. The agency was founded
              by Dr Gulsan Kumar, who leads the team and its client-first approach.
            </p>
            <Link
              href="/Aboutus"
              className="mt-7 inline-flex rounded-full border border-fuchsia-300/50 px-5 py-3 text-sm font-bold text-fuchsia-100 transition hover:bg-fuchsia-500/10"
            >
              More about our team
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Client feedback"
            title="What clients have shared."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <blockquote className="text-base leading-7 text-slate-200">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-7 border-t border-white/10 pt-5">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-fuchsia-200">{testimonial.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d0820] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Watch and learn"
            title="A look behind the strategy and client work."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Strategy video", "/video/1.mp4"],
              ["Client video", "/video/client.mp4"],
            ].map(([title, src]) => (
              <div key={src} className="overflow-hidden rounded-xl border border-white/10 bg-black">
                <video
                  controls
                  playsInline
                  preload="none"
                  className="aspect-video w-full"
                  aria-label={title}
                >
                  <source src={src} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
                <p className="px-4 py-3 text-sm font-semibold">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                From the blog
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Latest thinking.</h2>
            </div>
            <Link href="/blogs" className="text-sm font-bold text-fuchsia-200 hover:text-white">
              Browse all articles →
            </Link>
          </div>
          {blogs.length > 0 ? (
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {blogs.map((blog) => (
                <article key={blog.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-xs text-slate-400">
                    {new Intl.DateTimeFormat("en-IN", {
                      dateStyle: "medium",
                    }).format(blog.createdAt)}
                  </p>
                  <h3 className="mt-4 text-lg font-bold leading-7">
                    <Link href={`/blog/${blog.slug}`} className="hover:text-fuchsia-200">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                    {blog.excerpt || blog.metaDescription}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-slate-400">
              {blogLoadError
                ? "Latest articles are temporarily unavailable. Please try again later."
                : "New articles are on the way."}
            </p>
          )}
        </div>
      </section>

      <section className="bg-[#0d0820] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Good questions. Straight answers."
          />
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:hidden">
                  {question}
                  <span className="text-xl text-fuchsia-300 transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pt-4 text-sm leading-6 text-slate-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="free-audit" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-fuchsia-300/20 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.16),transparent_45%),#100b24] p-6 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
              Start with a conversation
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Let’s find your next growth opportunity.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Share a few details and our team will be in touch to understand
              your goals and discuss a free audit.
            </p>
            <p className="mt-6 text-sm text-slate-400">
              Prefer to talk?{" "}
              <a href="tel:+919355121681" className="font-semibold text-white hover:text-fuchsia-200">
                +91 93551 21681
              </a>
            </p>
          </div>
          <HomeLeadForm services={serviceLinks.map(([, label]) => label)} />
        </div>
      </section>

      <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-7 sm:right-6">
        <a
          href="https://wa.me/919355121681"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with DigitalAdda on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/30 transition hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
        <a
          href="tel:+919355121681"
          aria-label="Call DigitalAdda"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-500 text-white shadow-lg shadow-black/30 transition hover:scale-105"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl leading-7 text-slate-400">{description}</p>
      )}
    </div>
  );
}

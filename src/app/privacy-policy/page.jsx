import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | DigitalAdda",
  description: "How DigitalAdda handles information submitted through this website.",
};

const sections = [
  {
    title: "Information you provide",
    body: "When you use our contact form, we collect the details you submit, such as your name, email address, phone number, selected service, and message.",
  },
  {
    title: "How information is used",
    body: "We use submitted information to respond to enquiries, discuss requested services, prevent spam, and maintain records of website enquiries. The contact endpoint also processes your IP address for rate limiting and enquiry security logs.",
  },
  {
    title: "Service providers",
    body: "Contact form submissions are sent to our lead-management service. If an optional Web3Forms access key is configured, a copy may also be sent through Web3Forms. These providers process information under their own privacy terms.",
  },
  {
    title: "Retention and security",
    body: "We retain enquiry information for as long as it is needed to respond, manage a potential or existing business relationship, and meet applicable obligations. We use reasonable measures to protect it, but no online transmission or storage method can be guaranteed completely secure.",
  },
  {
    title: "Your choices",
    body: "You may contact us to ask about, correct, or request deletion of personal information you have submitted, subject to legal and operational requirements.",
  },
  {
    title: "Contact",
    body: "For privacy questions or requests, email Info@digitaladdagagency.com or call +91 93551 21681.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#08001a] px-5 pb-24 pt-16 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
          DigitalAdda
        </p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">Privacy Policy</h1>
        <p className="mt-5 leading-7 text-slate-300">
          This notice explains how information submitted through this website
          may be handled. It applies to website enquiries and is not a substitute
          for any separate agreement with a client.
        </p>
        <div className="mt-10 space-y-8">
          {sections.map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-2 leading-7 text-slate-400">{body}</p>
            </section>
          ))}
        </div>
        <Link href="/" className="mt-10 inline-flex text-sm font-bold text-fuchsia-200 hover:text-white">
          Back to home
        </Link>
      </article>
    </main>
  );
}

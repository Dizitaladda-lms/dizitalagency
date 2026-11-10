import Link from "next/link";

export const metadata = {
  title: "Terms of Use | DigitalAdda",
  description: "Terms for using the DigitalAdda Agency website.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-16 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
          DigitalAdda
        </p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">Terms of Use</h1>
        <p className="mt-5 leading-7 text-slate-300">
          By using this website, you agree to use it lawfully and not to
          interfere with its operation or attempt unauthorized access.
        </p>
        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-bold">Website information</h2>
            <p className="mt-2 leading-7 text-slate-400">
              Website content is provided for general information about
              DigitalAdda and its services. Details may change, and you should
              confirm the current scope, fees, and terms with us before making a
              business decision.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Services and outcomes</h2>
            <p className="mt-2 leading-7 text-slate-400">
              Any services are subject to a separate proposal or agreement.
              Marketing outcomes depend on many factors and past examples are
              not a guarantee of future performance or specific results.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Third-party links</h2>
            <p className="mt-2 leading-7 text-slate-400">
              This website may link to third-party websites or services.
              DigitalAdda does not control their content or terms, and their
              policies apply when you use them.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="mt-2 leading-7 text-slate-400">
              Questions about these terms can be sent to{" "}
              <a
                href="mailto:Info@digitaladdagagency.com"
                className="text-fuchsia-200 hover:text-white"
              >
                Info@digitaladdagagency.com
              </a>
              .
            </p>
          </section>
        </div>
        <Link href="/" className="mt-10 inline-flex text-sm font-bold text-fuchsia-200 hover:text-white">
          Back to home
        </Link>
      </article>
    </main>
  );
}

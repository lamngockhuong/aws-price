import { services, getAllCategories, getServicesWithPricing } from '@/lib/data/services';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import Link from 'next/link';

export const metadata = {
  title: 'About | AWS Price Tracker',
  description: 'Learn more about AWS Price Tracker - a tool to view and compare pricing for AWS services',
};

export default function AboutPage() {
  const categories = getAllCategories();
  const servicesWithPricing = getServicesWithPricing();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            About AWS Price Tracker
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A comprehensive tool to view and compare pricing for AWS services
          </p>
        </div>

        {/* Project Description */}
        <div className="mb-12">
          <SectionHeader title="Project Overview" subtitle="What is AWS Price Tracker?" />
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              AWS Price Tracker is an open-source project designed to help developers, architects, and
              businesses easily view and compare pricing for AWS services. The platform provides a
              clear, organized format to explore pricing information across multiple AWS services and regions.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <SectionHeader title="Features" subtitle="What you can do with AWS Price Tracker" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                📊 Comprehensive Service Coverage
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                View pricing for {services.length} AWS services across {categories.length} categories
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                💰 Detailed Pricing Data
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Access detailed pricing information for {servicesWithPricing.length} services with real-time data
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                🔍 Search & Filter
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Easily search and filter services by category, name, or description
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                🌓 Dark Mode
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Enjoy a comfortable viewing experience with dark mode support
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                📱 Responsive Design
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Access pricing information from any device with a fully responsive design
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                🚀 Fast Performance
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Static site generation ensures fast loading times and optimal performance
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <SectionHeader title="Tech Stack" subtitle="Built with modern technologies" />
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Frontend</h3>
                <ul className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                  <li>• Next.js 16.0.1</li>
                  <li>• React 19.2.0</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS 4</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Tools & Services</h3>
                <ul className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                  <li>• pnpm</li>
                  <li>• AWS Pricing Calculator API</li>
                  <li>• GitHub Pages</li>
                  <li>• Cloudflare Pages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="mb-12">
          <SectionHeader title="Data Source" subtitle="Where does the pricing data come from?" />
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              All pricing data is sourced from the official{' '}
              <a
                href="https://calculator.aws/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                AWS Pricing Calculator
              </a>
              . The data is regularly updated to ensure accuracy and reflect the latest pricing information.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Please note that pricing may vary by region and is subject to change. Always verify current pricing
              on the official AWS website for the most up-to-date information.
            </p>
          </div>
        </div>

        {/* Contact & Links */}
        <div className="mb-12">
          <SectionHeader title="Contact & Links" subtitle="Get in touch or contribute" />
          <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Author</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <a
                    href="https://khuong.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    Lam Ngoc Khuong
                  </a>
                  {' '}
                  <span className="text-zinc-500 dark:text-zinc-500">(hi@khuong.dev)</span>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Repository</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <a
                    href="https://github.com/lamngockhuong/aws-price"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    GitHub - lamngockhuong/aws-price
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Issues & Feedback</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Found a bug or have a suggestion?{' '}
                  <a
                    href="https://github.com/lamngockhuong/aws-price/issues/new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    Report an issue
                  </a>
                  {' '}on GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}


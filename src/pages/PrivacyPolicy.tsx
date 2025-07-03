import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Settings } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center text-amazon-orange hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculator
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p>
                At Smart Discount Calculator, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Eye className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">What We DON'T Collect</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Personal identifying information</li>
                    <li>• Financial or payment data</li>
                    <li>• Shopping cart contents</li>
                    <li>• Calculation results</li>
                    <li>• User accounts or profiles</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Settings className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">What We DO Collect</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Anonymous usage statistics</li>
                    <li>• Device and browser information</li>
                    <li>• Page views and interactions</li>
                    <li>• Error logs (anonymized)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Information</h2>
              <p className="mb-4">The limited information we collect is used solely to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve the performance and functionality of our calculator</li>
                <li>Identify and fix technical issues</li>
                <li>Understand how users interact with our service</li>
                <li>Ensure the security and stability of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Local Storage</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Lock className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Your Data Stays on Your Device</h3>
                    <p className="text-blue-800 text-sm">
                      All your calculation data, shopping cart items, and preferences are stored locally in your browser. 
                      This information never leaves your device and is automatically deleted when you clear your browser data.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="mb-4">We may use the following third-party services:</p>
              <div className="space-y-3">
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-medium text-gray-900">Analytics Services</h4>
                  <p className="text-sm text-gray-600">Anonymous usage analytics to improve our service (Google Analytics or similar)</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-medium text-gray-900">Hosting Providers</h4>
                  <p className="text-sm text-gray-600">Vercel or similar platforms for hosting our application</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-medium text-gray-900">CDN Services</h4>
                  <p className="text-sm text-gray-600">Content delivery networks for faster loading times</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Built with Security in Mind</h3>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• HTTPS encryption for all connections</li>
                      <li>• No server-side storage of personal data</li>
                      <li>• Regular security updates and monitoring</li>
                      <li>• Minimal data collection approach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our service without providing any personal information</li>
                <li>Clear your local browser data at any time</li>
                <li>Request information about our data practices</li>
                <li>Contact us with privacy-related questions or concerns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies</h2>
              <p className="mb-4">
                We use minimal, essential cookies and local storage to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your calculator preferences</li>
                <li>Store your shopping cart items locally</li>
                <li>Ensure the proper functioning of our service</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                These are functional cookies only - no tracking or advertising cookies are used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p>
                Our service is designed for general audiences and does not knowingly collect any information from children under 13. 
                If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> dreamcatcherluo@gmail.com</p>
                <p className="text-sm text-gray-600 mt-2">
                  We will respond to privacy inquiries within 48 hours.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}; 
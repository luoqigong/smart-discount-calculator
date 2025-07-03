import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const TermsOfService: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Smart Discount Calculator ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="mb-4">
                Smart Discount Calculator is a free online tool that helps users calculate discounts, savings, and final prices for shopping purposes. The service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Single item discount calculations</li>
                <li>Shopping cart with multiple items</li>
                <li>Various discount types (percentage, fixed amount, coupons, etc.)</li>
                <li>Tax and shipping calculations</li>
                <li>Advanced discount rules (spend & save, quantity discounts)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for lawful purposes only</li>
                <li>Provide accurate information when using calculations</li>
                <li>Not attempt to interfere with the service's operation</li>
                <li>Not use the service to violate any applicable laws or regulations</li>
                <li>Verify calculation results before making purchasing decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Accuracy of Calculations</h2>
              <p className="mb-4">
                While we strive to provide accurate calculations, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All calculations are estimates and should be verified</li>
                <li>Tax rates and regulations vary by location and may change</li>
                <li>Shipping costs are estimates and may vary by retailer</li>
                <li>Discount rules may have specific terms and conditions from retailers</li>
                <li>Final prices may differ due to retailer-specific policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are and will remain the exclusive property of Smart Discount Calculator and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
              <p className="mb-4">
                The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The accuracy, reliability, or completeness of calculations</li>
                <li>The availability or uninterrupted operation of the service</li>
                <li>The fitness for a particular purpose</li>
                <li>The absence of errors or bugs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall Smart Discount Calculator be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Modifications to Service</h2>
              <p>
                We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms of Service at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> dreamcatcherluo@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}; 
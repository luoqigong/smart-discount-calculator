import React from 'react';
import { ArrowLeft, Calculator, ShoppingCart, Percent, Tags } from 'lucide-react';

export const About: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Smart Discount Calculator</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Do</h2>
              <p className="mb-4">
                Smart Discount Calculator is a comprehensive online tool designed to help shoppers make informed purchasing decisions by calculating exact savings, discounts, and final prices. Whether you're shopping for a single item or managing a full shopping cart, our calculator provides accurate, real-time calculations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Calculator className="w-6 h-6 text-amazon-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Single Item Calculator</h3>
                    <p className="text-sm">Calculate discounts, apply coupons, add taxes and shipping for individual items.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ShoppingCart className="w-6 h-6 text-amazon-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Shopping Cart Mode</h3>
                    <p className="text-sm">Manage multiple items, quantities, and calculate total savings across your entire cart.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Percent className="w-6 h-6 text-amazon-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Advanced Discount Rules</h3>
                    <p className="text-sm">Apply complex discount rules like "Spend $X, Save $Y" and quantity-based discounts.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Tags className="w-6 h-6 text-amazon-orange mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Multiple Discount Types</h3>
                    <p className="text-sm">Combine percentage discounts, fixed amounts, coupon codes, and promotional offers.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amazon-orange rounded-full mr-3"></span>
                    <span><strong>100% Free:</strong> No registration, no hidden fees, no premium features to unlock</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amazon-orange rounded-full mr-3"></span>
                    <span><strong>Privacy-Focused:</strong> All calculations happen in your browser - we don't store your data</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amazon-orange rounded-full mr-3"></span>
                    <span><strong>Accurate Results:</strong> Precise calculations you can trust for your shopping decisions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amazon-orange rounded-full mr-3"></span>
                    <span><strong>Mobile-Friendly:</strong> Works perfectly on all devices - desktop, tablet, or mobile</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amazon-orange rounded-full mr-3"></span>
                    <span><strong>Always Updated:</strong> We continuously improve features based on user feedback</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amazon-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Enter Your Item Details</h3>
                    <p className="text-gray-600">Add your item's original price, name, and quantity</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amazon-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Apply Discounts & Rules</h3>
                    <p className="text-gray-600">Set up percentage discounts, coupons, promotional codes, and advanced discount rules</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amazon-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Add Tax & Shipping</h3>
                    <p className="text-gray-600">Include sales tax and shipping costs for accurate final pricing</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amazon-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Get Instant Results</h3>
                    <p className="text-gray-600">See your total savings, discount breakdown, and final price instantly</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Perfect For</h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Online Shoppers</h3>
                  <p className="text-blue-700">Compare deals, calculate final prices before checkout, and maximize your savings.</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Budget Planners</h3>
                  <p className="text-green-700">Plan your shopping budget accurately with precise cost calculations.</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Deal Hunters</h3>
                  <p className="text-purple-700">Quickly evaluate complex promotional offers and find the best deals.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact & Support</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">Have questions, suggestions, or need help? We'd love to hear from you!</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> dreamcatcherluo@gmail.com</p>
                 </div>
                <p className="text-sm text-gray-600 mt-4">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}; 
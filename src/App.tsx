import { Calculator } from 'lucide-react';
import { InputForm } from './components/Calculator/InputForm';
import { ResultDisplay } from './components/Calculator/ResultDisplay';
import { Footer } from './components/Footer';
import { useCalculator } from './hooks/useCalculator';

function App() {
  const {
    params,
    result,
    isCalculating,
    calculatorMode,
    updateParams,
    reset,
    switchMode,
    addCartItem,
    updateCartItem,
    removeCartItem,
    addFullReductionRule,
    updateFullReductionRule,
    removeFullReductionRule,
    addQuantityDiscountRule,
    updateQuantityDiscountRule,
    removeQuantityDiscountRule,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-amazon-orange p-2 rounded-lg">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Smart Discount Calculator
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden xs:block">
                  Multi-item cart with spend & save and quantity discounts
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {/* Input Form */}
          <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <InputForm
              params={params}
              onParamsChange={updateParams}
              onReset={reset}
              isCalculating={isCalculating}
              calculatorMode={calculatorMode}
              onSwitchMode={switchMode}
              onAddCartItem={addCartItem}
              onUpdateCartItem={updateCartItem}
              onRemoveCartItem={removeCartItem}
              onAddFullReduction={addFullReductionRule}
              onUpdateFullReduction={updateFullReductionRule}
              onRemoveFullReduction={removeFullReductionRule}
              onAddQuantityDiscount={addQuantityDiscountRule}
              onUpdateQuantityDiscount={updateQuantityDiscountRule}
              onRemoveQuantityDiscount={removeQuantityDiscountRule}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-2 lg:sticky lg:top-8 h-fit">
            <ResultDisplay
              result={result}
              isCalculating={isCalculating}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Why Choose Our Discount Calculator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="bg-amazon-orange/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-amazon-orange" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Multi-Item Shopping Cart</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Add multiple items with different prices and quantities. Automatically calculate totals and apply various discount combinations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-success-green/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-success-green">🏷️</div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Advanced Discount Rules</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Spend & save offers, quantity discounts (most/least expensive items), coupons and more - all intelligently stacked.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600">⚡</div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Real-Time Smart Calculation</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                See live calculation steps and discount breakdowns, so you understand how each discount is applied.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">How accurate are the calculations?</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Our calculator uses standard discount and tax calculation methods with 95%+ accuracy. 
                However, final prices may vary due to store-specific policies or promotional terms.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Can I use this for any online store?</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Yes! This calculator works for any online store. Simply enter the discount types 
                and shipping options that apply to your purchase.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">What types of discounts are supported?</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                We support percentage and fixed-amount discounts, spend & save offers, quantity discounts,
                coupons, promo codes, membership discounts, and bulk purchase discounts.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">How do quantity discounts work?</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                You can choose to apply discounts to the most expensive items, least expensive items, 
                or all items when you buy a certain quantity. Perfect for "buy 2 get 20% off" deals.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App; 
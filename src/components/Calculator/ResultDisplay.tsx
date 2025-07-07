import React from 'react';
import { CheckCircle, TrendingDown, Copy, Share2 } from 'lucide-react';
import { Button } from '../UI/Button';
import { CalculationResult } from '../../types/calculator';
import { formatCurrency, formatPercentage } from '../../utils/calculations';

interface ResultDisplayProps {
  result: CalculationResult | null;
  isCalculating: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  isCalculating
}) => {
  const copyResults = () => {
    if (!result) return;
    
    const text = `
💰 Price Breakdown:
Original Price: ${formatCurrency(result.originalPrice)}
Total Savings: ${formatCurrency(result.totalSavings)} (${formatPercentage(result.savingsPercentage)})
Pre-tax Price: ${formatCurrency(result.preTaxPrice)}
Estimated Tax: ${formatCurrency(result.estimatedTax)}
Shipping: ${result.shippingCost > 0 ? formatCurrency(result.shippingCost) : 'FREE'}

🎯 FINAL PRICE: ${formatCurrency(result.finalPrice)}
    `.trim();
    
    navigator.clipboard.writeText(text).then(() => {
      // You could show a toast notification here
    });
  };

  const shareResults = () => {
    if (!result) return;
    
    const text = `Check out this deal! Original: ${formatCurrency(result.originalPrice)} → Final: ${formatCurrency(result.finalPrice)} (${formatPercentage(result.savingsPercentage)} off!)`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Smart Discount Calculator Results',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(text);
    }
  };

  if (isCalculating) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="animate-pulse space-y-3 sm:space-y-4">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-2 sm:h-3 bg-gray-200 rounded"></div>
            <div className="h-2 sm:h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sm:p-8 text-center">
        <div className="text-gray-400 mb-3 sm:mb-4">
          <TrendingDown className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
          Ready to Calculate
        </h3>
        <p className="text-sm sm:text-base text-gray-400">
          Enter an original price to see your savings
        </p>
      </div>
    );
  }

  const getSavingsMessage = (percentage: number) => {
    if (percentage >= 30) return { message: "🔥 Amazing deal!", color: "text-green-600" };
    if (percentage >= 20) return { message: "✨ Great savings!", color: "text-green-500" };
    if (percentage >= 10) return { message: "👍 Good discount!", color: "text-blue-500" };
    if (percentage > 0) return { message: "💰 Some savings", color: "text-gray-600" };
    return { message: "💡 No discounts applied", color: "text-gray-500" };
  };

  const savingsInfo = getSavingsMessage(result.savingsPercentage);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amazon-orange to-orange-500 text-white p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-base sm:text-xl font-semibold">Calculation Results</h2>
        </div>
        
        {/* Final Price */}
        <div className="text-center">
          <p className="text-xs sm:text-sm opacity-90 mb-1">Estimated Final Price</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{formatCurrency(result.finalPrice)}</p>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Savings Summary */}
        {result.totalSavings > 0 && (
          <div className="bg-success-green/10 border border-success-green/20 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-success-green font-medium">Total Savings</p>
                <p className="text-xl sm:text-2xl font-bold text-success-green">
                  {formatCurrency(result.totalSavings)}
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs sm:text-sm text-success-green font-medium">Percentage Off</p>
                <p className="text-xl sm:text-2xl font-bold text-success-green">
                  {formatPercentage(result.savingsPercentage)}
                </p>
              </div>
            </div>
            <p className={`text-xs sm:text-sm font-medium mt-2 text-center sm:text-left ${savingsInfo.color}`}>
              {savingsInfo.message}
            </p>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 border-b pb-2">Price Breakdown</h3>
          
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Original Price:</span>
              <span className="font-medium">{formatCurrency(result.originalPrice)}</span>
            </div>
            
            {result.discountBreakdown.otherDiscount > 0 && (
              <div className="flex justify-between items-center text-success-green">
                <span>- Other Discount:</span>
                <span>-{formatCurrency(result.discountBreakdown.otherDiscount)}</span>
              </div>
            )}
            
            {result.discountBreakdown.coupon > 0 && (
              <div className="flex justify-between items-center text-success-green">
                <span>- Coupon:</span>
                <span>-{formatCurrency(result.discountBreakdown.coupon)}</span>
              </div>
            )}
            
            {result.discountBreakdown.promoCode > 0 && (
              <div className="flex justify-between items-center text-success-green">
                <span>- Promo Code:</span>
                <span>-{formatCurrency(result.discountBreakdown.promoCode)}</span>
              </div>
            )}
            
            <hr className="border-gray-200 my-2" />
            
            <div className="flex justify-between items-center font-medium">
              <span>Pre-tax Price:</span>
              <span>{formatCurrency(result.preTaxPrice)}</span>
            </div>
            
            {result.estimatedTax > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">+ Sales Tax:</span>
                <span>{formatCurrency(result.estimatedTax)}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">+ Shipping:</span>
              <span>{result.shippingCost > 0 ? formatCurrency(result.shippingCost) : 'FREE'}</span>
            </div>
            
            <hr className="border-gray-300 my-2" />
            
            <div className="flex justify-between items-center text-base sm:text-lg font-bold text-amazon-orange">
              <span>Final Price:</span>
              <span>{formatCurrency(result.finalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={copyResults}
            className="flex-1"
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Copy Results</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={shareResults}
            className="flex-1"
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">Share</span>
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 bg-gray-50 rounded p-2 sm:p-3">
          <p className="font-medium mb-1">⚠️ Important Notice:</p>
          <p className="text-xs">
            This is an estimate for reference only. Final prices may vary due to additional fees, 
            taxes, or promotional terms. Please verify the exact amount at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}; 
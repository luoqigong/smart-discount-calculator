import React, { useState } from 'react';
import { Calculator, Percent, DollarSign, Truck, Receipt, ShoppingCart as CartIcon } from 'lucide-react';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import { CalculationParams } from '../../types/calculator';
// Removed validation imports as we now handle validation inline for number inputs
import { ShoppingCart } from './ShoppingCart';
import { DiscountRules } from './DiscountRules';

interface InputFormProps {
  params: CalculationParams;
  onParamsChange: (updates: Partial<CalculationParams>) => void;
  onReset: () => void;
  isCalculating: boolean;
  calculatorMode: 'single' | 'cart';
  onSwitchMode: (mode: 'single' | 'cart') => void;
  // Shopping cart methods
  onAddCartItem: (item: Omit<import('../../types/calculator').CartItem, 'id'>) => void;
  onUpdateCartItem: (id: string, updates: Partial<Omit<import('../../types/calculator').CartItem, 'id'>>) => void;
  onRemoveCartItem: (id: string) => void;
  // Discount rules methods
  onAddFullReduction: (rule: Omit<import('../../types/calculator').FullReductionRule, 'id'>) => void;
  onUpdateFullReduction: (id: string, updates: Partial<Omit<import('../../types/calculator').FullReductionRule, 'id'>>) => void;
  onRemoveFullReduction: (id: string) => void;
  onAddQuantityDiscount: (rule: Omit<import('../../types/calculator').QuantityDiscountRule, 'id'>) => void;
  onUpdateQuantityDiscount: (id: string, updates: Partial<Omit<import('../../types/calculator').QuantityDiscountRule, 'id'>>) => void;
  onRemoveQuantityDiscount: (id: string) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  params,
  onParamsChange,
  onReset,
  isCalculating,
  calculatorMode,
  onSwitchMode,
  onAddCartItem,
  onUpdateCartItem,
  onRemoveCartItem,
  onAddFullReduction,
  onUpdateFullReduction,
  onRemoveFullReduction,
  onAddQuantityDiscount,
  onUpdateQuantityDiscount,
  onRemoveQuantityDiscount
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponType, setCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [promoType, setPromoType] = useState<'percentage' | 'fixed'>('percentage');
  const [otherDiscountType, setOtherDiscountType] = useState<'percentage' | 'fixed'>('percentage');

  const handleOriginalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : parseFloat(value);
    
    // For number inputs, we only validate the numeric value when there's an actual value
    if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > 999999)) {
      const errorMessage = 
        isNaN(numValue) ? 'Please enter a valid number' :
        numValue < 0 ? 'Price cannot be negative' :
        'Price seems too high';
      setErrors(prev => ({ ...prev, originalPrice: errorMessage }));
    } else {
      setErrors(prev => ({ ...prev, originalPrice: '' }));
    }
    
    onParamsChange({ originalPrice: numValue });
  };

  const handleCouponChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    
    // Only validate when there's an actual value
    if (value !== '' && (isNaN(numValue) || numValue < 0 || (couponType === 'percentage' && numValue > 100))) {
      const errorMessage = 
        isNaN(numValue) ? 'Please enter a valid number' :
        numValue < 0 ? 'Discount cannot be negative' :
        'Percentage cannot exceed 100%';
      setErrors(prev => ({ ...prev, coupon: errorMessage }));
    } else {
      setErrors(prev => ({ ...prev, coupon: '' }));
    }
    
    onParamsChange({
      coupon: numValue > 0 ? { value: numValue, isPercentage: couponType === 'percentage' } : undefined
    });
  };

  const handlePromoCodeChange = (value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    
    // Only validate when there's an actual value
    if (value !== '' && (isNaN(numValue) || numValue < 0 || (promoType === 'percentage' && numValue > 100))) {
      const errorMessage = 
        isNaN(numValue) ? 'Please enter a valid number' :
        numValue < 0 ? 'Discount cannot be negative' :
        'Percentage cannot exceed 100%';
      setErrors(prev => ({ ...prev, promoCode: errorMessage }));
    } else {
      setErrors(prev => ({ ...prev, promoCode: '' }));
    }
    
    onParamsChange({
      promoCode: numValue > 0 ? { value: numValue, isPercentage: promoType === 'percentage' } : undefined
    });
  };

  const handleOtherDiscountChange = (value: string, type: 'membership' | 'subscription' | 'bulk' | 'custom') => {
    const numValue = value === '' ? 0 : parseFloat(value);
    
    // Only validate when there's an actual value
    if (value !== '' && (isNaN(numValue) || numValue < 0 || (otherDiscountType === 'percentage' && numValue > 100))) {
      const errorMessage = 
        isNaN(numValue) ? 'Please enter a valid number' :
        numValue < 0 ? 'Discount cannot be negative' :
        'Percentage cannot exceed 100%';
      setErrors(prev => ({ ...prev, otherDiscount: errorMessage }));
    } else {
      setErrors(prev => ({ ...prev, otherDiscount: '' }));
    }
    
    onParamsChange({
      otherDiscount: numValue > 0 ? { 
        value: numValue, 
        isPercentage: otherDiscountType === 'percentage',
        type
      } : undefined
    });
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : parseFloat(value);
    
    // For number inputs, we only validate the numeric value when there's an actual value
    if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > 50)) {
      const errorMessage = 
        isNaN(numValue) ? 'Please enter a valid tax rate' :
        numValue < 0 ? 'Tax rate cannot be negative' :
        'Tax rate seems too high (>50%)';
      setErrors(prev => ({ ...prev, taxRate: errorMessage }));
    } else {
      setErrors(prev => ({ ...prev, taxRate: '' }));
    }
    
    onParamsChange({ taxRate: numValue });
  };

  const handleShippingChange = (type: string, customCost?: string) => {
    let shippingCost = 0;
    
    if (type === 'custom' && customCost) {
      const parsed = parseFloat(customCost);
      shippingCost = isNaN(parsed) ? 0 : parsed;
    } else if (type === 'standard') {
      shippingCost = 5.99;
    } else if (type === 'express') {
      shippingCost = 12.99;
    }
    
    onParamsChange({
      shipping: {
        type: type as any,
        cost: shippingCost
      }
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-amazon-orange" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Discount Calculator</h2>
        </div>
        
        {/* Mode Toggle Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
            <button
              onClick={() => onSwitchMode('single')}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                calculatorMode === 'single'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Single Item</span>
                <span className="xs:hidden">Single</span>
              </div>
            </button>
            <button
              onClick={() => onSwitchMode('cart')}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                calculatorMode === 'cart'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <CartIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Shopping Cart</span>
                <span className="xs:hidden">Cart</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Shopping Cart Mode Content */}
      {calculatorMode === 'cart' && (
        <>
          <ShoppingCart
            items={params.cartItems}
            onAddItem={onAddCartItem}
            onUpdateItem={onUpdateCartItem}
            onRemoveItem={onRemoveCartItem}
          />
          
          <DiscountRules
            fullReductionRules={params.fullReductionRules}
            quantityDiscountRules={params.quantityDiscountRules}
            onAddFullReduction={onAddFullReduction}
            onUpdateFullReduction={onUpdateFullReduction}
            onRemoveFullReduction={onRemoveFullReduction}
            onAddQuantityDiscount={onAddQuantityDiscount}
            onUpdateQuantityDiscount={onUpdateQuantityDiscount}
            onRemoveQuantityDiscount={onRemoveQuantityDiscount}
          />
        </>
      )}

      {/* Single Item Mode Content */}
      {calculatorMode === 'single' && (
        <>
          {/* Original Price */}
          <Input
            label="Original Price"
            type="number"
            step="0.01"
            placeholder="99.99"
            prefix="$"
            value={params.originalPrice !== undefined && params.originalPrice !== null ? params.originalPrice.toString() : ''}
            onChange={handleOriginalPriceChange}
            error={errors.originalPrice}
            helpText="Enter the item's original price"
          />
        </>
      )}

      {/* Common Settings Section */}
      <div className="border-t pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">General Settings</h3>
        
        {/* Coupon */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <Receipt className="w-3 h-3 sm:w-4 sm:h-4" />
              Coupon (Optional)
            </span>
          </label>
          <div className="flex gap-2">
            <Select
              options={[
                { value: 'percentage', label: '%' },
                { value: 'fixed', label: '$' }
              ]}
              value={couponType}
              onChange={(e) => setCouponType(e.target.value as any)}
              className="w-16 sm:w-20"
            />
            <Input
              type="text"
              placeholder={couponType === 'percentage' ? '10' : '5.00'}
              onChange={(e) => handleCouponChange(e.target.value)}
              error={errors.coupon}
              className="flex-1"
            />
          </div>
        </div>

        {/* Promo Code */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <Percent className="w-3 h-3 sm:w-4 sm:h-4" />
              Promo Code (Optional)
            </span>
          </label>
          <div className="flex gap-2">
            <Select
              options={[
                { value: 'percentage', label: '%' },
                { value: 'fixed', label: '$' }
              ]}
              value={promoType}
              onChange={(e) => setPromoType(e.target.value as any)}
              className="w-16 sm:w-20"
            />
            <Input
              type="text"
              placeholder={promoType === 'percentage' ? '15' : '10.00'}
              onChange={(e) => handlePromoCodeChange(e.target.value)}
              error={errors.promoCode}
              className="flex-1"
            />
          </div>
        </div>

        {/* Other Discounts */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
              Other Discounts (Optional)
            </span>
          </label>
          <div className="space-y-2">
            <Select
              options={[
                { value: 'membership', label: 'Membership Discount' },
                { value: 'subscription', label: 'Subscription Discount' },
                { value: 'bulk', label: 'Bulk Purchase Discount' },
                { value: 'custom', label: 'Other Discount' }
              ]}
              value={params.otherDiscount?.type || 'membership'}
              onChange={(e) => handleOtherDiscountChange('', e.target.value as any)}
            />
            <div className="flex gap-2">
              <Select
                options={[
                  { value: 'percentage', label: '%' },
                  { value: 'fixed', label: '$' }
                ]}
                value={otherDiscountType}
                onChange={(e) => setOtherDiscountType(e.target.value as any)}
                className="w-16 sm:w-20"
              />
              <Input
                type="text"
                placeholder={otherDiscountType === 'percentage' ? '5' : '3.00'}
                onChange={(e) => handleOtherDiscountChange(e.target.value, params.otherDiscount?.type || 'membership')}
                error={errors.otherDiscount}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Tax Rate */}
        <Input
          label="Sales Tax Rate"
          type="number"
          step="0.01"
          placeholder="8.25"
          suffix="%"
          value={params.taxRate !== undefined && params.taxRate !== null ? params.taxRate.toString() : ''}
          onChange={handleTaxRateChange}
          error={errors.taxRate}
          helpText="Enter your local sales tax rate"
        />

        {/* Shipping */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
              Shipping Options
            </span>
          </label>
          <Select
            options={[
              { value: 'free', label: 'Free Shipping' },
              { value: 'standard', label: 'Standard ($5.99)' },
              { value: 'express', label: 'Express ($12.99)' },
              { value: 'custom', label: 'Custom Cost' }
            ]}
            value={params.shipping.type}
            onChange={(e) => handleShippingChange(e.target.value)}
          />
          {params.shipping.type === 'custom' && (
            <Input
              type="text"
              placeholder="7.50"
              prefix="$"
              onChange={(e) => handleShippingChange('custom', e.target.value)}
              helpText="Enter custom shipping cost"
            />
          )}
        </div>

        {/* Reset Button */}
        <div className="pt-3 sm:pt-4">
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full"
            disabled={isCalculating}
          >
            Reset All Fields
          </Button>
        </div>
      </div>
    </div>
  );
}; 
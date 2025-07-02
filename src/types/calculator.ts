export interface Discount {
  value: number;
  isPercentage: boolean;
}

export interface OtherDiscount extends Discount {
  type: 'membership' | 'subscription' | 'bulk' | 'custom';
  label?: string;
}

export interface ShippingOption {
  type: 'free' | 'standard' | 'express' | 'custom';
  cost: number;
  label?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface FullReductionRule {
  id: string;
  threshold: number;
  reduction: number;
  description: string;
  enabled: boolean;
}

export interface QuantityDiscountRule {
  id: string;
  minQuantity: number;
  discountPercentage: number;
  strategy: 'highest' | 'lowest' | 'all';
  description: string;
  enabled: boolean;
}

export interface CalculationParams {
  originalPrice: number;
  cartItems: CartItem[];
  fullReductionRules: FullReductionRule[];
  quantityDiscountRules: QuantityDiscountRule[];
  otherDiscount?: OtherDiscount;
  coupon?: Discount;
  promoCode?: Discount;
  taxRate: number;
  shipping: ShippingOption;
}

export interface CalculationResult {
  originalPrice: number;
  cartSubtotal: number;
  cartItemCount: number;
  fullReductionSavings: number;
  quantityDiscountSavings: number;
  preTaxPrice: number;
  totalSavings: number;
  savingsPercentage: number;
  estimatedTax: number;
  shippingCost: number;
  finalPrice: number;
  discountBreakdown: {
    fullReduction: number;
    quantityDiscount: number;
    otherDiscount: number;
    coupon: number;
    promoCode: number;
  };
}

export interface CalculationStep {
  description: string;
  amount: number;
  isDeduction: boolean;
  runningTotal: number;
} 
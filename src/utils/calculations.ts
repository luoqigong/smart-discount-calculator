import { CalculationParams, CalculationResult, Discount, CalculationStep, CartItem, FullReductionRule, QuantityDiscountRule } from '../types/calculator';

export function applyDiscount(price: number, discount: Discount): number {
  if (discount.isPercentage) {
    return price * (1 - discount.value / 100);
  }
  return Math.max(0, price - discount.value);
}

export function calculateDiscountAmount(price: number, discount: Discount): number {
  if (discount.isPercentage) {
    return price * (discount.value / 100);
  }
  return Math.min(discount.value, price);
}

export function calculateShipping(_preTaxPrice: number, shipping: any): number {
  if (shipping.type === 'free') {
    return 0;
  }
  return shipping.cost || 0;
}

export function calculateCartSubtotal(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function calculateCartItemCount(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

export function applyBestFullReduction(subtotal: number, rules: FullReductionRule[]): { amount: number; rule: FullReductionRule | null } {
  const applicableRules = rules
    .filter(rule => rule.enabled && subtotal >= rule.threshold)
    .sort((a, b) => b.reduction - a.reduction);

  if (applicableRules.length > 0) {
    const bestRule = applicableRules[0];
    return { amount: bestRule.reduction, rule: bestRule };
  }

  return { amount: 0, rule: null };
}

export function applyBestQuantityDiscount(cartItems: CartItem[], rules: QuantityDiscountRule[]): { 
  items: CartItem[]; 
  savings: number; 
  rule: QuantityDiscountRule | null 
} {
  const totalQuantity = calculateCartItemCount(cartItems);
  const applicableRules = rules
    .filter(rule => rule.enabled && totalQuantity >= rule.minQuantity)
    .sort((a, b) => a.discountPercentage - b.discountPercentage);

  if (applicableRules.length === 0) {
    return { items: cartItems, savings: 0, rule: null };
  }

  const bestRule = applicableRules[0];
  const discountMultiplier = bestRule.discountPercentage / 100;

  const expandedItems = cartItems.flatMap(item => 
    Array(item.quantity).fill(null).map((_, index) => ({
      ...item,
      id: `${item.id}_${index}`,
      quantity: 1
    }))
  );

  let discountedItems: CartItem[] = [];
  let savings = 0;

  switch (bestRule.strategy) {
    case 'highest':
      const sortedByPriceDesc = [...expandedItems].sort((a, b) => b.price - a.price);
      discountedItems = sortedByPriceDesc.map((item, index) => {
        if (index < bestRule.minQuantity) {
          const originalPrice = item.price;
          const discountedPrice = originalPrice * discountMultiplier;
          savings += originalPrice - discountedPrice;
          return { ...item, price: discountedPrice };
        }
        return item;
      });
      break;

    case 'lowest':
      const sortedByPriceAsc = [...expandedItems].sort((a, b) => a.price - b.price);
      discountedItems = sortedByPriceAsc.map((item, index) => {
        if (index < bestRule.minQuantity) {
          const originalPrice = item.price;
          const discountedPrice = originalPrice * discountMultiplier;
          savings += originalPrice - discountedPrice;
          return { ...item, price: discountedPrice };
        }
        return item;
      });
      break;

    case 'all':
      discountedItems = expandedItems.map(item => {
        const originalPrice = item.price;
        const discountedPrice = originalPrice * discountMultiplier;
        savings += originalPrice - discountedPrice;
        return { ...item, price: discountedPrice };
      });
      break;

    default:
      discountedItems = expandedItems;
  }

  const mergedItems = mergeCartItems(discountedItems);

  return { items: mergedItems, savings, rule: bestRule };
}

function mergeCartItems(expandedItems: CartItem[]): CartItem[] {
  const itemMap = new Map<string, CartItem>();

  expandedItems.forEach(item => {
    const baseId = item.id.split('_')[0];
    const key = `${baseId}_${item.price}`;

    if (itemMap.has(key)) {
      const existingItem = itemMap.get(key)!;
      existingItem.quantity += 1;
    } else {
      itemMap.set(key, {
        ...item,
        id: baseId,
        quantity: 1
      });
    }
  });

  return Array.from(itemMap.values());
}

export function calculatePrice(params: CalculationParams): CalculationResult {
  const isCartMode = params.cartItems && params.cartItems.length > 0;
  
  let currentPrice: number;
  let cartSubtotal = 0;
  let cartItemCount = 0;
  let fullReductionSavings = 0;
  let quantityDiscountSavings = 0;

  if (isCartMode) {
    cartSubtotal = calculateCartSubtotal(params.cartItems);
    cartItemCount = calculateCartItemCount(params.cartItems);
    currentPrice = cartSubtotal;

    const quantityDiscountResult = applyBestQuantityDiscount(params.cartItems, params.quantityDiscountRules || []);
    quantityDiscountSavings = quantityDiscountResult.savings;
    currentPrice = calculateCartSubtotal(quantityDiscountResult.items);

    const fullReductionResult = applyBestFullReduction(currentPrice, params.fullReductionRules || []);
    fullReductionSavings = fullReductionResult.amount;
    currentPrice -= fullReductionSavings;
  } else {
    currentPrice = params.originalPrice;
    cartSubtotal = params.originalPrice;
    cartItemCount = 1;
  }

  const discountBreakdown = {
    fullReduction: fullReductionSavings,
    quantityDiscount: quantityDiscountSavings,
    otherDiscount: 0,
    coupon: 0,
    promoCode: 0,
  };

  if (params.otherDiscount && params.otherDiscount.value > 0) {
    const discountAmount = calculateDiscountAmount(currentPrice, params.otherDiscount);
    discountBreakdown.otherDiscount = discountAmount;
    currentPrice = applyDiscount(currentPrice, params.otherDiscount);
  }

  if (params.coupon && params.coupon.value > 0) {
    const discountAmount = calculateDiscountAmount(currentPrice, params.coupon);
    discountBreakdown.coupon = discountAmount;
    currentPrice = applyDiscount(currentPrice, params.coupon);
  }

  if (params.promoCode && params.promoCode.value > 0) {
    const discountAmount = calculateDiscountAmount(currentPrice, params.promoCode);
    discountBreakdown.promoCode = discountAmount;
    currentPrice = applyDiscount(currentPrice, params.promoCode);
  }

  const preTaxPrice = currentPrice;
  const estimatedTax = preTaxPrice * (params.taxRate / 100);

  const shippingCost = calculateShipping(preTaxPrice, params.shipping);

  const finalPrice = preTaxPrice + estimatedTax + shippingCost;

  const originalTotal = isCartMode ? cartSubtotal : params.originalPrice;
  const totalSavings = originalTotal - preTaxPrice;
  const savingsPercentage = originalTotal > 0 ? (totalSavings / originalTotal) * 100 : 0;

  return {
    originalPrice: isCartMode ? cartSubtotal : params.originalPrice,
    cartSubtotal,
    cartItemCount,
    fullReductionSavings,
    quantityDiscountSavings,
    preTaxPrice,
    totalSavings,
    savingsPercentage,
    estimatedTax,
    shippingCost,
    finalPrice,
    discountBreakdown,
  };
}

export function getCalculationSteps(params: CalculationParams): CalculationStep[] {
  const steps: CalculationStep[] = [];
  const isCartMode = params.cartItems && params.cartItems.length > 0;
  
  let runningTotal: number;

  if (isCartMode) {
    runningTotal = calculateCartSubtotal(params.cartItems);
    steps.push({
      description: `购物车小计 (${calculateCartItemCount(params.cartItems)}件商品)`,
      amount: runningTotal,
      isDeduction: false,
      runningTotal,
    });

    const quantityDiscountResult = applyBestQuantityDiscount(params.cartItems, params.quantityDiscountRules || []);
    if (quantityDiscountResult.savings > 0 && quantityDiscountResult.rule) {
      runningTotal -= quantityDiscountResult.savings;
      steps.push({
        description: quantityDiscountResult.rule.description,
        amount: quantityDiscountResult.savings,
        isDeduction: true,
        runningTotal,
      });
    }

    const fullReductionResult = applyBestFullReduction(runningTotal, params.fullReductionRules || []);
    if (fullReductionResult.amount > 0 && fullReductionResult.rule) {
      runningTotal -= fullReductionResult.amount;
      steps.push({
        description: fullReductionResult.rule.description,
        amount: fullReductionResult.amount,
        isDeduction: true,
        runningTotal,
      });
    }
  } else {
    runningTotal = params.originalPrice;
    steps.push({
      description: 'Original Price',
      amount: params.originalPrice,
      isDeduction: false,
      runningTotal,
    });
  }

  if (params.otherDiscount && params.otherDiscount.value > 0) {
    const discountAmount = calculateDiscountAmount(runningTotal, params.otherDiscount);
    runningTotal -= discountAmount;
    const label = params.otherDiscount.label || getDiscountTypeLabel(params.otherDiscount.type);
    steps.push({
      description: `${label} ${formatDiscount(params.otherDiscount)}`,
      amount: discountAmount,
      isDeduction: true,
      runningTotal,
    });
  }

  if (params.coupon && params.coupon.value > 0) {
    const discountAmount = calculateDiscountAmount(runningTotal, params.coupon);
    runningTotal -= discountAmount;
    steps.push({
      description: `Coupon ${formatDiscount(params.coupon)}`,
      amount: discountAmount,
      isDeduction: true,
      runningTotal,
    });
  }

  if (params.promoCode && params.promoCode.value > 0) {
    const discountAmount = calculateDiscountAmount(runningTotal, params.promoCode);
    runningTotal -= discountAmount;
    steps.push({
      description: `Promo Code ${formatDiscount(params.promoCode)}`,
      amount: discountAmount,
      isDeduction: true,
      runningTotal,
    });
  }

  if (params.taxRate > 0) {
    const taxAmount = runningTotal * (params.taxRate / 100);
    runningTotal += taxAmount;
    steps.push({
      description: `Sales Tax (${params.taxRate}%)`,
      amount: taxAmount,
      isDeduction: false,
      runningTotal,
    });
  }

  const shippingCost = calculateShipping(runningTotal - (runningTotal * (params.taxRate / 100)), params.shipping);
  if (shippingCost > 0) {
    runningTotal += shippingCost;
    steps.push({
      description: 'Shipping',
      amount: shippingCost,
      isDeduction: false,
      runningTotal,
    });
  } else if (params.shipping.type === 'free') {
    steps.push({
      description: 'Shipping',
      amount: 0,
      isDeduction: false,
      runningTotal,
    });
  }

  return steps;
}

function getDiscountTypeLabel(type: string): string {
  switch (type) {
    case 'membership':
      return 'Membership Discount';
    case 'subscription':
      return 'Subscription Discount';
    case 'bulk':
      return 'Bulk Discount';
    case 'custom':
      return 'Other Discount';
    default:
      return 'Discount';
  }
}

function formatDiscount(discount: Discount): string {
  if (discount.isPercentage) {
    return `(${discount.value}%)`;
  }
  return `($${discount.value.toFixed(2)})`;
}

export function formatCurrency(amount: number): string {
  return `$${Math.abs(amount).toFixed(2)}`;
}

export function formatPercentage(percentage: number): string {
  return `${percentage.toFixed(1)}%`;
} 
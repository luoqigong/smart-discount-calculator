import { useState, useCallback, useEffect } from 'react';
import { CalculationParams, CalculationResult, CalculationStep, CartItem, FullReductionRule, QuantityDiscountRule } from '../types/calculator';
import { calculatePrice, getCalculationSteps } from '../utils/calculations';

export const useCalculator = () => {
  const [params, setParams] = useState<CalculationParams>({
    originalPrice: 0,
    cartItems: [],
    fullReductionRules: [],
    quantityDiscountRules: [],
    taxRate: 0,
    shipping: { type: 'free', cost: 0 },
  });
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [steps, setSteps] = useState<CalculationStep[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatorMode, setCalculatorMode] = useState<'single' | 'cart'>('single');

  const calculate = useCallback((newParams: CalculationParams) => {
    setIsCalculating(true);
    
    // Add a small delay to show loading state for better UX
    setTimeout(() => {
      const newResult = calculatePrice(newParams);
      const newSteps = getCalculationSteps(newParams);
      
      setResult(newResult);
      setSteps(newSteps);
      setParams(newParams);
      setIsCalculating(false);
    }, 100);
  }, []);

  const updateParams = useCallback((updates: Partial<CalculationParams>) => {
    const newParams = { ...params, ...updates };
    setParams(newParams);
    
    // Auto-calculate if conditions are met
    const hasItems = calculatorMode === 'cart' ? newParams.cartItems.length > 0 : newParams.originalPrice > 0;
    if (hasItems) {
      calculate(newParams);
    }
  }, [params, calculate, calculatorMode]);

  // 购物车相关方法
  const addCartItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      ...item
    };
    const updatedItems = [...params.cartItems, newItem];
    updateParams({ cartItems: updatedItems });
  }, [params.cartItems, updateParams]);

  const updateCartItem = useCallback((id: string, updates: Partial<Omit<CartItem, 'id'>>) => {
    const updatedItems = params.cartItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    updateParams({ cartItems: updatedItems });
  }, [params.cartItems, updateParams]);

  const removeCartItem = useCallback((id: string) => {
    const updatedItems = params.cartItems.filter(item => item.id !== id);
    updateParams({ cartItems: updatedItems });
  }, [params.cartItems, updateParams]);

  // 满减规则相关方法
  const addFullReductionRule = useCallback((rule: Omit<FullReductionRule, 'id'>) => {
    const newRule: FullReductionRule = {
      id: Date.now().toString(),
      ...rule
    };
    const updatedRules = [...params.fullReductionRules, newRule];
    updateParams({ fullReductionRules: updatedRules });
  }, [params.fullReductionRules, updateParams]);

  const updateFullReductionRule = useCallback((id: string, updates: Partial<Omit<FullReductionRule, 'id'>>) => {
    const updatedRules = params.fullReductionRules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    );
    updateParams({ fullReductionRules: updatedRules });
  }, [params.fullReductionRules, updateParams]);

  const removeFullReductionRule = useCallback((id: string) => {
    const updatedRules = params.fullReductionRules.filter(rule => rule.id !== id);
    updateParams({ fullReductionRules: updatedRules });
  }, [params.fullReductionRules, updateParams]);

  // 数量折扣规则相关方法
  const addQuantityDiscountRule = useCallback((rule: Omit<QuantityDiscountRule, 'id'>) => {
    const newRule: QuantityDiscountRule = {
      id: Date.now().toString(),
      ...rule
    };
    const updatedRules = [...params.quantityDiscountRules, newRule];
    updateParams({ quantityDiscountRules: updatedRules });
  }, [params.quantityDiscountRules, updateParams]);

  const updateQuantityDiscountRule = useCallback((id: string, updates: Partial<Omit<QuantityDiscountRule, 'id'>>) => {
    const updatedRules = params.quantityDiscountRules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    );
    updateParams({ quantityDiscountRules: updatedRules });
  }, [params.quantityDiscountRules, updateParams]);

  const removeQuantityDiscountRule = useCallback((id: string) => {
    const updatedRules = params.quantityDiscountRules.filter(rule => rule.id !== id);
    updateParams({ quantityDiscountRules: updatedRules });
  }, [params.quantityDiscountRules, updateParams]);

  const switchMode = useCallback((mode: 'single' | 'cart') => {
    setCalculatorMode(mode);
    // 切换模式时重置相关数据
    if (mode === 'single') {
      updateParams({ cartItems: [] });
    } else {
      updateParams({ originalPrice: 0 });
    }
  }, [updateParams]);

  const reset = useCallback(() => {
    const defaultParams = {
      originalPrice: 0,
      cartItems: [],
      fullReductionRules: [],
      quantityDiscountRules: [],
      taxRate: 0,
      shipping: { type: 'free' as const, cost: 0 },
    };
    setParams(defaultParams);
    setResult(null);
    setSteps([]);
    setIsCalculating(false);
    setCalculatorMode('single');
  }, []);

  // Auto-calculate when params change and conditions are met
  useEffect(() => {
    const hasItems = calculatorMode === 'cart' ? params.cartItems.length > 0 : params.originalPrice > 0;
    if (hasItems) {
      calculate(params);
    }
  }, [params, calculate, calculatorMode]);

  return {
    params,
    result,
    steps,
    isCalculating,
    calculatorMode,
    
    // 基础方法
    updateParams,
    calculate,
    reset,
    switchMode,
    
    // 购物车相关方法
    addCartItem,
    updateCartItem,
    removeCartItem,
    
    // 满减规则相关方法
    addFullReductionRule,
    updateFullReductionRule,
    removeFullReductionRule,
    
    // 数量折扣规则相关方法
    addQuantityDiscountRule,
    updateQuantityDiscountRule,
    removeQuantityDiscountRule,
  };
}; 
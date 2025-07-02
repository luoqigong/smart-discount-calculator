export function validatePrice(value: string): { isValid: boolean; message?: string } {
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Please enter a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Price cannot be negative' };
  }
  
  if (numValue > 999999) {
    return { isValid: false, message: 'Price seems too high' };
  }
  
  return { isValid: true };
}

export function validateDiscount(value: string, isPercentage: boolean, maxValue?: number): { isValid: boolean; message?: string } {
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Please enter a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Discount cannot be negative' };
  }
  
  if (isPercentage) {
    if (numValue > 100) {
      return { isValid: false, message: 'Percentage cannot exceed 100%' };
    }
  } else {
    if (maxValue && numValue > maxValue) {
      return { isValid: false, message: 'Discount cannot exceed the current price' };
    }
  }
  
  return { isValid: true };
}

export function validateTaxRate(value: string): { isValid: boolean; message?: string } {
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Please enter a valid tax rate' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Tax rate cannot be negative' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Tax rate seems too high (>50%)' };
  }
  
  return { isValid: true };
}

export function parseNumericInput(value: string): number {
  // Remove any non-numeric characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
} 
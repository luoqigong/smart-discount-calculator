import React, { useState } from 'react';
import { Plus, Trash2, Percent, DollarSign, Tag } from 'lucide-react';
import { FullReductionRule, QuantityDiscountRule } from '../../types/calculator';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';

interface DiscountRulesProps {
  fullReductionRules: FullReductionRule[];
  quantityDiscountRules: QuantityDiscountRule[];
  onAddFullReduction: (rule: Omit<FullReductionRule, 'id'>) => void;
  onUpdateFullReduction: (id: string, updates: Partial<Omit<FullReductionRule, 'id'>>) => void;
  onRemoveFullReduction: (id: string) => void;
  onAddQuantityDiscount: (rule: Omit<QuantityDiscountRule, 'id'>) => void;
  onUpdateQuantityDiscount: (id: string, updates: Partial<Omit<QuantityDiscountRule, 'id'>>) => void;
  onRemoveQuantityDiscount: (id: string) => void;
}

export const DiscountRules: React.FC<DiscountRulesProps> = ({
  fullReductionRules,
  quantityDiscountRules,
  onAddFullReduction,
  onUpdateFullReduction,
  onRemoveFullReduction,
  onAddQuantityDiscount,
  onUpdateQuantityDiscount,
  onRemoveQuantityDiscount
}) => {
  const [activeTab, setActiveTab] = useState<'fullReduction' | 'quantity'>('fullReduction');
  
  // Full reduction rule state
  const [newFullReduction, setNewFullReduction] = useState({
    threshold: '',
    reduction: '',
    description: ''
  });
  
  // Quantity discount rule state
  const [newQuantityDiscount, setNewQuantityDiscount] = useState({
    minQuantity: '',
    discountPercentage: '',
    strategy: 'highest' as 'highest' | 'lowest' | 'all',
    description: ''
  });

  const handleAddFullReduction = () => {
    const threshold = parseFloat(newFullReduction.threshold);
    const reduction = parseFloat(newFullReduction.reduction);
    
    if (threshold > 0 && reduction > 0) {
      const description = newFullReduction.description.trim() || 
        `Spend $${threshold.toFixed(2)} get $${reduction.toFixed(2)} off`;
      
      onAddFullReduction({
        threshold,
        reduction,
        description,
        enabled: true
      });
      
      setNewFullReduction({ threshold: '', reduction: '', description: '' });
    }
  };

  const handleAddQuantityDiscount = () => {
    const minQuantity = parseInt(newQuantityDiscount.minQuantity);
    const discountPercentage = parseFloat(newQuantityDiscount.discountPercentage);
    
    if (minQuantity > 0 && discountPercentage > 0 && discountPercentage < 100) {
      const strategyText = {
        highest: 'Most Expensive',
        lowest: 'Least Expensive', 
        all: 'All Items'
      }[newQuantityDiscount.strategy];
      
      const description = newQuantityDiscount.description.trim() || 
        `Buy ${minQuantity}+ items, ${discountPercentage}% off (${strategyText})`;
      
      onAddQuantityDiscount({
        minQuantity,
        discountPercentage,
        strategy: newQuantityDiscount.strategy,
        description,
        enabled: true
      });
      
      setNewQuantityDiscount({ 
        minQuantity: '', 
        discountPercentage: '', 
        strategy: 'highest',
        description: '' 
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-amazon-orange" />
        <h3 className="text-lg font-medium text-gray-900">Discount Rules</h3>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('fullReduction')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'fullReduction'
                ? 'border-amazon-orange text-amazon-orange'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Spend & Save
            </div>
          </button>
          <button
            onClick={() => setActiveTab('quantity')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'quantity'
                ? 'border-amazon-orange text-amazon-orange'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Quantity Discount
            </div>
          </button>
        </nav>
      </div>

      {/* Spend & Save Rules */}
      {activeTab === 'fullReduction' && (
        <div className="space-y-4">
          {/* Add Spend & Save Rule */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Add Spend & Save Rule</h4>
            <div className="grid grid-cols-1 gap-3">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Input
                  label="Minimum Spend"
                  type="number"
                  placeholder="100"
                  prefix="$"
                  value={newFullReduction.threshold}
                  onChange={(e) => setNewFullReduction(prev => ({ ...prev, threshold: e.target.value }))}
                />
                <Input
                  label="Discount Amount" 
                  type="number"
                  placeholder="20"
                  prefix="$"
                  value={newFullReduction.reduction}
                  onChange={(e) => setNewFullReduction(prev => ({ ...prev, reduction: e.target.value }))}
                />
                <div className="flex items-end">
                  <Button
                    onClick={handleAddFullReduction}
                    disabled={!newFullReduction.threshold || !newFullReduction.reduction}
                    className="w-full h-12 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Add Rule</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </div>
              {/* Second Row */}
              <Input
                label="Custom Description (Optional)"
                placeholder="Spend $100 get $20 off"
                value={newFullReduction.description}
                onChange={(e) => setNewFullReduction(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          {/* Spend & Save Rules List */}
          {fullReductionRules.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Active Spend & Save Rules</h4>
              <div className="space-y-2">
                {fullReductionRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) => onUpdateFullReduction(rule.id, { enabled: e.target.checked })}
                        className="h-4 w-4 text-amazon-orange focus:ring-amazon-orange border-gray-300 rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{rule.description}</div>
                        <div className="text-sm text-gray-500">
                          Spend ${rule.threshold.toFixed(2)} save ${rule.reduction.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFullReduction(rule.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <DollarSign className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No spend & save rules yet, add one above</p>
            </div>
          )}
        </div>
      )}

      {/* Quantity Discount Rules */}
      {activeTab === 'quantity' && (
        <div className="space-y-4">
          {/* Add Quantity Discount Rule */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Add Quantity Discount Rule</h4>
            <div className="grid grid-cols-1 gap-3">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Input
                  label="Min Quantity"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="2"
                  value={newQuantityDiscount.minQuantity}
                  onChange={(e) => setNewQuantityDiscount(prev => ({ ...prev, minQuantity: e.target.value }))}
                />
                <div>
                  <Input
                    label="Discount %"
                    type="number"
                    placeholder="80"
                    suffix="%"
                    value={newQuantityDiscount.discountPercentage}
                    onChange={(e) => setNewQuantityDiscount(prev => ({ ...prev, discountPercentage: e.target.value }))}
                  />
                  <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">Enter 80 for 20% off</p>
                </div>
                <Select
                  label="Strategy"
                  value={newQuantityDiscount.strategy}
                  onChange={(e) => setNewQuantityDiscount(prev => ({ ...prev, strategy: e.target.value as any }))}
                  options={[
                    { value: 'highest', label: 'Most Expensive' },
                    { value: 'lowest', label: 'Least Expensive' },
                    { value: 'all', label: 'All Items' }
                  ]}
                  className="min-w-0"
                />
                <div className="flex items-end">
                  <Button
                    onClick={handleAddQuantityDiscount}
                    disabled={!newQuantityDiscount.minQuantity || !newQuantityDiscount.discountPercentage}
                    className="w-full h-12 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Add Rule</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </div>
              {/* Second Row */}
              <Input
                label="Custom Description (Optional)"
                placeholder="Buy 2+ items, 20% off most expensive"
                value={newQuantityDiscount.description}
                onChange={(e) => setNewQuantityDiscount(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          {/* Quantity Discount Rules List */}
          {quantityDiscountRules.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Active Quantity Discount Rules</h4>
              <div className="space-y-2">
                {quantityDiscountRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) => onUpdateQuantityDiscount(rule.id, { enabled: e.target.checked })}
                        className="h-4 w-4 text-amazon-orange focus:ring-amazon-orange border-gray-300 rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{rule.description}</div>
                        <div className="text-sm text-gray-500">
                          Buy {rule.minQuantity}+ items, {rule.discountPercentage}% off - {
                            rule.strategy === 'highest' ? 'Most expensive items' :
                            rule.strategy === 'lowest' ? 'Least expensive items' : 'All items'
                          }
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveQuantityDiscount(rule.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Percent className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No quantity discount rules yet, add one above</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 
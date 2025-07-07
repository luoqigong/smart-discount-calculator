import React, { useState } from 'react';
import { Plus, Trash2, Edit3, ShoppingCart as CartIcon } from 'lucide-react';
import { CartItem } from '../../types/calculator';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface ShoppingCartProps {
  items: CartItem[];
  onAddItem: (item: Omit<CartItem, 'id'>) => void;
  onUpdateItem: (id: string, updates: Partial<Omit<CartItem, 'id'>>) => void;
  onRemoveItem: (id: string) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem
}) => {
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: '1'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{
    name: string;
    price: string;
    quantity: string;
  } | null>(null);

  const handleAddItem = () => {
    if (newItem.name.trim() && newItem.price.trim()) {
      const price = parseFloat(newItem.price);
      const quantity = parseInt(newItem.quantity) || 1;
      
      if (price > 0 && quantity > 0) {
        onAddItem({
          name: newItem.name.trim(),
          price: price,
          quantity: quantity
        });
        
        setNewItem({ name: '', price: '', quantity: '1' });
      }
    }
  };

  const handleStartEdit = (item: CartItem) => {
    setEditingId(item.id);
    setEditingItem({
      name: item.name,
      price: item.price.toString(),
      quantity: item.quantity.toString()
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingItem(null);
  };

  const handleSaveEdit = () => {
    if (editingId && editingItem) {
      const price = parseFloat(editingItem.price);
      const quantity = parseInt(editingItem.quantity);
      
      if (editingItem.name.trim() && !isNaN(price) && price > 0 && !isNaN(quantity) && quantity > 0) {
        onUpdateItem(editingId, {
          name: editingItem.name.trim(),
          price: price,
          quantity: quantity
        });
        handleCancelEdit();
      }
    }
  };

  const handleEditFieldChange = (field: 'name' | 'price' | 'quantity', value: string) => {
    if (editingItem) {
      setEditingItem(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2">
        <CartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amazon-orange" />
        <h3 className="text-base sm:text-lg font-medium text-gray-900">Shopping Cart</h3>
        {items.length > 0 && (
          <span className="text-xs sm:text-sm text-gray-500">
            ({getTotalQuantity()} items)
          </span>
        )}
      </div>

      {/* Add New Item */}
      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Add New Item</h4>
        <div className="grid grid-cols-1 gap-3">
          {/* First Row - Item Name */}
          <Input
            label="Item Name"
            placeholder="e.g., iPhone 15"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            onKeyPress={handleKeyPress}
          />
          {/* Second Row - Price, Quantity, and Add Button */}
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3">
            <Input
              label="Price"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="99.99"
              prefix="$"
              value={newItem.price}
              onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
              onKeyPress={handleKeyPress}
              className="sm:md:col-span-2"
            />
            <Input
              label="Quantity"
              type="number"
              step="1"
              min="1"
              placeholder="1"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
              onKeyPress={handleKeyPress}
            />
            <div className="col-span-2 sm:col-span-1 flex items-end">
              <Button
                onClick={handleAddItem}
                disabled={!newItem.name.trim() || !newItem.price.trim()}
                className="w-full h-11 sm:h-12"
                size="sm"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Add</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Items List */}
      {items.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Cart Items</h4>
          <div className="bg-white border rounded-lg overflow-hidden">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-3 bg-gray-50 text-sm font-medium text-gray-700">
              <div className="col-span-5">Item Name</div>
              <div className="col-span-2">Unit Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Subtotal</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {items.map((item) => (
              <div key={item.id} className="border-t border-gray-200">
                {editingId === item.id && editingItem ? (
                  // Edit Mode
                  <div className="p-3 sm:p-4">
                    {/* Mobile Edit Layout */}
                    <div className="md:hidden space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
                        <Input
                          value={editingItem.name}
                          onChange={(e) => handleEditFieldChange('name', e.target.value)}
                          onKeyPress={handleEditKeyPress}
                          autoFocus
                          className="text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={editingItem.price}
                            onChange={(e) => handleEditFieldChange('price', e.target.value)}
                            onKeyPress={handleEditKeyPress}
                            prefix="$"
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                          <Input
                            type="number"
                            step="1"
                            min="1"
                            value={editingItem.quantity}
                            onChange={(e) => handleEditFieldChange('quantity', e.target.value)}
                            onKeyPress={handleEditKeyPress}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          Total: ${(parseFloat(editingItem.price) * parseInt(editingItem.quantity) || 0).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded text-sm font-medium"
                            title="Save"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium"
                            title="Cancel"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop Edit Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4">
                      <div className="col-span-5">
                        <Input
                          value={editingItem.name}
                          onChange={(e) => handleEditFieldChange('name', e.target.value)}
                          onKeyPress={handleEditKeyPress}
                          autoFocus
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          step="0.01"
                          min="0.01"
                          value={editingItem.price}
                          onChange={(e) => handleEditFieldChange('price', e.target.value)}
                          onKeyPress={handleEditKeyPress}
                          prefix="$"
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          step="1"
                          min="1"
                          value={editingItem.quantity}
                          onChange={(e) => handleEditFieldChange('quantity', e.target.value)}
                          onKeyPress={handleEditKeyPress}
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="text-sm font-medium">
                          ${(parseFloat(editingItem.price) * parseInt(editingItem.quantity) || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-span-1 flex items-center gap-1">
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-800 p-1"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <div className="p-3 sm:p-4 hover:bg-gray-50">
                    {/* Mobile Display Layout */}
                    <div className="md:hidden">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm truncate">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="text-blue-600 hover:text-blue-800 p-2 -m-1"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800 p-2 -m-1"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop Display Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-5">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </div>
                      <div className="col-span-2 text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="col-span-2 text-gray-900">
                        {item.quantity}
                      </div>
                      <div className="col-span-2 font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="col-span-1 flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Subtotal */}
            <div className="border-t-2 border-gray-200 bg-gray-50 p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 font-semibold text-gray-900">
                <span className="text-sm sm:text-base">Cart Subtotal ({getTotalQuantity()} items):</span>
                <span className="text-lg sm:text-xl text-amazon-orange">${calculateSubtotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <CartIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
          <p className="text-sm sm:text-base">Cart is empty, add items above</p>
        </div>
      )}
    </div>
  );
}; 
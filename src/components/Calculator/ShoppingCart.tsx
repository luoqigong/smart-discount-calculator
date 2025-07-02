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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CartIcon className="w-5 h-5 text-amazon-orange" />
        <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
        {items.length > 0 && (
          <span className="text-sm text-gray-500">
            ({getTotalQuantity()} items)
          </span>
        )}
      </div>

      {/* Add New Item */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
              className="md:col-span-2"
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
            <div className="flex items-end">
              <Button
                onClick={handleAddItem}
                disabled={!newItem.name.trim() || !newItem.price.trim()}
                className="w-full h-12"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
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
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-3">
                    <div className="md:col-span-5">
                      <Input
                        value={editingItem.name}
                        onChange={(e) => handleEditFieldChange('name', e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        autoFocus
                        className="text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
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
                    <div className="md:col-span-2">
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
                    <div className="md:col-span-2 flex items-center">
                      <span className="text-sm font-medium">
                        ${(parseFloat(editingItem.price) * parseInt(editingItem.quantity) || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="md:col-span-1 flex items-center gap-1">
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
                ) : (
                  // Display Mode
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-3 hover:bg-gray-50">
                    <div className="md:col-span-5">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="md:hidden text-sm text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <div className="hidden md:block md:col-span-2 text-gray-900">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="hidden md:block md:col-span-2 text-gray-900">
                      {item.quantity}
                    </div>
                    <div className="hidden md:block md:col-span-2 font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="md:col-span-1 flex items-center gap-1">
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
                )}
              </div>
            ))}
            
            {/* Subtotal */}
            <div className="border-t-2 border-gray-200 bg-gray-50 p-3">
              <div className="flex justify-between items-center font-semibold text-gray-900">
                <span>Cart Subtotal ({getTotalQuantity()} items):</span>
                <span className="text-lg">${calculateSubtotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <CartIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Cart is empty, add items above</p>
        </div>
      )}
    </div>
  );
}; 
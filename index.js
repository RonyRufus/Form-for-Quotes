import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const QuoteForm = () => {
  const [items, setItems] = useState([{
    itemNo: 1,
    specification: '',
    unit: '',
    quantity: '',
    rateInFigures: '',
    rateInWords: '',
    amount: '',
    remarks: ''
  }]);

  const calculateAmount = (quantity, rate) => {
    return quantity && rate ? (parseFloat(quantity) * parseFloat(rate)).toFixed(2) : '';
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rateInFigures') {
      newItems[index].amount = calculateAmount(
        newItems[index].quantity,
        newItems[index].rateInFigures
      );
    }
    
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {
      itemNo: items.length + 1,
      specification: '',
      unit: '',
      quantity: '',
      rateInFigures: '',
      rateInWords: '',
      amount: '',
      remarks: ''
    }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      // Reassign item numbers
      newItems.forEach((item, i) => item.itemNo = i + 1);
      setItems(newItems);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>HVAC Quote Generation Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Header Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Reference Number</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="e.g., DQS/02/AHU1311"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input type="date" className="w-full p-2 border rounded"/>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Client Details</label>
              <textarea className="w-full p-2 border rounded" rows="4" placeholder="Enter complete client address"/>
            </div>

            {/* Tender Schedule */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tender Schedule</h3>
              
              {/* Item List */}
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Item No.</label>
                        <input
                          type="text"
                          value={item.itemNo}
                          disabled
                          className="w-full p-2 border rounded bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Unit</label>
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="e.g., Nos., Lot, SQM"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Specification of Work</label>
                      <textarea
                        value={item.specification}
                        onChange={(e) => handleItemChange(index, 'specification', e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                        placeholder="Enter detailed specification"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Quantity</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Rate (₹)</label>
                        <input
                          type="number"
                          value={item.rateInFigures}
                          onChange={(e) => handleItemChange(index, 'rateInFigures', e.target.value)}
                          className="w-full p-2 border rounded"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                        <input
                          type="text"
                          value={item.amount}
                          disabled
                          className="w-full p-2 border rounded bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Rate in Words</label>
                        <input
                          type="text"
                          value={item.rateInWords}
                          onChange={(e) => handleItemChange(index, 'rateInWords', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Remarks</label>
                        <input
                          type="text"
                          value={item.remarks}
                          onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addItem}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Item
                </button>
              </div>

              {/* Total Amount */}
              <div className="border-t pt-4">
                <div className="flex justify-end items-center space-x-4">
                  <span className="font-medium">Total Amount (Including GST):</span>
                  <span className="text-xl font-bold">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>

            {/* Commercial Terms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Commercial Terms</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Terms</label>
                  <textarea className="w-full p-2 border rounded" rows="3"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Warranty Period</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="e.g., 12 Months"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Timeline</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="e.g., 30 working days"/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quote Validity</label>
                  <input type="text" className="w-full p-2 border rounded" placeholder="e.g., 7 days"/>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Generate Quote
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteForm;
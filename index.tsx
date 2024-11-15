import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const QuoteForm = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>HVAC Quote Generation Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Header Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
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
              
              {/* Client Details */}
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Client Name & Address</label>
                <textarea 
                  className="w-full p-2 border rounded" 
                  rows="4" 
                  placeholder="Enter complete client address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Supply and installation details"/>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Name of Work</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter project name"/>
              </div>
              
              {/* Equipment Details Table */}
              <div className="space-y-2">
                <h4 className="font-medium">Equipment Details</h4>
                <div className="border rounded p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Item Type</label>
                      <select className="w-full p-2 border rounded">
                        <option>Double skin AHU</option>
                        <option>Condensing Unit</option>
                        <option>VFD Panel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantity</label>
                      <input type="number" className="w-full p-2 border rounded"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Specifications</label>
                    <textarea 
                      className="w-full p-2 border rounded" 
                      rows="3" 
                      placeholder="Enter detailed specifications"
                    />
                  </div>
                  <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add More Equipment
                  </button>
                </div>
              </div>
            </div>

            {/* Commercial Terms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Commercial Terms</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Terms</label>
                  <textarea 
                    className="w-full p-2 border rounded" 
                    rows="3" 
                    placeholder="Enter payment terms"
                  />
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Car, Home, Briefcase, ShoppingBag, Send } from 'lucide-react';
import { CalculatorResults } from '../components/calculator/CalculatorResults';

export const CalculatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transport' | 'home' | 'work' | 'lifestyle'>('transport');
  const [formData, setFormData] = useState({
    transport: {
      carType: 'gas',
      weeklyKm: 150,
      publicTransport: 5,
    },
    home: {
      electricityKwh: 250,
      gasUsage: 50,
      renewablePercentage: 20,
      occupants: 2,
    },
    work: {
      workFromHome: 2,
      officeType: 'standard',
      companySize: 'medium',
    },
    lifestyle: {
      meatConsumption: 'medium',
      shopping: 'moderate',
      flights: 2,
    },
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const handleInputChange = (category: string, field: string, value: string | number) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category as keyof typeof formData],
        [field]: value,
      },
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  const tabs = [
    { id: 'transport', label: 'Transportation', icon: <Car className="h-5 w-5" /> },
    { id: 'home', label: 'Home Energy', icon: <Home className="h-5 w-5" /> },
    { id: 'work', label: 'Work', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <ShoppingBag className="h-5 w-5" /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Carbon Footprint Calculator</h1>
          <p className="mx-auto max-w-2xl text-lg text-dark-600">
            Estimate your carbon emissions by providing information about your lifestyle and daily activities.
          </p>
        </motion.div>
      </div>
      
      {!showResults ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors md:text-base ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="card mb-8">
              {activeTab === 'transport' && (
                <div className="space-y-6">
                  <h3 className="flex items-center text-xl font-semibold">
                    <Car className="mr-2 h-6 w-6 text-primary-600" />
                    Transportation
                  </h3>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Primary Vehicle Type
                    </label>
                    <select
                      className="input"
                      value={formData.transport.carType}
                      onChange={(e) => handleInputChange('transport', 'carType', e.target.value)}
                    >
                      <option value="electric">Electric Vehicle</option>
                      <option value="hybrid">Hybrid Vehicle</option>
                      <option value="gas">Gasoline Vehicle</option>
                      <option value="diesel">Diesel Vehicle</option>
                      <option value="none">No Car</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Weekly Distance Driven (km)
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.transport.weeklyKm}
                      onChange={(e) => handleInputChange('transport', 'weeklyKm', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Public Transport Trips per Week
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.transport.publicTransport}
                      onChange={(e) => handleInputChange('transport', 'publicTransport', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'home' && (
                <div className="space-y-6">
                  <h3 className="flex items-center text-xl font-semibold">
                    <Home className="mr-2 h-6 w-6 text-primary-600" />
                    Home Energy
                  </h3>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Monthly Electricity Usage (kWh)
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.home.electricityKwh}
                      onChange={(e) => handleInputChange('home', 'electricityKwh', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Monthly Gas/Heating Usage (units)
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.home.gasUsage}
                      onChange={(e) => handleInputChange('home', 'gasUsage', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Renewable Energy Percentage
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      className="w-full"
                      value={formData.home.renewablePercentage}
                      onChange={(e) => handleInputChange('home', 'renewablePercentage', parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-dark-500">
                      <span>0%</span>
                      <span>{formData.home.renewablePercentage}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Number of Occupants
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.home.occupants}
                      onChange={(e) => handleInputChange('home', 'occupants', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'work' && (
                <div className="space-y-6">
                  <h3 className="flex items-center text-xl font-semibold">
                    <Briefcase className="mr-2 h-6 w-6 text-primary-600" />
                    Work
                  </h3>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Days Working from Home per Week
                    </label>
                    <input
                      type="number"
                      className="input"
                      min="0"
                      max="7"
                      value={formData.work.workFromHome}
                      onChange={(e) => handleInputChange('work', 'workFromHome', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Office Building Type
                    </label>
                    <select
                      className="input"
                      value={formData.work.officeType}
                      onChange={(e) => handleInputChange('work', 'officeType', e.target.value)}
                    >
                      <option value="standard">Standard Office</option>
                      <option value="leed">LEED Certified Building</option>
                      <option value="energy-efficient">Energy Efficient</option>
                      <option value="co-working">Co-Working Space</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Company Size
                    </label>
                    <select
                      className="input"
                      value={formData.work.companySize}
                      onChange={(e) => handleInputChange('work', 'companySize', e.target.value)}
                    >
                      <option value="small">Small (1-50 employees)</option>
                      <option value="medium">Medium (51-500 employees)</option>
                      <option value="large">Large (501+ employees)</option>
                    </select>
                  </div>
                </div>
              )}
              
              {activeTab === 'lifestyle' && (
                <div className="space-y-6">
                  <h3 className="flex items-center text-xl font-semibold">
                    <ShoppingBag className="mr-2 h-6 w-6 text-primary-600" />
                    Lifestyle
                  </h3>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Meat Consumption
                    </label>
                    <select
                      className="input"
                      value={formData.lifestyle.meatConsumption}
                      onChange={(e) => handleInputChange('lifestyle', 'meatConsumption', e.target.value)}
                    >
                      <option value="none">None (Vegan/Vegetarian)</option>
                      <option value="low">Low (Meat 1-2 times per week)</option>
                      <option value="medium">Medium (Meat 3-5 times per week)</option>
                      <option value="high">High (Meat daily)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Shopping Habits
                    </label>
                    <select
                      className="input"
                      value={formData.lifestyle.shopping}
                      onChange={(e) => handleInputChange('lifestyle', 'shopping', e.target.value)}
                    >
                      <option value="minimal">Minimal (Necessities only)</option>
                      <option value="moderate">Moderate</option>
                      <option value="frequent">Frequent</option>
                      <option value="excessive">Very Frequent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Flights per Year
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.lifestyle.flights}
                      onChange={(e) => handleInputChange('lifestyle', 'flights', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary flex items-center text-base"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate My Footprint
                <Send className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <CalculatorResults formData={formData} onReset={() => setShowResults(false)} />
      )}
    </div>
  );
};
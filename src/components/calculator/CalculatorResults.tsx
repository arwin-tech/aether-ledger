import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Leaf, MessageCircle, Download, Share2 } from 'lucide-react';

interface CalculatorResultsProps {
  formData: any;
  onReset: () => void;
}

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({ formData, onReset }) => {
  // Calculate emissions based on form data
  const calculateEmissions = () => {
    // This is a simplified calculation for demonstration purposes
    // In a real app, this would use more precise formulas and data
    
    // Transportation emissions
    let transportEmissions = 0;
    if (formData.transport.carType === 'gas') {
      transportEmissions += formData.transport.weeklyKm * 0.2; // 200g CO2 per km
    } else if (formData.transport.carType === 'diesel') {
      transportEmissions += formData.transport.weeklyKm * 0.15; // 150g CO2 per km
    } else if (formData.transport.carType === 'hybrid') {
      transportEmissions += formData.transport.weeklyKm * 0.1; // 100g CO2 per km
    } else if (formData.transport.carType === 'electric') {
      transportEmissions += formData.transport.weeklyKm * 0.05; // 50g CO2 per km
    }
    
    transportEmissions += formData.transport.publicTransport * 2; // 2kg per trip
    
    // Home emissions
    let homeEmissions = formData.home.electricityKwh * 0.5; // 0.5kg per kWh
    homeEmissions += formData.home.gasUsage * 2; // 2kg per unit
    homeEmissions *= (1 - formData.home.renewablePercentage / 100); // Reduce based on renewable %
    homeEmissions /= formData.home.occupants; // Divide by occupants
    
    // Work emissions
    let workEmissions = 0;
    const daysInOffice = 5 - formData.work.workFromHome;
    if (formData.work.officeType === 'standard') {
      workEmissions += daysInOffice * 8;
    } else if (formData.work.officeType === 'energy-efficient') {
      workEmissions += daysInOffice * 5;
    } else if (formData.work.officeType === 'leed') {
      workEmissions += daysInOffice * 3;
    } else if (formData.work.officeType === 'co-working') {
      workEmissions += daysInOffice * 4;
    }
    
    // Lifestyle emissions
    let lifestyleEmissions = 0;
    if (formData.lifestyle.meatConsumption === 'high') {
      lifestyleEmissions += 50;
    } else if (formData.lifestyle.meatConsumption === 'medium') {
      lifestyleEmissions += 30;
    } else if (formData.lifestyle.meatConsumption === 'low') {
      lifestyleEmissions += 15;
    } else if (formData.lifestyle.meatConsumption === 'none') {
      lifestyleEmissions += 5;
    }
    
    if (formData.lifestyle.shopping === 'excessive') {
      lifestyleEmissions += 40;
    } else if (formData.lifestyle.shopping === 'frequent') {
      lifestyleEmissions += 25;
    } else if (formData.lifestyle.shopping === 'moderate') {
      lifestyleEmissions += 15;
    } else if (formData.lifestyle.shopping === 'minimal') {
      lifestyleEmissions += 5;
    }
    
    lifestyleEmissions += formData.lifestyle.flights * 500; // 500kg per flight
    
    return {
      transport: Math.round(transportEmissions),
      home: Math.round(homeEmissions),
      work: Math.round(workEmissions),
      lifestyle: Math.round(lifestyleEmissions),
      total: Math.round(transportEmissions + homeEmissions + workEmissions + lifestyleEmissions),
    };
  };
  
  const emissions = calculateEmissions();
  
  const getComparisonText = (total: number) => {
    if (total < 600) {
      return 'Your carbon footprint is lower than 85% of people. Great job!';
    } else if (total < 1000) {
      return 'Your carbon footprint is lower than 60% of people. Good work!';
    } else if (total < 1500) {
      return 'Your carbon footprint is about average.';
    } else {
      return 'Your carbon footprint is higher than 70% of people. There\'s room for improvement.';
    }
  };
  
  const getTips = () => {
    const tips = [];
    
    if (formData.transport.carType === 'gas' || formData.transport.carType === 'diesel') {
      tips.push('Consider switching to a hybrid or electric vehicle.');
    }
    
    if (formData.home.renewablePercentage < 50) {
      tips.push('Increase your renewable energy usage to reduce home emissions.');
    }
    
    if (formData.work.workFromHome < 2) {
      tips.push('Working from home even one additional day can significantly reduce emissions.');
    }
    
    if (formData.lifestyle.meatConsumption === 'high') {
      tips.push('Reducing meat consumption, especially red meat, can lower your carbon footprint.');
    }
    
    if (formData.lifestyle.flights > 3) {
      tips.push('Consider alternatives to flying or offset your flight emissions.');
    }
    
    // Always include these general tips
    if (tips.length < 3) {
      tips.push('Use public transportation more often.');
      tips.push('Invest in energy-efficient appliances for your home.');
    }
    
    return tips.slice(0, 4); // Return at most 4 tips
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl"
    >
      <div className="card mb-8">
        <h3 className="mb-6 text-center text-2xl font-bold">Your Carbon Footprint Results</h3>
        
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="relative mb-4 flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary-100">
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary-600">{emissions.total}</span>
              <span className="text-sm text-dark-500">kg CO₂e/month</span>
            </div>
          </div>
          
          <p className="max-w-md text-center text-lg">{getComparisonText(emissions.total)}</p>
        </div>
        
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-primary-50 p-4">
            <h4 className="mb-2 font-semibold">Transportation</h4>
            <p className="text-2xl font-bold text-primary-700">{emissions.transport} kg</p>
            <p className="text-sm text-dark-500">CO₂e/month</p>
          </div>
          
          <div className="rounded-lg bg-secondary-50 p-4">
            <h4 className="mb-2 font-semibold">Home Energy</h4>
            <p className="text-2xl font-bold text-secondary-700">{emissions.home} kg</p>
            <p className="text-sm text-dark-500">CO₂e/month</p>
          </div>
          
          <div className="rounded-lg bg-accent-50 p-4">
            <h4 className="mb-2 font-semibold">Work</h4>
            <p className="text-2xl font-bold text-accent-700">{emissions.work} kg</p>
            <p className="text-sm text-dark-500">CO₂e/month</p>
          </div>
          
          <div className="rounded-lg bg-warning-50 p-4">
            <h4 className="mb-2 font-semibold">Lifestyle</h4>
            <p className="text-2xl font-bold text-warning-700">{emissions.lifestyle} kg</p>
            <p className="text-sm text-dark-500">CO₂e/month</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="mb-4 flex items-center text-xl font-semibold">
            <Leaf className="mr-2 h-5 w-5 text-success-600" />
            Recommendations
          </h4>
          
          <ul className="space-y-2">
            {getTips().map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 rounded-full bg-success-100 p-1 text-success-600">
                  <Leaf className="h-4 w-4" />
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onReset}
            className="btn btn-outline flex items-center"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Recalculate
          </button>
          
          <button className="btn btn-primary flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Get Detailed Report
          </button>
          
          <button className="btn btn-secondary flex items-center">
            <Download className="mr-2 h-5 w-5" />
            Download Results
          </button>
          
          <button className="btn bg-dark-800 text-white hover:bg-dark-700 flex items-center">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
};
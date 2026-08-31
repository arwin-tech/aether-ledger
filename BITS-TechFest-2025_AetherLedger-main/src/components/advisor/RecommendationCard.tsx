import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const RecommendationCard: React.FC = () => {
  const filterTypes = [
    {
      name: 'Moss Walls',
      description:
        'Vertical installations of moss that naturally filter air pollutants and improve urban aesthetics.',
      benefits: ['Natural filtration', 'Aesthetically pleasing', 'Low maintenance'],
      ideal: 'Urban areas, schools, hospitals',
      effectiveness: 'Medium',
      cost: '$$ - $$$',
    },
    {
      name: 'HEPA Purifiers',
      description:
        'High-efficiency particulate air filters that remove 99.97% of airborne particles.',
      benefits: ['Highly effective', 'Indoor use', 'Medical grade'],
      ideal: 'Hospitals, schools, elderly care',
      effectiveness: 'High',
      cost: '$$ - $$$',
    },
    {
      name: 'Green Buffer Zones',
      description:
        'Strategic planting of trees and vegetation to create natural air filtration barriers.',
      benefits: ['Long-term solution', 'Carbon sequestration', 'Community benefits'],
      ideal: 'Between industrial and residential areas',
      effectiveness: 'Medium - High',
      cost: '$$ - $$$$',
    },
  ];
  
  const [activeFilter, setActiveFilter] = React.useState(0);
  
  return (
    <div className="card h-full">
      <h3 className="mb-6 text-xl font-semibold">Filter Solutions</h3>
      
      <div className="mb-6 flex space-x-2">
        {filterTypes.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(index)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeFilter === index
                ? 'bg-primary-600 text-white'
                : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">{filterTypes[activeFilter].name}</h4>
          <p className="text-sm text-dark-600">{filterTypes[activeFilter].description}</p>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium">Key Benefits</h4>
          <ul className="space-y-1">
            {filterTypes[activeFilter].benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-sm text-dark-600">
                <CheckCircle className="mr-2 h-4 w-4 text-success-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="mb-1 text-sm font-medium">Ideal For</h4>
            <p className="text-sm text-dark-600">{filterTypes[activeFilter].ideal}</p>
          </div>
          
          <div>
            <h4 className="mb-1 text-sm font-medium">Effectiveness</h4>
            <p className="text-sm text-dark-600">{filterTypes[activeFilter].effectiveness}</p>
          </div>
          
          <div>
            <h4 className="mb-1 text-sm font-medium">Cost Range</h4>
            <p className="text-sm text-dark-600">{filterTypes[activeFilter].cost}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
          Learn more about this solution
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
import React from 'react';
import crate from '../assets/crate.png';
import box from '../assets/box.png';
import palette from '../assets/palette.png';
interface PackageOption {
  label: string;
  image: string;
  dimensions: { length: string; width: string; height: string };
}

const packageOptions: PackageOption[] = [
  {
    label: 'Box',
    image: box,
    dimensions: { length: '30', width: '30', height: '30' },
  },
 
  {
    label: 'Crate',
    image: crate,
    dimensions: { length: '100', width: '80', height: '90' },
  },
  {
    label: 'Pallet',
    image: palette,
    dimensions: { length: '120', width: '100', height: '150' },
  }
];

interface VisualSelectorProps {
  onSelect: (dimensions: { length: string; width: string; height: string }) => void;
}

const PackageTypeVisualSelector: React.FC<VisualSelectorProps> = ({ onSelect }) => {
  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold text-primary mb-2">Select Package Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {packageOptions.map((option) => (
          <div
            key={option.label}
            className="cursor-pointer border rounded-lg p-4 text-center shadow hover:shadow-md hover:border-primary transition"
            onClick={() => onSelect(option.dimensions)}
          >
            <img src={option.image} alt={option.label} className="mx-auto h-24 object-contain mb-2" />
            <p className="font-medium">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageTypeVisualSelector;

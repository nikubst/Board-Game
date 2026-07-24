'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const ColorPicker: React.FC<{
  colors: string[];
  onChange: (colors: string[]) => void;
  maxColors?: number;
}> = ({ colors, onChange, maxColors = 5 }) => {
  const [colorInput, setColorInput] = useState('');

  const addColor = () => {
    if (colorInput && isValidColor(colorInput) && colors.length < maxColors) {
      onChange([...colors, normalizeColor(colorInput)]);
      setColorInput('');
    }
  };

  const removeColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    onChange(newColors);
  };

  const isValidColor = (color: string): boolean => {
    // Simple validation for hex colors
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
  };

  const normalizeColor = (color: string): string => {
    // Ensure color is in #RRGGBB format
    if (color.startsWith('#') && color.length === 4) {
      // Convert #RGB to #RRGGBB
      const r = color[1];
      const g = color[2];
      const b = color[3];
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    return color;
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <Card padding="md">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-500">Color Palette</h3>
        
        {/* Color input */}
        <div className="flex gap-2">
          <Input
            placeholder="#RRGGBB"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addColor();
              }
            }}
            className="flex-1"
            maxLength={7}
          />
          <Button
            onClick={addColor}
            disabled={!colorInput || !isValidColor(colorInput) || colors.length >= maxColors}
            size="sm"
          >
            Add
          </Button>
        </div>

        {/* Color display */}
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-8 h-8 rounded-lg cursor-pointer"
                style={{ backgroundColor: color }}
                title={`Click to copy: ${color}`}
                onClick={() => copyToClipboard(color)}
              />
              <button
                onClick={() => removeColor(index)}
                className="text-slate-500 hover:text-red-400 transition-colors"
                title="Remove color"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Color count */}
        <p className="text-xs text-slate-500">
          {colors.length} of {maxColors} colors
        </p>
      </div>
    </Card>
  );
};

// Simple color picker for single color
export const SimpleColorPicker: React.FC<{
  color: string;
  onChange: (color: string) => void;
}> = ({ color, onChange }) => {
  const [inputValue, setInputValue] = useState(color);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    if (isValidColor(value)) {
      onChange(value);
    }
  };

  const isValidColor = (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
  };

  return (
    <div className="space-y-2">
      <Input
        label="Color"
        placeholder="#RRGGBB"
        value={inputValue}
        onChange={handleChange}
        maxLength={7}
      />
      <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: isValidColor(inputValue) ? inputValue : '#374151' }} />
    </div>
  );
};

// Predefined color palettes for quick selection
export const PredefinedPalettes: React.FC<{
  onSelect: (colors: string[]) => void;
}> = ({ onSelect }) => {
  const predefined = [
    { name: 'Earth Tones', colors: ['#654321', '#8B4513', '#A0522D', '#CD853F', '#D2B48C'] },
    { name: 'Ocean Blues', colors: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'] },
    { name: 'Sunset', colors: ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#22C55E'] },
    { name: 'Pastel', colors: ['#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899'] },
    { name: 'Monochrome', colors: ['#000000', '#4B5563', '#6B7280', '#9CA3AF', '#F3F4F6'] },
    { name: 'Vibrant', colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#EF4444', '#10B981'] },
  ];

  return (
    <Card padding="md">
      <h3 className="text-sm font-medium text-slate-500 mb-3">Predefined Palettes</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {predefined.map((palette, index) => (
          <button
            key={index}
            onClick={() => onSelect(palette.colors)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex gap-1">
              {palette.colors.slice(0, 3).map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">{palette.name}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};
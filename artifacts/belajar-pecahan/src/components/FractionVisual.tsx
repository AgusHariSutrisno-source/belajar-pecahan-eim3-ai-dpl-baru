import React from 'react';

interface FractionVisualProps {
  denominator: number;
  numerator?: number;
  color?: string;
  size?: number;
}

export function FractionVisual({ 
  denominator, 
  numerator = 1, 
  color = "hsl(213 90% 55%)", 
  size = 200 
}: FractionVisualProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) - 10;
  
  if (denominator <= 0) return null;
  
  if (denominator === 1) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill={numerator > 0 ? color : "white"} stroke="#CBD5E1" strokeWidth="4" />
      </svg>
    );
  }

  const slices = [];
  const anglePerSlice = 360 / denominator;
  
  for (let i = 0; i < denominator; i++) {
    const startAngle = i * anglePerSlice - 90;
    const endAngle = (i + 1) * anglePerSlice - 90;
    
    const startX = cx + r * Math.cos((startAngle * Math.PI) / 180);
    const startY = cy + r * Math.sin((startAngle * Math.PI) / 180);
    const endX = cx + r * Math.cos((endAngle * Math.PI) / 180);
    const endY = cy + r * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
    
    const pathData = [
      `M ${cx} ${cy}`,
      `L ${startX} ${startY}`,
      `A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `Z`
    ].join(' ');
    
    slices.push(
      <path
        key={i}
        d={pathData}
        fill={i < numerator ? color : "white"}
        stroke="#CBD5E1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-md">
        <circle cx={cx} cy={cy} r={r} fill="white" stroke="#CBD5E1" strokeWidth="4" />
        {slices}
      </svg>
    </div>
  );
}

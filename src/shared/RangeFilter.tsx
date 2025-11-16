'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { RangeSlider } from '@/components/ui/range-slider';

interface RangeFilterProps {
  minQueryKey: string;        // e.g., 'min_price'
  maxQueryKey: string;        // e.g., 'max_price'
  defaultMin: number;
  defaultMax: number;
  step?: number;
  min?: number;               // optional slider min
  max?: number;               // optional slider max
}

const RangeFilter: React.FC<RangeFilterProps> = React.memo(
  ({ minQueryKey, maxQueryKey, defaultMin, defaultMax, step = 1, min, max }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Initial values from query or defaults
    const [range, setRange] = useState<[number, number]>([
      Number(searchParams.get(minQueryKey) ?? defaultMin),
      Number(searchParams.get(maxQueryKey) ?? defaultMax),
    ]);

    useEffect(() => {
      setRange([
        Number(searchParams.get(minQueryKey) ?? defaultMin),
        Number(searchParams.get(maxQueryKey) ?? defaultMax),
      ]);
    }, [searchParams, minQueryKey, maxQueryKey, defaultMin, defaultMax]);

    const debouncedUpdate = useMemo(
      () =>
        debounce((minValue: number, maxValue: number) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set(minQueryKey, minValue.toString());
          params.set(maxQueryKey, maxValue.toString());
          router.replace(`?${params.toString()}`); // avoids scroll jump
        }, 500),
      [router, searchParams, minQueryKey, maxQueryKey]
    );

    const onSliderChange = (values: [number, number]) => {
      setRange(values);
      debouncedUpdate(values[0], values[1]);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
      const value = Number(e.target.value);
      const newRange: [number, number] =
        type === 'min' ? [value, range[1]] : [range[0], value];
      setRange(newRange);
      debouncedUpdate(newRange[0], newRange[1]);
    };

    return (
      <div>

        <RangeSlider
          min={min ?? defaultMin}
          max={max ?? defaultMax}
          step={step}
          value={range}
          onValueChange={onSliderChange}
          className="w-full mb-5"
        />

        <div className="flex gap-x-2 items-center">
          <input
            type="number"
            value={range[0]}
            onChange={(e) => onInputChange(e, 'min')}
            className="bg-white border border-stroke px-3.5 py-2.5 text-black w-full text-sm font-popin font-medium outline-none placeholder:text-black rounded-none"
            placeholder="Min"
          />
          <input
            type="number"
            value={range[1]}
            onChange={(e) => onInputChange(e, 'max')}
            className="bg-white border border-stroke px-3.5 py-2.5 text-black w-full text-sm font-popin font-medium outline-none placeholder:text-black rounded-none"
            placeholder="Max"
          />
        </div>
      </div>
    );
  }
);

export default RangeFilter;

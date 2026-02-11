'use client';

import { useState, useEffect, useRef } from 'react';

export type SortOption = 'popular' | 'newest' | 'price-asc' | 'price-desc';

interface ProductSorterProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
}

export default function ProductSorter({ currentSort, onSortChange }: ProductSorterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options: { value: SortOption; label: string }[] = [
        { value: 'popular', label: 'Most Popular' },
        { value: 'newest', label: 'Newest' },
        { value: 'price-asc', label: 'Price: Low → High' },
        { value: 'price-desc', label: 'Price: High → Low' },
    ];

    const currentLabel = options.find(o => o.value === currentSort)?.label;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative z-40" ref={dropdownRef}>
            {/* Desktop & Mobile Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
                <span>Sort By:</span>
                <span className="text-white">{currentLabel}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute right-0 mt-2 w-56 bg-[#111] border border-white/10 rounded-sm shadow-xl transition-all duration-200 origin-top-right ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                    }`}
            >
                <div className="py-1">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onSortChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${currentSort === option.value ? 'text-accent' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

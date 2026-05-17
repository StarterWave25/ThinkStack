import React, { useState, useRef, useEffect } from 'react';
import './styles/Dropdown.css';

const Dropdown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div 
                className={`dropdown-selected ${isOpen ? 'open' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="selected-text">
                    {selectedOption && selectedOption.value !== "" && <span className="dropdown-selected-icon">◉ </span>}
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
            </div>
            {isOpen && (
                <div className="dropdown-options" role="listbox">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`dropdown-option ${value === option.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                            role="option"
                            aria-selected={value === option.value}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

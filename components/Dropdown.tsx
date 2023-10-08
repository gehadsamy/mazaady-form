import { category } from "@/types/types";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  title: string;
  options: Array<category>;
  onSelect: (title: string, selectedOption: category) => void;
  setSelected: (category: category) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  onSelect,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<category>();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Close the dropdown when the user clicks outside of it
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: category) => {
    setSelectedOption(option);
    onSelect(title, option);
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption(undefined);
  }, [options]);

  return (
    <div className="my-4">
      <p className="text-2xl font-bold mb-4">{title}</p>
      <div className="relative text-left" ref={dropdownRef}>
        <div>
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
            id="options-menu"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="options-menu"
          >
            <div className="flex items-center gap-4">
              {selectedOption?.image && (
                <Image
                  src={selectedOption?.image}
                  alt={selectedOption.name}
                  width={50}
                  height={50}
                  className="w-12 h-fit object-contain"
                />
              )}
              {selectedOption?.name || "Select an option"}
            </div>
            <svg
              className={`w-5 h-5 ml-2 transition-transform transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <ul
            className="absolute z-10 left-0 mt-2 bg-white text-sm text-black border border-gray-300 rounded-md shadow-lg w-full ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto"
            role="listbox"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer select-none relative px-2 py-2 hover:bg-indigo-50 focus:bg-indigo-50"
              >
                <div className="flex gap-2 items-center">
                  {option.image && (
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={50}
                      height={50}
                      className="w-12 h-fit object-contain"
                    />
                  )}
                  {option.name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

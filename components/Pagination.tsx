
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const buttonClass = "px-4 py-2 mx-1 font-semibold text-gray-200 bg-gray-800 border border-gray-700 rounded-md transition duration-200";
    const disabledButtonClass = "opacity-50 cursor-not-allowed";
    const activeButtonClass = "hover:bg-indigo-600 hover:border-indigo-500 glow-on-hover";
    
    return (
        <div className="flex items-center justify-center mt-8 py-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`${buttonClass} ${currentPage > 1 ? activeButtonClass : disabledButtonClass}`}
            >
                &larr; Previous
            </button>
            <span className="px-4 py-2 text-gray-400">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`${buttonClass} ${currentPage < totalPages ? activeButtonClass : disabledButtonClass}`}
            >
                Next &rarr;
            </button>
        </div>
    );
};

export default PaginationComponent;
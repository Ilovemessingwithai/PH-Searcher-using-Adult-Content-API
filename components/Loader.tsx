import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="sexy-loader">
                <div className="pulsing-dot"></div>
            </div>
        </div>
    );
};

export default Loader;
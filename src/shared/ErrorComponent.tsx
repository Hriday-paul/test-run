import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

const ErrorComponent = () => {
    return (
        <div>
            <div className="flex justify-center items-center min-h-80">
                <div className="space-y-2">
                    <MdErrorOutline className="text-3xl md:text-4xl lg:text-5xl text-primary_red text-center mx-auto" />
                    <h1 className="text-base md:text-lg lg:text-xl text-primary_red text-center font-figtree">Something Wrong</h1>
                    <p className="text-xs md:text-sm lg:text-base text-center text-gray-900 font-figtree">Retry or Check your internet connection</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
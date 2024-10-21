import React, { useState, useEffect } from 'react';
import TreeNode from './TreeNode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const APIStructureVisualizer = () => {
    const [url, setUrl] = useState('');
    const [structureView, setStructureView] = useState(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [copiedPath, setCopiedPath] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (copiedPath) {
            const timer = setTimeout(() => {
                setCopiedPath(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [copiedPath]);

    useEffect(() => {
        toast.error('Please use a CORS extension ', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, []);

    const visualizeStructure = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setStructureView(data);
    };

    const scrollToTop = () => window.scrollTo(0, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        visualizeStructure();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col relative">
            <ToastContainer />
            <div className="absolute top-4 right-4 text-sm text-gray-600">
            <div className="text-red-600">Use the CORS extension to enable cross-origin requests.</div>
            </div>
            <div className="flex-grow flex flex-col p-4">
                <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-800">
                    API Structure Visualizer
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mb-8">
                    <div className="w-full max-w-2xl">
                        <input 
                            type="text" 
                            value={url} 
                            onChange={(e) => setUrl(e.target.value)} 
                            placeholder="Enter API URL" 
                            className="w-full p-4 border-2 rounded-lg mb-4"
                        />
                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg">
                            Visualize
                        </button>
                    </div>
                </form>
                {structureView && (
                    <div className="mt-8 flex-grow flex flex-col">
                        <h2 className="text-3xl font-bold mb-6 text-indigo-700">API Data Structure</h2>
                        <p className="text-sm text-gray-600 mb-4">Note: Click on any node to copy its path. The path will be automatically copied to your clipboard.</p>
                        <div className="bg-white p-6 rounded-lg border-2 flex-grow overflow-auto">
                            <TreeNode name="Root" value={structureView} path="" copiedPath={copiedPath} setCopiedPath={setCopiedPath} />
                        </div>
                    </div>
                )}
            </div>
            {showScrollToTop && (
                <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full w-16 h-16 text-2xl font-bold">
                    ↑
                </button>
            )}
        </div>
    );
};

export default APIStructureVisualizer;
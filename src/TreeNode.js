import React, { useState } from 'react';

const TreeNode = ({ name, value, path = '', copiedPath, setCopiedPath }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);

    const handleClick = () => {
        const fullPath = `data${path}`;
        navigator.clipboard.writeText(fullPath);
        setCopiedPath(fullPath);
    };

    const handleToggle = () => setIsExpanded(!isExpanded);

    const getFullPath = (key) => 
        isArray ? `${path}[${key}]` : path ? `${path}.${key}` : key;

    return (
        <div className="ml-4">
            <div className="flex items-center cursor-pointer">
                {isObject && (
                    <button className="mr-2" onClick={handleToggle}>
                        {isExpanded ? '▼' : '▶'}
                    </button>
                )}
                <div className="font-semibold" onClick={handleClick}>{name}: </div>
                {!isObject && (
                    <div className="ml-2 text-blue-600">
                        {JSON.stringify(value)}
                    </div>
                )}
                {isObject && (
                    <div className="ml-2 text-gray-500">
                        {isArray ? `Array[${value.length}]` : 'Object'}
                    </div>
                )}
                {copiedPath === `data${path}` && (
                    <div className="ml-2 text-green-600">Copied!</div>
                )}
            </div>
            {isObject && isExpanded && (
                <div className="ml-4 border-l-2 border-gray-300 pl-2">
                    {Object.entries(value).map(([key, val]) => (
                        <TreeNode 
                            key={key}
                            name={isArray ? parseInt(key) : key}
                            value={val}
                            path={getFullPath(key)}
                            copiedPath={copiedPath}
                            setCopiedPath={setCopiedPath}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const colorNames = {
    "bg-indigo-500": "Indigo",
    "bg-gray-500": "Gray",
    "bg-green-500": "Green",
    "bg-blue-500": "Blue",
    "bg-red-500": "Red",
    "bg-purple-500": "Purple"
};

export default function Labels() {

    const { labels, updateLabel } = useContext(GlobalContext);

    return (
      <React.Fragment>
        <p className='text-gray-500 font-bold mt-10'>
            Label
        </p>
        {labels.map(({ label: lbl, checked }, idx) => (
            <label key={idx} className='items-center mt-3 block'>
                <input 
                  type='checkbox' 
                  checked={checked} 
                  onChange={() => updateLabel({ label: lbl, checked: !checked })}
                  className={`form-checkbox h-5 w-5 rounded focus:ring-0 cursor-pointer ${checked ? lbl : ''}`} 
                />
                <span className='ml-2 text-gray-700 capitalize'>{colorNames[lbl] || lbl}</span>
            </label>
        ))}
      </React.Fragment>
    );
}

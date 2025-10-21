"use client";
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

// --- ICONS ---
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>;
const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;

// --- MOCK DATA ---
const CATEGORIES = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Animals' },
    { id: 3, name: 'Actions' },
    { id: 4, name: 'Places' },
];

const COLORS = [
    { name: 'Cream', value: '#FFF8E6', ring: 'ring-yellow-200' },
    { name: 'Light Pink', value: '#FFE2DE', ring: 'ring-red-200' },
    { name: 'Muted Blue', value: '#ADB2C5', ring: 'ring-slate-400' },
    { name: 'Powder Blue', value: '#DDF2F5', ring: 'ring-sky-200' },
    { name: 'Light Gray', value: '#D9E4E6', ring: 'ring-gray-300' },
    { name: 'Lavender', value: '#E8E8F6', ring: 'ring-indigo-200' },
    { name: 'Mint Green', value: '#E7F5E3', ring: 'ring-green-200' },
    { name: 'Sage Green', value: '#B5CFD1', ring: 'ring-teal-300' },
    { name: 'Gold', value: '#FDD268', ring: 'ring-yellow-400' },
];

const generateInitialButtons = () => {
    const buttons = [];
    for (let i = 0; i < 40; i++) {
        const categoryId = (i % CATEGORIES.length) + 1;
        const categoryName = CATEGORIES[categoryId - 1].name;
        const buttonName = `${categoryName} Item ${Math.floor(i / CATEGORIES.length) + 1}`;
        buttons.push({
            id: i + 1,
            name: buttonName,
            speakAs: buttonName.toLowerCase(),
            color: COLORS[i % COLORS.length],
            imageUrl: `https://placehold.co/48x48/${COLORS[i % COLORS.length].value.substring(1)}/333333?text=${buttonName.charAt(0)}`,
            categoryId: categoryId,
        });
    }
    return buttons;
};

// --- HELPER & UI COMPONENTS ---

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = React.useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        }
        if (currentPage > totalPages - 4) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
        <nav className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-3 h-10 w-10 flex items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-100 transition"><ChevronLeftIcon /></button>
            {pageNumbers.map((page, index) =>
                page === '...' ? <span key={index} className="px-2 py-1 text-gray-500">...</span> : <button key={index} onClick={() => onPageChange(page)} className={`h-10 w-10 flex items-center justify-center rounded-lg text-sm font-semibold transition ${currentPage === page ? 'bg-yellow-400 text-gray-800' : 'text-gray-600 hover:bg-yellow-50'}`}>{page}</button>
            )}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-3 h-10 w-10 flex items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-100 transition"><ChevronRightIcon /></button>
        </nav>
    );
};

const ColorSelect = ({ selectedColor, setSelectedColor }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (color) => {
        setSelectedColor(color);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full bg-white text-left px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {selectedColor ? <>
                        <span className="h-4 w-4 rounded-full border border-gray-200" style={{ backgroundColor: selectedColor.value }}></span>
                        <span className="text-black">{selectedColor.name}</span>
                    </> : <span className="text-gray-400">Select Color</span>}
                </div>
                <ChevronDownIcon />
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {COLORS.map(color => (
                        <div key={color.value} onClick={() => handleSelect(color)} className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                            <span className="h-4 w-4 rounded-full border border-gray-200" style={{ backgroundColor: color.value }}></span>
                            <span className="text-black">{color.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- FORM COMPONENT ---

const ButtonForm = ({ onSave, onCancel, initialData }) => {
    const isEditMode = !!initialData;
    const [word, setWord] = React.useState(initialData?.name || '');
    const [speakAs, setSpeakAs] = React.useState(initialData?.speakAs || '');
    const [selectedColor, setSelectedColor] = React.useState(initialData?.color || null);
    const [imagePreview, setImagePreview] = React.useState(initialData?.imageUrl || '');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!word.trim() || !selectedColor) {
            toast.error('Word and Color are required to save the button.');
            return;
        }
        onSave({
            name: word,
            speakAs: speakAs.trim(),
            color: selectedColor,
            imageUrl: imagePreview,
        });
    };
    
    const handleActionIconClick = (action) => {
        toast.success(`Simulating '${action}' action...`);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Button' : 'Add Button'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-2">Word</label>
                        <input type="text" id="word" value={word} onChange={(e) => setWord(e.target.value)} placeholder="Type the word" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-black placeholder-gray-500" />
                    </div>
                    <div>
                        <label htmlFor="speakAs" className="block text-sm font-medium text-gray-700 mb-2">Speak As</label>
                        <div className="relative">
                            <input type="text" id="speakAs" value={speakAs} onChange={(e) => setSpeakAs(e.target.value)} placeholder="Speak As (optional)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-black placeholder-gray-500" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2 text-gray-500">
                                <button type="button" onClick={() => handleActionIconClick('Speak')} className="hover:text-yellow-500"><SpeakerIcon /></button>
                                <button type="button" onClick={() => handleActionIconClick('Record')} className="hover:text-yellow-500"><MicrophoneIcon /></button>
                                <button type="button" onClick={() => setSpeakAs('')} className="hover:text-red-500"><TrashIcon /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ColorSelect selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image/Icon</label>
                        {imagePreview ? (
                            <div className='flex items-center gap-4'>
                                <img src={imagePreview} alt="Current" className="h-16 w-16 object-cover rounded-lg" />
                                <label htmlFor="file-upload" className="cursor-pointer text-sm font-semibold text-yellow-600 hover:text-yellow-500 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">Change Image/Icon</label>
                                <input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/>
                            </div>
                        ) : (
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                <div className="space-y-1 text-center">
                                    <UploadIcon />
                                    <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500"><span>Upload Image</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" /></label></div>
                                    <p className="text-xs text-gray-500">Image must be in JPG or PNG format</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-start gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition">Submit</button>
                </div>
            </form>
        </div>
    );
};

// --- LIST COMPONENT ---

const ButtonList = ({ buttons, categories, onEdit, onDelete, selectedCategory, onCategoryChange, currentPage, totalPages, onPageChange, searchQuery, onSearchChange }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Button List</h2>
                    <div className="relative">
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => onCategoryChange(Number(e.target.value))} 
                            className="appearance-none w-48 bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-8 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value={0}>All Categories</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><ChevronDownIcon /></div>
                    </div>
                </div>
                <div className="relative w-64">
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
                        <input
                            type="text"
                            placeholder="Search buttons..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="outline-none w-full text-sm text-gray-700 placeholder-gray-500"
                        />
                        <svg
                            className="w-5 h-5 text-gray-500 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-4 font-semibold text-gray-600">Button Text</th>
                            <th className="text-center p-4 font-semibold text-gray-600">Image</th>
                            <th className="text-center p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buttons.map(button => (
                            <tr key={button.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-gray-800">{button.name}</td>
                                <td className="p-4"><img src={button.imageUrl} alt={button.name} className="h-10 w-10 mx-auto object-cover rounded-md" onError={(e) => { e.target.src = 'https://placehold.co/40x40/FFCDD2/F44336?text=Error'; }} /></td>
                                <td className="p-4">
                                    <div className="flex gap-2 items-center justify-center">
                                        <button onClick={() => onEdit(button)} className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-200 transition">Edit</button>
                                        <button onClick={() => onDelete(button.id, button.name)} className="px-4 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {buttons.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                        {searchQuery
                            ? `No buttons found matching "${searchQuery}"${selectedCategory ? ' in this category' : ''}`
                            : selectedCategory
                            ? 'No buttons found in this category'
                            : 'No buttons found'}
                    </p>
                )}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function ButtonManagementApp() {
    const [buttons, setButtons] = React.useState(generateInitialButtons);
    const [view, setView] = React.useState('list');
    const [editingButton, setEditingButton] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState('');
    const itemsPerPage = 8;

    const filteredButtons = React.useMemo(() => {
        return buttons.filter(button => {
            const categoryMatch = !selectedCategory || button.categoryId === selectedCategory;
            const searchTerm = searchQuery.toLowerCase();
            const searchMatch = !searchQuery || 
                button.name.toLowerCase().includes(searchTerm) ||
                button.speakAs.toLowerCase().includes(searchTerm);
            return categoryMatch && searchMatch;
        });
    }, [buttons, selectedCategory, searchQuery]);

    const totalPages = Math.ceil(filteredButtons.length / itemsPerPage);
    
    const currentButtons = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredButtons.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredButtons, currentPage]);
    
    React.useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (currentPage > 1 && totalPages === 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };
    
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };

    const handleAddButton = (newButtonData) => {
        const newButton = {
            id: Date.now(),
            categoryId: selectedCategory || CATEGORIES[0].id,
            ...newButtonData,
        };
        setButtons(prev => [...prev, newButton]);
        setView('list');
        toast.success(`Button "${newButton.name}" added successfully!`);
    };

    const handleUpdateButton = (updatedButtonData) => {
        setButtons(buttons.map(b => b.id === editingButton.id ? { ...b, ...updatedButtonData } : b));
        setView('list');
        setEditingButton(null);
        toast.success(`Button "${updatedButtonData.name}" updated successfully!`);
    };

    const handleDeleteButton = (id, name) => {
        toast((t) => (
            <div className='flex flex-col'>
                <span className='text-sm font-semibold text-gray-800'>Are you sure you want to delete <strong className='text-red-600'>"{name}"</strong>?</span>
                <div className='flex justify-end gap-2 mt-3'>
                    <button 
                        onClick={() => toast.dismiss(t.id)} 
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            const updatedButtons = buttons.filter(b => b.id !== id);
                            setButtons(updatedButtons);
                            toast.dismiss(t.id);
                            toast.success(`Button "${name}" deleted.`);
                        }} 
                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), { 
            icon: '🗑️', 
            duration: 6000,
            style: { minWidth: '300px' } 
        });
    };
    
    const handleEditClick = (button) => {
        setEditingButton(button);
        setView('edit');
    };

    const handleCancel = () => {
        setView('list');
        setEditingButton(null);
    };

    const renderContent = () => {
        switch (view) {
            case 'add':
                return <ButtonForm onSave={handleAddButton} onCancel={handleCancel} />;
            case 'edit':
                return <ButtonForm onSave={handleUpdateButton} onCancel={handleCancel} initialData={editingButton} />;
            default:
                return <ButtonList 
                    buttons={currentButtons}
                    categories={CATEGORIES}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteButton}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    searchQuery={searchQuery}
                    onSearchChange={(value) => {
                        setSearchQuery(value);
                        setCurrentPage(1);
                    }}
                />;
        }
    };

    return (
        <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <Toaster />
            <div className="container mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Button Management</h1>
                    {view === 'list' && (
                        <button onClick={() => setView('add')} className="flex items-center justify-center bg-yellow-400 text-gray-800 font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300">
                            <PlusIcon /> Add Button
                        </button>
                    )}
                </header>
                <main>{renderContent()}</main>
            </div>
        </div>
    );
}
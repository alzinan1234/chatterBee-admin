"use client";
import React, { useState } from 'react';

// --- ICONS (as React components for easy use) ---
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const EditIcon = ({ className = "h-5 w-5" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const TrashIcon = ({ className = "h-5 w-5" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;


// --- MOCK DATA (Simulates fetching data from a database) ---
const initialPlans = [
    {
        id: 1,
        name: 'Free Plan',
        price: 0.00,
        category: 'Monthly',
        features: [
            'Limited features',
            '1 Caregiver seat',
            'No customizations',
            'No notifications',
        ],
        isActive: false,
    },
    {
        id: 2,
        name: 'Unlock ChatterBee Pro',
        price: 2.99,
        category: 'Monthly',
        features: [
            'Full features',
            '2 Caregiver seats',
            'Push notifications',
            'Customization options',
            'Add-ons: Extra caregiver seats & Multiple profiles',
        ],
        isActive: true,
    },
];

// --- REUSABLE FORM COMPONENT (For Creating and Editing) ---
const PlanForm = ({ onSave, onCancel, initialData }) => {
    const isEditMode = !!initialData;
    const [plan, setPlan] = useState({
        name: initialData?.name || '',
        price: initialData?.price || '',
        category: initialData?.category || 'Monthly',
        features: initialData?.features?.join('\n') || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlan(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!plan.name || plan.price === '' || !plan.category || !plan.features) {
            alert('Please fill out all fields.');
            return;
        }
        onSave({
            ...plan,
            price: parseFloat(plan.price),
            features: plan.features.split('\n').filter(f => f.trim() !== ''),
        });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">{isEditMode ? 'Edit Plan' : 'Create New Plan'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Package Categories *</label>
                        <div className="relative">
                            <select id="category" name="category" value={plan.category} onChange={handleInputChange} className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400">
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"><ChevronDownIcon /></div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Package Price *</label>
                        <input type="number" id="price" name="price" value={plan.price} onChange={handleInputChange} step="0.01" placeholder="$2.99" className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Plan Name *</label>
                        <input type="text" id="name" name="name" value={plan.name} onChange={handleInputChange} placeholder="Premium" className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">Package Features *</label>
                        <textarea id="features" name="features" value={plan.features} onChange={handleInputChange} rows="5" placeholder="Enter each feature on a new line..." className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400" />
                    </div>
                </div>
                <div className="flex items-center justify-start gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition">{isEditMode ? 'Submit' : 'Save'}</button>
                </div>
            </form>
        </div>
    );
};

// --- LIST COMPONENT (To display plan cards) ---
const PlanList = ({ plans, onEdit, onDelete, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map(plan => (
                <div key={plan.id} onClick={() => onSelect(plan.id)} className={`bg-white p-6 rounded-2xl shadow-sm border-2 transition-all cursor-pointer hover:shadow-md ${plan.isActive ? 'border-yellow-400' : 'border-transparent hover:border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${plan.isActive ? 'border-yellow-400' : 'border-gray-300'}`}>
                                {plan.isActive && <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{plan.name}</h3>
                                <p className="text-sm text-gray-500">
                                    ${plan.price.toFixed(2)}
                                    {plan.price > 0 && `/${plan.category === 'Monthly' ? 'month' : 'year'}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={(e) => { e.stopPropagation(); onEdit(plan); }} className="text-gray-400 hover:text-yellow-500 p-1"><EditIcon /></button>
                            <button onClick={(e) => { e.stopPropagation(); onDelete(plan.id); }} className="text-gray-400 hover:text-red-500 p-1"><TrashIcon /></button>
                        </div>
                    </div>
                    <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckIcon />
                                <span className="text-sm text-gray-600">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function SubscriptionManagementPage() {
    // --- STATE MANAGEMENT ---
    const [plans, setPlans] = useState(initialPlans);
    const [view, setView] = useState('list'); // 'list', 'create', 'edit'
    const [editingPlan, setEditingPlan] = useState(null);

    // --- CRUD HANDLERS ---
    const handleCreateNewClick = () => {
        setEditingPlan(null);
        setView('create');
    };

    const handleEditClick = (plan) => {
        setEditingPlan(plan);
        setView('edit');
    };

    const handleCancel = () => {
        setEditingPlan(null);
        setView('list');
    };

    const handleSavePlan = (planData) => {
        if (editingPlan) {
            setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...planData } : p));
        } else {
            const newPlan = { id: Date.now(), ...planData, isActive: false };
            setPlans([...plans, newPlan]);
        }
        setView('list');
    };

    const handleDeletePlan = (planId) => {
        if (window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
            setPlans(plans.filter(p => p.id !== planId));
        }
    };

    const handleSelectPlan = (planId) => {
        setPlans(plans.map(p => ({
            ...p,
            isActive: p.id === planId,
        })));
    };
    
    // --- RENDER LOGIC ---
    const renderContent = () => {
        switch (view) {
            case 'create':
                return <PlanForm onSave={handleSavePlan} onCancel={handleCancel} />;
            case 'edit':
                return <PlanForm onSave={handleSavePlan} onCancel={handleCancel} initialData={editingPlan} />;
            default:
                return <PlanList plans={plans} onEdit={handleEditClick} onDelete={handleDeletePlan} onSelect={handleSelectPlan} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Subscription Management</h1>
                    {view === 'list' && (
                        <button onClick={handleCreateNewClick} className="flex items-center justify-center bg-yellow-400 text-gray-800 font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300">
                            <PlusIcon /> Create New Plan
                        </button>
                    )}
                </header>
                <main>{renderContent()}</main>
            </div>
        </div>
    );
}
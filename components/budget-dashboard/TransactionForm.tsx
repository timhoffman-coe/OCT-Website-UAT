import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Transaction, TransactionStatus, DeploymentStatus, BudgetType } from './types';
import { PROGRAMS, TEAMS, CATEGORIES } from './constants';

interface TransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Transaction) => void;
    initialData?: Transaction | null;
    forcedType?: BudgetType;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, onSave, initialData, forcedType }) => {
    const [formData, setFormData] = useState<Partial<Transaction>>({
        purchaseYear: new Date().getFullYear(),
        status: TransactionStatus.PLANNED,
        deploymentStatus: DeploymentStatus.NOT_STARTED,
        budgetType: forcedType || BudgetType.CAPITAL
    });

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- sync form state with initialData prop
            setFormData(initialData);
        } else {
            // Reset for new entry
            setFormData({
                id: Math.random().toString(36).substring(2, 9),
                program: PROGRAMS[0],
                team: TEAMS[0],
                category: CATEGORIES[0],
                purchaseYear: new Date().getFullYear(),
                status: TransactionStatus.PLANNED,
                deploymentStatus: DeploymentStatus.NOT_STARTED,
                budgetType: forcedType || BudgetType.CAPITAL,
                amountApproved: 0,
                amountSpent: 0,
                nwaNumber: '',
                projectName: '',
                woNumber: '',
                poNumber: '',
                createdAt: new Date().toISOString(),
            });
        }
    }, [initialData, isOpen, forcedType]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('amount') || name === 'purchaseYear' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.program && formData.team && formData.category && formData.projectName) {
            onSave(formData as Transaction);
            onClose();
        } else {
            alert("Please fill in all mandatory fields (marked with *)");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#193A5A]/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 font-sans">
                        {initialData ? 'Edit Transaction' : 'New Entry'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Read Only ID */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-500 mb-1">Transaction ID</label>
                        <input
                            type="text"
                            disabled
                            value={formData.id || ''}
                            className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 text-sm cursor-not-allowed"
                        />
                    </div>

                    {/* Type Selector */}
                    <div className="col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100 mb-2">
                        <label className="block text-sm font-bold text-[#0081BC] mb-2 font-sans">Budget Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="budgetType"
                                    value={BudgetType.CAPITAL}
                                    checked={formData.budgetType === BudgetType.CAPITAL}
                                    onChange={handleChange}
                                    className="form-radio text-[#0081BC] focus:ring-[#0081BC]"
                                />
                                <span className="text-gray-700 font-medium">Capital (CapEx)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="budgetType"
                                    value={BudgetType.OPERATING}
                                    checked={formData.budgetType === BudgetType.OPERATING}
                                    onChange={handleChange}
                                    className="form-radio text-[#0081BC] focus:ring-[#0081BC]"
                                />
                                <span className="text-gray-700 font-medium">Operating (OpEx)</span>
                            </label>
                        </div>
                    </div>

                    {/* Mandatory Fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Program <span className="text-red-500">*</span></label>
                        <select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                            required
                        >
                            {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team <span className="text-red-500">*</span></label>
                        <select
                            name="team"
                            value={formData.team}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                            required
                        >
                            {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                            required
                        >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                            required
                            placeholder="e.g. Data Center Upgrade"
                        />
                    </div>

                    {/* Identifiers */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NWA Number</label>
                        <input
                            type="text"
                            name="nwaNumber"
                            value={formData.nwaNumber || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Year</label>
                        <input
                            type="number"
                            name="purchaseYear"
                            value={formData.purchaseYear || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">WO #</label>
                        <input
                            type="text"
                            name="woNumber"
                            value={formData.woNumber || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PO #</label>
                        <input
                            type="text"
                            name="poNumber"
                            value={formData.poNumber || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                        />
                    </div>

                    {/* Financials */}
                    <div className="bg-gray-50 p-4 rounded-lg col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200">
                        <h3 className="col-span-1 md:col-span-2 text-sm font-bold text-gray-500 uppercase font-sans">Financial Details</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Approved Funding ($)</label>
                            <input
                                type="number"
                                name="amountApproved"
                                value={formData.amountApproved || 0}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC] font-mono"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Actual Spent ($)</label>
                            <input
                                type="number"
                                name="amountSpent"
                                value={formData.amountSpent || 0}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC] font-mono"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Financial Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                        >
                            {Object.values(TransactionStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deployment Status</label>
                        <select
                            name="deploymentStatus"
                            value={formData.deploymentStatus}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#0081BC] focus:border-[#0081BC]"
                        >
                            {Object.values(DeploymentStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0081BC]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center space-x-2 px-6 py-2 text-sm font-medium text-white bg-[#0081BC] border border-transparent rounded-md hover:bg-[#005087] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0081BC]"
                        >
                            <Save size={16} />
                            <span>Save Transaction</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;

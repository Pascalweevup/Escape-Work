import React, { useState } from 'react';

// --- DATA EXTRACTED FROM PDFs V2 ---
const budgetData = {
    courances: { 
        id: 'courances',
        name: "Domaine de Courances", 
        totalTTC: 46603.07, 
        totalHT: 38835.89, 
        honorairesHT: 4160.99, 
        categories: { 
            lieux: 15019.20, 
            restauration: 12069.45, 
            technique: 0.00, 
            transports: 0.00, 
            extras: 7586.25, 
            accompagnement: 0.00 
        },
        details: {
            lieux: [
                { desc: "Chambres single (4 nuitées x 12 pers)", price: 9504.00 },
                { desc: "Taxe de séjour (48 unités)", price: 374.40 },
                { desc: "Location des salles (Le Fénil et le Loft)", price: 5140.80 }
            ],
            restauration: [
                { desc: "Petit-déjeuners (48 unités)", price: 925.34 },
                { desc: "Pauses du matin (48 unités)", price: 771.12 },
                { desc: "Déjeuners (60 unités)", price: 2570.40 },
                { desc: "Supplément Déjeuner plancha", price: 285.60 },
                { desc: "Dîners (48 unités)", price: 3290.11 },
                { desc: "Service traiteur à la journée", price: 4226.88 }
            ],
            extras: [
                { desc: "Atelier parfum d'exception", price: 1963.50 },
                { desc: "Activité Lego Serious Play®", price: 3153.50 },
                { desc: "Activité randonnée en forêt", price: 714.00 },
                { desc: "Animation Casino", price: 1755.25 }
            ]
        }
    },
    homanie: { 
        id: 'homanie',
        name: "Homanie Lyons La Forêt", 
        totalTTC: 38413.20, 
        totalHT: 32011.00, 
        honorairesHT: 3429.75, 
        categories: { 
            lieux: 20618.75, 
            restauration: 1650.00, 
            technique: 0.00, 
            transports: 0.00, 
            extras: 6312.50, 
            accompagnement: 0.00 
        },
        details: {
            lieux: [
                { desc: "Privatisation du lieu (Hébergement, Salles, Restauration)", price: 20618.75 }
            ],
            restauration: [
                { desc: "Supplément Dîner gastronomique (12 pers)", price: 1650.00 }
            ],
            extras: [
                { desc: "Atelier de fabrication de cidre", price: 1375.00 },
                { desc: "Activité escape game", price: 1375.00 },
                { desc: "Activité canoë sur l’Eure", price: 2062.50 },
                { desc: "Animation blind test", price: 1500.00 }
            ]
        }
    }
};

const categoryLabels = {
    lieux: "Lieux & Hébergement",
    restauration: "Restauration",
    technique: "Technique",
    transports: "Transports",
    extras: "Extras & Animations",
    accompagnement: "Accompagnement (Weever)"
};

// Utilisation des couleurs standard Tailwind au lieu d'une configuration personnalisée
const categoryColors = {
    lieux: "bg-blue-500",
    restauration: "bg-orange-500",
    technique: "bg-purple-500",
    transports: "bg-slate-500",
    extras: "bg-pink-500",
    accompagnement: "bg-teal-500"
};

const textColors = {
    lieux: "text-blue-500",
    restauration: "text-orange-500",
    technique: "text-purple-500",
    transports: "text-slate-500",
    extras: "text-pink-500",
    accompagnement: "text-teal-500"
};

// --- UTILS ---
const formatEur = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

// --- COMPONENTS ---

// Icons
const IconBuilding = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>;
const IconChart = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>;

const ComparisonView = () => {
    const venues = Object.values(budgetData);
    
    // Sort venues by total price (ascending) to find the cheapest
    const sortedVenues = [...venues].sort((a, b) => a.totalHT - b.totalHT);
    const maxTotalHT = Math.max(...venues.map(v => v.totalHT));

    return (
        <div className="space-y-8 animate-fade-in">
            
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {venues.map((venue) => {
                    return (
                        <div key={venue.id} className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{venue.name}</h3>
                            <div className="mb-2">
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Budget Total HT</p>
                                <p className="text-3xl font-bold text-gray-900">{formatEur(venue.totalHT)}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                                <span>Total TTC: {formatEur(venue.totalTTC)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Visual Bar Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition par catégorie (HT)</h3>
                
                <div className="space-y-6">
                    {venues.map(venue => (
                        <div key={venue.id}>
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span>{venue.name}</span>
                                <span>{formatEur(venue.totalHT - venue.honorairesHT)} HT <span className="text-gray-400 font-normal">(hors honoraires)</span></span>
                            </div>
                            {/* Stacked Bar Container */}
                            <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                {Object.entries(venue.categories).map(([catKey, catValue]) => {
                                    const percentage = (catValue / maxTotalHT) * 100;
                                    return (
                                        <div 
                                            key={catKey}
                                            className={`h-full ${categoryColors[catKey]} group relative cursor-pointer border-r border-white/20 last:border-0`}
                                            style={{ width: `${percentage}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 whitespace-nowrap">
                                                {categoryLabels[catKey]}: {formatEur(catValue)} HT
                                                <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Legend */}
                <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    {Object.entries(categoryLabels).map(([key, label]) => (
                        <div key={key} className="flex items-center text-xs text-gray-600">
                            <span className={`w-3 h-3 rounded-full mr-2 ${categoryColors[key]}`}></span>
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste de Dépense (HT)</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">BNF</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cirque d'Hiver</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.keys(categoryLabels).map(catKey => {
                                // Find minimum value in this category to highlight it
                                const values = venues.map(v => v.categories[catKey]);
                                const minVal = Math.min(...values);

                                return (
                                    <tr key={catKey} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 flex items-center">
                                            <span className={`w-2 h-2 rounded-full mr-2 ${categoryColors[catKey]}`}></span>
                                            {categoryLabels[catKey]}
                                        </td>
                                        {venues.map(venue => {
                                            const val = venue.categories[catKey];
                                            const isMin = val === minVal;
                                            return (
                                                <td key={`${catKey}-${venue.id}`} className={`px-6 py-4 whitespace-nowrap text-right ${isMin ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                                                    {formatEur(val)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                )
                            })}
                            
                            {/* Honoraires Row */}
                        <tr className="bg-gray-50 border-t-2 border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Honoraires Agence (10%)</td>
                            {venues.map(venue => (
                                <td key={`hon-${venue.id}`} className="px-6 py-4 whitespace-nowrap text-right text-gray-600">
                                    {formatEur(venue.honorairesHT)}
                                </td>
                            ))}
                        </tr>
                        
                        {/* Totals Row HT */}
                        <tr className="bg-sky-50 border-t border-sky-200">
                            <td className="px-6 py-4 whitespace-nowrap font-bold text-sky-900">TOTAL HT</td>
                            {venues.map(venue => {
                                const isCheapest = venue.id === sortedVenues[0].id;
                                return (
                                    <td key={`tot-ht-${venue.id}`} className={`px-6 py-4 whitespace-nowrap text-right font-bold text-lg ${isCheapest ? 'text-green-600' : 'text-sky-900'}`}>
                                        {formatEur(venue.totalHT)}
                                    </td>
                                );
                            })}
                        </tr>
                        
                        {/* Sub Totals Row TTC */}
                        <tr className="bg-sky-50/50">
                            <td className="px-6 py-3 whitespace-nowrap text-sm text-sky-700">Total TTC</td>
                            {venues.map(venue => (
                                <td key={`tot-ttc-${venue.id}`} className="px-6 py-3 whitespace-nowrap text-right text-sm text-sky-700">
                                    {formatEur(venue.totalTTC)}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
);
};

const VenueDetailView = ({ venueId }) => {
    const venue = budgetData[venueId];
    const subtotalHT = venue.totalHT - venue.honorairesHT;

    return (
        <div className="space-y-6 animate-fade-in">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{venue.name}</h2>
                    <p className="text-gray-500">Détail du devis estimatif</p>
                </div>
                <div className="text-right bg-sky-50 p-4 rounded-lg border border-sky-100">
                    <p className="text-sm font-medium text-sky-600 uppercase tracking-wider mb-1">Total HT</p>
                    <p className="text-3xl font-bold text-sky-900">{formatEur(venue.totalHT)}</p>
                    <p className="text-xs text-sky-500 mt-1">Total TTC: {formatEur(venue.totalTTC)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* List Breakdown */}
                <div className="lg:col-span-2 space-y-4">
                    {Object.entries(venue.categories).map(([catKey, catValue]) => {
                        const percentage = ((catValue / subtotalHT) * 100).toFixed(1);
                        return (
                            <div key={catKey} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`min-w-[3.5rem] px-2 h-10 rounded-lg flex items-center justify-center text-white ${categoryColors[catKey]}`}>
                                            <span className="font-bold text-sm">{percentage}%</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{categoryLabels[catKey]}</h4>
                                            <div className="w-48 bg-gray-200 rounded-full h-1.5 mt-2">
                                                <div className={`${categoryColors[catKey]} h-1.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">{formatEur(catValue)}</p>
                                        <p className="text-xs text-gray-500">HT</p>
                                    </div>
                                </div>
                                
                                {/* Lignes de détail ajoutées ici */}
                                {venue.details && venue.details[catKey] && (
                                    <div className="mt-2 pt-4 border-t border-gray-100 space-y-2">
                                        {venue.details[catKey].map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-end text-sm">
                                                <span className="text-gray-600">{item.desc}</span>
                                                <span className="text-gray-900 font-medium whitespace-nowrap ml-4">{formatEur(item.price)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h4 className="font-semibold text-gray-900">Honoraires Weever (10%)</h4>
                            <p className="text-sm text-gray-500">Calculés sur le sous-total HT</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{formatEur(venue.honorairesHT)}</p>
                            <p className="text-xs text-gray-500">HT</p>
                        </div>
                    </div>
                </div>

                {/* Summary Box */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Récapitulatif Financier</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Sous-total HT</span>
                                <span>{formatEur(subtotalHT)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Honoraires HT</span>
                                <span>{formatEur(venue.honorairesHT)}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between font-bold text-sky-600 text-lg">
                                <span>Total HT</span>
                                <span>{formatEur(venue.totalHT)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 text-sm mt-2">
                                <span>TVA estimée</span>
                                <span>{formatEur(venue.totalTTC - venue.totalHT)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Total TTC</span>
                                <span>{formatEur(venue.totalTTC)}</span>
                            </div>
                        </div>
                        
                        <div className="mt-6 bg-blue-50 text-blue-800 text-xs p-3 rounded border border-blue-100">
                            <strong>Note:</strong> Les montants indiqués (notamment les transports) sont provisionnels et seront ajustés au réel.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default function App() {
    const [activeTab, setActiveTab] = useState('compare');

    return (
        <div className="min-h-screen bg-slate-50 pb-12 font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                Escape Work
                            </h1>
                            <p className="text-sm text-gray-500">Comparateur interactif de propositions événementielles pour Escape Work</p>
                        </div>
                        
                        {/* Navigation Tabs */}
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
                            <button 
                                onClick={() => setActiveTab('compare')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${activeTab === 'compare' ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                            >
                                <IconChart /> Vue Comparée
                            </button>
                            {Object.values(budgetData).map(venue => (
                                <button 
                                    key={venue.id}
                                    onClick={() => setActiveTab(venue.id)}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${activeTab === venue.id ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                                >
                                    <IconBuilding /> {venue.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {activeTab === 'compare' ? <ComparisonView /> : <VenueDetailView venueId={activeTab} />}
            </main>
        </div>
    );
}

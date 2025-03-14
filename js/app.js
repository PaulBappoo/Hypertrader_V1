// Hypertrader V1 - Main Application

// Global state
const state = {
    tradingPairs: [],
    filteredPairs: [],
    selectedPair: null
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hypertrader V1 initialized');
    initApp();
});

// Main application initialization
function initApp() {
    // API connection setup
    setupAPIConnections();
    
    // Initialize UI components
    initUI();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load trading pairs from Binance
    loadTradingPairs();
}

// Setup connections to backend API
function setupAPIConnections() {
    // This will handle connections to your backend database
    console.log('API connections initialized');
}

// Initialize the user interface
function initUI() {
    // This will handle rendering of the trading interface
    console.log('UI initialized');
}

// Setup event listeners for user interactions
function setupEventListeners() {
    // Set up search functionality
    const searchInput = document.getElementById('pair-search');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    // Set up trading pair selection
    const pairsList = document.getElementById('pairs-list');
    if (pairsList) {
        pairsList.addEventListener('click', handlePairSelection);
    }
}

// Handle search input for trading pairs
function handleSearchInput(event) {
    const searchTerm = event.target.value.trim().toUpperCase();
    
    if (searchTerm === '') {
        state.filteredPairs = state.tradingPairs;
    } else {
        state.filteredPairs = state.tradingPairs.filter(pair => 
            pair.symbol.includes(searchTerm)
        );
    }
    
    renderTradingPairs();
}

// Handle trading pair selection
function handlePairSelection(event) {
    const target = event.target;
    
    // Ensure we clicked on a list item and not the loading message
    if (target.tagName === 'LI' && !target.classList.contains('loading')) {
        const symbol = target.getAttribute('data-symbol');
        
        if (symbol) {
            selectTradingPair(symbol);
        }
    }
}

// Select a trading pair
function selectTradingPair(symbol) {
    // Find the pair in our data
    const selectedPair = state.tradingPairs.find(pair => pair.symbol === symbol);
    
    if (selectedPair) {
        state.selectedPair = selectedPair;
        
        // Update UI to show selection
        document.querySelectorAll('.pairs-list li').forEach(item => {
            if (item.getAttribute('data-symbol') === symbol) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
        
        // Update selected pair info section
        const selectedPairElement = document.getElementById('selected-pair');
        if (selectedPairElement) {
            selectedPairElement.textContent = symbol;
        }
        
        console.log(`Selected trading pair: ${symbol}`);
        
        // Future: This is where you would load pair-specific data and update the chart
        loadPairData(symbol);
    }
}

// Load data for a specific trading pair
async function loadPairData(symbol) {
    try {
        // This will be expanded to load and display actual trading data
        console.log(`Loading data for ${symbol}...`);
        
        // Example: Fetch ticker data for the selected pair
        const tickerData = await api.fetchData(`/api/binance/ticker/${symbol}`);
        console.log('Ticker data:', tickerData);
        
        // Later: Update charts and other UI elements with the data
    } catch (error) {
        console.error(`Error loading data for ${symbol}:`, error);
    }
}

// Load trading pairs from Binance API
async function loadTradingPairs() {
    try {
        // Show loading state
        const pairsList = document.getElementById('pairs-list');
        if (pairsList) {
            pairsList.innerHTML = '<li class="loading">Loading trading pairs...</li>';
        }
        
        // Fetch trading pairs from Binance API via our backend proxy
        const data = await api.fetchData('/api/binance/exchangeInfo');
        
        // Extract trading pairs with USDT quote asset (can be customized later)
        state.tradingPairs = data.symbols
            .filter(symbol => symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING')
            .map(symbol => ({
                symbol: symbol.symbol,
                baseAsset: symbol.baseAsset,
                quoteAsset: symbol.quoteAsset
            }));
        
        // Sort by symbol
        state.tradingPairs.sort((a, b) => a.symbol.localeCompare(b.symbol));
        
        // Initialize filtered pairs to all pairs
        state.filteredPairs = [...state.tradingPairs];
        
        // Render the pairs list
        renderTradingPairs();
        
        console.log(`Loaded ${state.tradingPairs.length} trading pairs`);
    } catch (error) {
        console.error('Error loading trading pairs:', error);
        
        // Show error state
        const pairsList = document.getElementById('pairs-list');
        if (pairsList) {
            pairsList.innerHTML = '<li class="loading error">Failed to load trading pairs. Please refresh.</li>';
        }
    }
}

// Render the list of trading pairs in the UI
function renderTradingPairs() {
    const pairsList = document.getElementById('pairs-list');
    
    if (!pairsList) return;
    
    if (state.filteredPairs.length === 0) {
        pairsList.innerHTML = '<li class="loading">No matching trading pairs found</li>';
        return;
    }
    
    const selectedSymbol = state.selectedPair ? state.selectedPair.symbol : null;
    
    // Create HTML for pairs list
    const pairsHTML = state.filteredPairs.map(pair => {
        const isSelected = pair.symbol === selectedSymbol;
        return `
            <li data-symbol="${pair.symbol}" class="${isSelected ? 'selected' : ''}">
                ${pair.symbol}
            </li>
        `;
    }).join('');
    
    pairsList.innerHTML = pairsHTML;
}

// API communication module
const api = {
    // Fetch data from the backend or external APIs
    fetchData: async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            throw error;
        }
    },
    
    // Send data to the backend
    sendData: async (endpoint, data) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error sending data to ${endpoint}:`, error);
            throw error;
        }
    }
};

// Trading module
const tradingEngine = {
    // Placeholder for trading functionality
    // Will be expanded with actual trading logic
};

// Data visualization module
const dataViz = {
    // Placeholder for charting and data visualization
    // Will be expanded with charting functionality
};

// User settings module
const userSettings = {
    // Placeholder for user preferences and settings
    // Will be expanded with settings management
}; 
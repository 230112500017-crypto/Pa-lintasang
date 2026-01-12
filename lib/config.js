// Application Configuration
window.APP_CONFIG = {
    // Google Apps Script URL for data synchronization
    // Replace with your actual Google Apps Script deployment URL
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',

    // API Key for authentication (if required by your Google Apps Script)
    // Replace with your actual API key
    API_KEY: 'your_api_key_here',

    // Application settings
    APP_NAME: 'Pa\'lintasang Data',
    VERSION: '1.0.0',

    // Database settings
    DB_NAME: 'PaLintaSanDB',
    DB_VERSION: 1,

    // File upload settings
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],

    // UI settings
    ITEMS_PER_PAGE: 10,
    DEFAULT_CATEGORY: 'Lalu Lintas',

    // Development mode (set to false in production)
    DEV_MODE: true
};

// Development configuration override
if (window.APP_CONFIG.DEV_MODE) {
    console.log('🚀 Running in development mode');
    console.log('📋 Current configuration:', window.APP_CONFIG);

    // You can add development-specific settings here
    // For example, mock API endpoints, test data, etc.
}

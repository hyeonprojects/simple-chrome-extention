// Chrome extension background script

// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed:', details.reason);
    
    // Set up initial state or configuration
    chrome.storage.local.set({ isEnabled: true }, () => {
        console.log('Initial extension state set');
    });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message);
    
    // Handle different message types
    if (message.type === 'getData') {
        // Example of fetching data and sending a response
        sendResponse({ success: true, data: 'Background data response' });
        return true; // Return true for async response
    }
    
    if (message.type === 'performAction') {
        // Example of performing an action
        console.log('Performing action:', message.payload);
        sendResponse({ success: true });
        return true;
    }
});

// Handle browser action clicks (extension icon)
chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
        // Example: Send a message to the active tab
        chrome.tabs.sendMessage(tab.id, { type: 'toggleFeature' });
    }
});

// Example of context menu creation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'sampleContextMenu',
        title: 'Sample Action',
        contexts: ['selection']
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'sampleContextMenu' && tab?.id) {
        chrome.tabs.sendMessage(tab.id, { 
            type: 'contextMenuAction', 
            data: info.selectionText 
        });
    }
});

console.log('Background script loaded');
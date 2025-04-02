// Chrome extension content script
// This script is injected into web pages that match the manifest.json patterns

console.log('Content script loaded');

// Helper function to highlight text on the page
function highlightText(text: string): void {
    if (!text) return;
    
    const textNodes: Node[] = [];
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
    );
    
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent?.includes(text)) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (parent) {
            const content = textNode.textContent || '';
            const parts = content.split(text);
            
            if (parts.length > 1) {
                const fragment = document.createDocumentFragment();
                
                for (let i = 0; i < parts.length; i++) {
                    fragment.appendChild(document.createTextNode(parts[i]));
                    
                    if (i < parts.length - 1) {
                        const highlight = document.createElement('span');
                        highlight.textContent = text;
                        highlight.style.backgroundColor = 'yellow';
                        highlight.style.color = 'black';
                        fragment.appendChild(highlight);
                    }
                }
                
                parent.replaceChild(fragment, textNode);
            }
        }
    });
}

// Function to send data back to the background script
function sendToBackground(messageType: string, data: any): Promise<any> {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: messageType, payload: data }, (response) => {
            resolve(response);
        });
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Content script received message:', message);
    
    if (message.type === 'toggleFeature') {
        // Example of toggling a feature on the page
        const featureEnabled = document.body.classList.toggle('extension-feature-enabled');
        sendResponse({ success: true, enabled: featureEnabled });
        return true;
    }
    
    if (message.type === 'contextMenuAction' && message.data) {
        // Handle the context menu action from background script
        highlightText(message.data);
        sendResponse({ success: true });
        return true;
    }
    
    return false;
});

// Example: Add some CSS to the page
const injectStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .extension-feature-enabled {
            border: 2px solid blue;
        }
        
        .extension-injected-element {
            background-color: #f0f0f0;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);
};

// Initialize
const init = () => {
    injectStyles();
    console.log('Content script initialized');
    
    // Example: Notify background script that content script is ready
    sendToBackground('contentReady', { url: window.location.href })
        .then(response => {
            console.log('Background response:', response);
        });
};

// Run initialization
init();
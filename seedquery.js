// Function to copy text to clipboard using the Clipboard API or fallback
function copyToClipboard(text) {
    // Try using the modern Clipboard API if available and document is focused
    if (navigator.clipboard && document.hasFocus()) {
        navigator.clipboard.writeText(text).then(function() {
            console.log("Text copied to clipboard successfully.");
        }).catch(function(err) {
            console.error("Failed to copy text to clipboard: ", err);
        });
    } else {
        // Fallback for older browsers or if document is not focused
        console.log("Using fallback for clipboard copy.");
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);

        // Focus and select the text in the text area
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices

        // Try copying the selected text to clipboard
        try {
            document.execCommand('copy');
            console.log("Text copied to clipboard successfully.");
        } catch (err) {
            console.error("Failed to copy text to clipboard: ", err);
        }

        // Remove the temporary text area element
        document.body.removeChild(textArea);
    }
}

// Get the value from sessionStorage for the key "__telegram__initParams"
let __telegram__initParams = sessionStorage.getItem("__telegram__initParams");

// Ensure the key exists in sessionStorage
if (__telegram__initParams) {
    try {
        // Parse the JSON string to an object
        let initParamsObj = JSON.parse(__telegram__initParams);
        
        // Extract the tgWebAppData portion
        let tgWebAppData = initParamsObj.tgWebAppData;

        // Find the "query_id" data in the string
        let startIndex = tgWebAppData.indexOf("query_id");
        if (startIndex !== -1) {
            let userData = tgWebAppData.substring(startIndex); // Include 'query_id' in the copy
            
            // Copy the extracted user data (starting from 'query_id=') to the clipboard
            copyToClipboard(userData);

            console.log("User data copied to clipboard:", userData);
        } else {
            console.log("User data not found in tgWebAppData.");
        }
    } catch (err) {
        console.error("Failed to parse __telegram__initParams JSON:", err);
    }
} else {
    console.log("Session storage key '__telegram__initParams' not found.");
}

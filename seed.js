// Function to copy text to clipboard using the Clipboard API
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            console.log("Text copied to clipboard successfully.");
        }).catch(function(err) {
            console.error("Failed to copy text to clipboard: ", err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);

        textArea.select();
        document.execCommand('copy');
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

        // Decode the URL-encoded data (like %7B%22id%22...)
        let decodedData = decodeURIComponent(tgWebAppData);

        // Find the "user" data in the decoded string
        let startIndex = decodedData.indexOf("user=");
        if (startIndex !== -1) {
            let userData = decodedData.substring(startIndex + 5); // Skip 'user='
            
            // Copy the extracted user data to the clipboard
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

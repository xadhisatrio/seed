// Function to copy text to clipboard using a temporary text area
function copyToClipboard(text) {
    // Create a temporary text area element
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    // Select the text in the text area
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to clipboard
    try {
        document.execCommand('copy');
        console.log("Text copied to clipboard successfully.");
    } catch (err) {
        console.error("Failed to copy text to clipboard: ", err);
    }

    // Remove the temporary text area element
    document.body.removeChild(textArea);
}

// Get the value from sessionStorage for the key "__telegram__initParams"
let __telegram__initParams = sessionStorage.getItem("__telegram__initParams");

// Ensure the key exists in sessionStorage
if (__telegram__initParams) {
    // Find the index of "tgWebAppData:" and start after it
    let startIndex = __telegram__initParams.indexOf("tgWebAppData:");
    if (startIndex !== -1) {
        startIndex += "tgWebAppData:".length;  // Move index to right after "tgWebAppData:"
        let endIndex = __telegram__initParams.indexOf("&", startIndex);
        if (endIndex === -1) {
            endIndex = __telegram__initParams.length; // Take until the end of the string if "&" is not found
        }
        // Extract the substring after "tgWebAppData:"
        let dataPart = __telegram__initParams.substring(startIndex, endIndex);
        
        // Decode the extracted portion after it's fetched
        let decodedDataPart = decodeText(dataPart);

        // Copy dataPart to clipboard 
        copyToClipboard(dataPart);
    } else {
        console.log("Key 'tgWebAppData:' not found.");
    }
} else {
    console.log("Session storage key '__telegram__initParams' not found.");
}

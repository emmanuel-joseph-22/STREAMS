

export function formatString(str) {
    // Split the string into an array of words separated by underscores
    let words = str.split('_');

    // Capitalize the first letter of each word
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Join the words back together with spaces
    return words.join(' ');
}
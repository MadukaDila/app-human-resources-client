/**
 * Gets the formatted string value of the check-in time.
 *
 * @param {Date | null} checkin - The check-in time as a Date object or null.
 * @returns {string} The formatted check-in value or 'N/A' if null.
 */
export function formatCheckinValue(checkin: Date | null): string {
    return checkin ? checkin.toLocaleString() : 'N/A';
}

/**
 * Gets the formatted string value of the check-out time.
 *
 * @param {Date | null} checkout - The check-out time as a Date object or null.
 * @returns {string} The formatted check-out value or 'N/A' if null.
 */
export function formatCheckoutValue(checkout: Date | null): string {
    return checkout ? checkout.toLocaleString() : 'N/A';
}

/**
 * Converts a serial date to a formatted string.
 *
 * @param {number} serialDate - The serial date value to convert.
 * @returns {string} The formatted date string in "YYYY-MM-DD HH:mm:ss" format.
 */
export const convertSerialDateToFormattedString = (serialDate: number): string => {
    // Convert serial date to milliseconds and create a Date object
    const milliseconds = (serialDate - 25569) * 86400 * 1000;
    const date = new Date(milliseconds);

    // Format the date as "YYYY-MM-DD HH:mm:ss"
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

    return formattedDate;
};

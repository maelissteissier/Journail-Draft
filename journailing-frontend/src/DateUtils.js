// Result = 2023-05-28
export function getDayDateFromDatetime(datetime) {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Result = 3:11 AM
export function getTimeFromDatetime(datetime) {
    var timeString = datetime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    if (timeString.substr(0, 2) === "24") {
        return timeString.replace("24", "00");
    } else {
        return timeString;
    }

}

export function removeOneDayToDatetime(datetime) {
    const yesterday = new Date(datetime);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}

export function addOneDayToDatetime(datetime) {
    const yesterday = new Date(datetime);
    yesterday.setDate(yesterday.getDate() + 1);
    return yesterday;
}

// The strings need to be in format 2023-05-28 and 15:11
export function getDatetimeFromDateAndTime(dateString, timeString) {
    // Extract the date components from the date string
    const [year, month, day] = dateString.split("-");

// Extract the time components from the time string
    const [hours, minutes] = timeString.split(":");

// Create a new Date object using the extracted components
    return new Date(Date.UTC(year, month - 1, day, Number(hours), minutes));
}
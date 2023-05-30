// Result = 2023-05-28
export function getDayDateFromDatetime(datetime) {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Result = 3:11 AM
export function getTimeFromDatetime(datetime) {
    return datetime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
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
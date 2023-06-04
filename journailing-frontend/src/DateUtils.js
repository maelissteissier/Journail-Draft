// Result = 2023-05-28
export function getDateStringFromDatetime(datetime) {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(datetime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Result = 3:11 AM
export function getTimeStringFromDatetime(datetime) {
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
export function getUTCDateStringFromDateAndTime(dateString, timeString) {
    // Extract the date components from the date string
    const [year, month, day] = dateString.split("-");

// Extract the time components from the time string
    const [hours, minutes] = timeString.split(":");

// Create a new Date object using the extracted components
    var dateutc = Date.UTC(year, month - 1, day, Number(hours), minutes)

    var date = new Date(year, month - 1, day, Number(hours), minutes)
    var dateUTC = date.toISOString();
    return dateUTC;
}

export function changeTimeOfDatetime(datetime, newTime){
    var dateString = getDateStringFromDatetime(datetime);
    return new Date(getUTCDateStringFromDateAndTime(dateString, newTime));
}

// export function getDatetimeFromOnlyTimeString(timeString) {
//     var newDate = new Date();
//     var timeComponents = timeString.split(':');
//     var hours = parseInt(timeComponents[0]);
//     var minutes = parseInt(timeComponents[1]);
//     newDate.setHours(hours, minutes, 0);
//     return newDate
// }
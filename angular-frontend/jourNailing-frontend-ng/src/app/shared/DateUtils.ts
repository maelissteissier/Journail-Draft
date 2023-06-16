export default class DateUtils {
// Result = 2023-05-28
    static getDateStringFromDatetime(datetime: Date): string{
        const year = datetime.getFullYear();
        const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(datetime.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

// Result = 3:11 AM
    static getTimeStringFromDatetime(datetime: Date): string  {
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

    static removeOneDayToDatetime(datetime: Date): Date {
        const yesterday = new Date(datetime);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
    }

    static addOneDayToDatetime(datetime: Date): Date {
        const yesterday = new Date(datetime);
        yesterday.setDate(yesterday.getDate() + 1);
        return yesterday;
    }

// The strings need to be in format 2023-05-28 and 15:11
    static getUTCDateStringFromDateAndTime(dateString: string | undefined | null, timeString: string | undefined | null): string{
        var dateUTC = "";
        if (dateString && timeString) {
            // Extract the date components from the date string
            const [year, month, day] = dateString.split("-");
            // Extract the time components from the time string
            const [hours, minutes] = timeString.split(":");

// Create a new Date object using the extracted components
            var dateutc = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes))

            var date = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes))
            dateUTC = date.toISOString();
        }


        return dateUTC;
    }

    static changeTimeOfDatetime(datetime: Date, newTime: string): Date {
        var dateString = this.getDateStringFromDatetime(datetime);
        return new Date(this.getUTCDateStringFromDateAndTime(dateString, newTime));
    }

// export function getDatetimeFromOnlyTimeString(timeString) {
//     var newDate = new Date();
//     var timeComponents = timeString.split(':');
//     var hours = parseInt(timeComponents[0]);
//     var minutes = parseInt(timeComponents[1]);
//     newDate.setHours(hours, minutes, 0);
//     return newDate
// }
}

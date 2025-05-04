import { PipeTransform, Pipe, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {
    constructor() { }

    public convertToUTCLocaleTime(el: string | Date) {
        let newDate = new Date(el)
        newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset())
        return newDate
    }

    public convertToUTC0Time(el: string | Date) {
        return new Date(el.toString()).toISOString()
    }
}

/**
 * Pipe for convert date to LocaleDateTime
 */
@Pipe({
    name: 'datetime',
    standalone: false
})
export class DateTimePipe extends DateTimeService implements PipeTransform {
    constructor() { super() }
    transform = (el: any) => {
        let newDate = new Date(el)
        newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset())
        return newDate
    }
}

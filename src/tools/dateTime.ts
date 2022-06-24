export function getFullDate(timeStamp: number): string {
    let currentYear: number = new Date().getFullYear();
    let messageYear: number = new Date(timeStamp).getFullYear();
    let messageMonth: string = new Date(timeStamp).toLocaleString("en-US", { month: 'long' });
    let messageDay: number = new Date(timeStamp).getDate();
    if (messageYear < currentYear) return `${messageMonth} ${messageDay}, ${messageYear}`;
    return `${messageMonth} ${messageDay}`;
}

export function getFullTime(timeStamp: number): string {
    let hour: number = new Date(timeStamp).getHours();
    let minute: number = new Date(timeStamp).getMinutes();
    return `${hour}:${minute}`
}
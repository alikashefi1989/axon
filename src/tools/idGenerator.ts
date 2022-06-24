function idGenerator(): string {
    const chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 35; i++) {
        let index = Math.floor(Math.random() * 36);
        let char: string = typeof chars[index] === 'string' ? chars[index] : '#';
        if (i !== 0 && i % 8 === 0) {
            id = id + '-';
        }
        id = id + char;
    }
    return id;
}

export default idGenerator;
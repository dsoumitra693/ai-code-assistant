export const randomId= (length: number, prefix: string = 'id') => {
    return `${prefix}-${Math.random().toString(36).slice(2, length + 2)}`;
}
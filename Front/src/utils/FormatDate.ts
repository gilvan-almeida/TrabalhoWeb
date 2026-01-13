export const formatarDataBR = (dataString: string) => {
    if (!dataString) return "";
    
    const data = new Date(dataString);
    
    return new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'UTC',
    }).format(data);
};
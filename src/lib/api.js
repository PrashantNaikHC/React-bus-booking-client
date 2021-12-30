export const getServiceProviders = async() => {
    const response = await fetch("http://117.192.45.212/react-bus-services/providers");
    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.message || 'Could not fetch data');
    }
    if(response.status === 400) {
        throw new Error(data.message || 'Could not fetch data');
    }
    return data;
}

export const getServices = async() => {
    // todo
}

export const bookSeats = async() => {
    // todo
}
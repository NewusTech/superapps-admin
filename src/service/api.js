const apiUrl = process.env.REACT_APP_API_URL_LOCAL;

export const getAllPesanan = async () => {
    const response = await fetch(`${apiUrl}/pesanan/pesanan`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const getAllRute = async () => {
    const response = await fetch(`${apiUrl}/rute/master_rute`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const getAllCabang = async () => {
    const response = await fetch(`${apiUrl}/cabang/master_cabang`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const getAllSupir = async () => {
    const response = await fetch(`${apiUrl}/supir/master_supir`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const getAllMobil = async () => {
    const response = await fetch(`${apiUrl}/mobil/master_mobil`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });
    const data = await response.json();
    return data
}
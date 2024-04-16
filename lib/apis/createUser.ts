interface type {
    name: string;
    email: string;
    password: string;
}
export default async function createUser(submitValues: type) {
    try {
         const api = await fetch('https://api.escuelajs.co/api/v1/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(submitValues)
        })
        const res = await api.json()
        return res
    } catch (error: any) {
        console.error(error.message);
        return error.message
    }
}
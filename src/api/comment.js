export const add = async (body, token) => {
    const response = await fetch(`${url}/comments`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(body)
    })
            
    return await response.json()
    }

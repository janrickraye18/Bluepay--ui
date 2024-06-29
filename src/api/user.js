import {url} from './configuration'


export const index = async (token) => {
    const response = await fetch(`${url}/users`,{
        method:'GET',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}

export const product = async (token) => {
    const response = await fetch(`${url}/products`,{
        method:'GET',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}

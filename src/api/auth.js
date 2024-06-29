import {url} from './configuration'

export const register = async (body) => {
    const response = await fetch(`${url}/register`,{
    method: 'POST',
    headers:{
        Accept: 'application/json',
        "Content-type": 'application/json'
    },
    body:JSON.stringify(body)
    })

    return await response.json()
    }

export const login = async (body) => {
    const response = await fetch(`${url}/login`,{
    method: 'POST',
    headers:{
        Accept: 'application/json',
        "Content-type": 'application/json'
    },
    body:JSON.stringify(body)
    })
    
    return await response.json()
    }

export const checkToken = async (token) => {
    const response = await fetch(`${url}/checkToken`,{
        methodL:'GET',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    return await response.json()
    }
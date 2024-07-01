import {url} from './configuration'

export const index = async (token) => {
    const response = await fetch(`${url}/products`,{
        method:'GET',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
}

export const addProduct = async (body, token) => {
    const response = await fetch(`${url}/products/store`,{
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

export const destroy = async ( id, token) => {
    const response = await fetch(`${url}/products/${id}?_method=DELETE`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        
        return await response.json()
        }

export const update = async ( body,id, token) => {
    const response = await fetch(`${url}/products/${id}?_method=PATCH`,{
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

import {url} from './configuration'


export const index = async (token) => {
    const response = await fetch(`${url}/orders`,{
        method:'GET',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return await response.json()
    }

export const add = async (body, token) => {
    const response = await fetch(`${url}/orders`,{
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

export const showOrder = async (id, token) => {
        const response = await fetch(`${url}/customers/${id}`,{
            method:'GET',
            headers:{
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return await response.json()
        }

export const indexComment = async (token) => {
        const response = await fetch(`${url}/comments`,{
            method:'GET',
            headers:{
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return await response.json()
        }


export const hasPaid = async (id, token) => {
        const response = await fetch(`${url}/orders/${id}`,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
                    
        return await response.json()
        }

import axios from 'axios'

const domain = process.env.GAV_API_DOMAIN

export const gavProvider = {
    clientId: process.env.GAV_CLIENT_ID,
    clientSecret: process.env.GAV_CLIENT_SECRET
}

export const getToken = async (credentials) => {
    credentials.scope = ''
    credentials.grant_type = 'password'
    credentials.client_id = gavProvider.clientId
    credentials.client_secret = gavProvider.clientSecret
    try {
        const {data: tokens} = await axios.post(
            `${domain}/oauth/token`,
            credentials
        )
        return tokens
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getMe = async (access_token) => {
    try {
        const {data: me} = await axios.get(
            `${domain}/api/me`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/json',
                },
            }
        )
        return me
    } catch (error) {
        console.log(error)
        return null
    }
}
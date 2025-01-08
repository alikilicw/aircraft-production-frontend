import ReduxState from './redux-state'

export default class Request {
    private static getHeaders(useToken: boolean): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        }

        if (useToken) {
            headers['Authorization'] = 'Bearer ' + ReduxState.getToken()
        }

        return headers
    }

    public static async get({ endpoint = '', useToken = true }: { endpoint?: string; useToken?: boolean }) {
        const response = await fetch('http://localhost:5000/api/v1' + endpoint, {
            method: 'GET',
            headers: Request.getHeaders(useToken)
        })

        const result = await response.json()

        if (!response.ok) {
            console.log(result)
            console.log(Request.getHeaders(useToken))

            throw new Error(result.message || 'Failed to fetch user info')
        }

        return result
    }

    public static async post({
        body = {},
        endpoint = '',
        useToken = true
    }: {
        body: unknown
        endpoint?: string
        useToken?: boolean
    }) {
        const response = await fetch('http://localhost:5000/api/v1' + endpoint, {
            method: 'POST',
            headers: Request.getHeaders(useToken),
            body: JSON.stringify(body)
        })

        const result = await response.json()

        if (!response.ok) {
            console.log(result)

            throw new Error(result.message || 'Failed to post request.')
        }

        return result
    }
}

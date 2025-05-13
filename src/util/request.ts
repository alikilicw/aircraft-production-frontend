import ReduxState from './redux-state'

const ROOT_URL = process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL + '/api/v1'

export default class Request {
    private static getHeaders(useToken: boolean): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        }

        if (useToken) {
            headers['Authorization'] = 'Token ' + ReduxState.getToken()
        }

        return headers
    }

    public static async get({ endpoint = '', useToken = true }: { endpoint?: string; useToken?: boolean }) {
        const response = await fetch(ROOT_URL + endpoint, {
            method: 'GET',
            headers: Request.getHeaders(useToken)
        })

        const result = await response.json()
        if (!response.ok) {
            throw new Error(String(result))
        }

        return result
    }

    public static async post({
        body = {},
        endpoint = '',
        useToken = true
    }: {
        body?: unknown
        endpoint?: string
        useToken?: boolean
    }) {
        console.log(ROOT_URL, 'ROOT_URL')

        const response = await fetch(ROOT_URL + endpoint, {
            method: 'POST',
            headers: Request.getHeaders(useToken),
            body: JSON.stringify(body)
        })

        const result = await response.json()
        console.log(result, 'resultt')

        if (!response.ok) {
            throw new Error(String(result))
        }

        return result
    }

    public static async patch({ endpoint = '', useToken = true }: { endpoint?: string; useToken?: boolean }) {
        const response = await fetch(ROOT_URL + endpoint, {
            method: 'PATCH',
            headers: Request.getHeaders(useToken)
        })

        const result = await response.json()

        if (!response.ok) {
            console.log(result, 'RESULT')

            if (typeof result == 'object') {
                if ('errors' in result) throw new Error(String(result.errors[0]))
            }

            throw new Error(result)
        }

        return result
    }

    public static async delete({ endpoint = '', useToken = true }: { endpoint?: string; useToken?: boolean }) {
        const response = await fetch(ROOT_URL + endpoint, {
            method: 'DELETE',
            headers: Request.getHeaders(useToken)
        })

        if (!response.ok) {
            const result = await response.json()
            throw new Error(String(result))
        }
    }
}

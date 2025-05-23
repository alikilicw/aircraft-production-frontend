import { useShortTermStorage } from '@/hooks/store.hook'
import { useEffect, useState } from 'react'
import Request from '@/util/request'

type Token = string | 'unset' | 'invalid'

const useTokenCheck = (): Token => {
    const { getKeyValue, setKeyValue } = useShortTermStorage()
    const [token, setToken] = useState<Token>('unset')

    useEffect(() => {
        const tokenCheck = async () => {
            let token
            const tokenFromRedux = getKeyValue<string>('authToken')
            if (tokenFromRedux) token = tokenFromRedux
            else {
                const tokenFromLocalStorage = localStorage.getItem('authToken')
                if (tokenFromLocalStorage) {
                    token = tokenFromLocalStorage
                    setKeyValue('authToken', token)
                }
            }

            if (!token) setToken('invalid')
            else if (!getKeyValue('currentUser')) {
                console.log('whoami check')

                try {
                    const response = await Request.get({ endpoint: '/users/whoami' })
                    console.log(response, 'RESPONSE')

                    setKeyValue('currentUser', response)
                    setToken(token)
                } catch (error) {
                    setToken('invalid')
                    console.error('Error during fetch:', error)
                }
            } else setToken(token)
        }
        tokenCheck()
    }, [])

    return token
}

export default useTokenCheck

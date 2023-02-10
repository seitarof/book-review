import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import { url } from '../const'
import { User } from '../types/User'


export const useUser = () => {
  const [cookie] = useCookies(['token'])
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  const getUser = () => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        navigate('/login')
      })
  }

  const setUsername = (name: string) => {
    if (!user?.iconUrl) return
    const u: User = {
      name,
      iconUrl: user?.iconUrl,
    }
    setUser(u)
  }

  return { getUser, user, setUsername }
}

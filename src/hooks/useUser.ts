import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setUsername } from '../app/usernameSlice'
import { url } from '../const'
import { User } from '../types/User'

export const useUser = () => {
  const [cookie] = useCookies(['token'])
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()
  const username = useAppSelector((state) => state.username.value)
  const dispatch = useAppDispatch()

  const getUser = () => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setUser(res.data)
        dispatch(setUsername(res.data.name))
      })
      .catch((err) => {
        navigate('/login')
      })
  }

  return { getUser, user, setUser }
}

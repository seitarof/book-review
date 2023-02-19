import {
  Button,
  Flex,
  Img,
  Input,
  Text,
  Textarea,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setUsername } from '../../app/usernameSlice'
import { url } from '../../const'
import { useMessage } from '../../hooks/useMessage'
import { useUser } from '../../hooks/useUser'
import { User } from '../../types/User'

const EditUser = () => {
  const [cookie] = useCookies(['token'])
  const { getUser, user, setUser } = useUser()
  const { showMessage } = useMessage()
  const dispatch = useAppDispatch()

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ iconUrl: user?.iconUrl as string, name: e.target.value })
  }

  const putName = () => {
    axios
      .put(
        `${url}/users`,
        { name: user?.name },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        showMessage({ status: 'success', title: '名前を変更しました' })
        dispatch(setUsername(res.data.name))
      })
      .catch((err) => {
        showMessage({ status: 'error', title: err })
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <VStack
        spacing={5}
        p={{ base: 2, md: 10 }}
        justify="center"
        mx="auto"
        maxWidth="1000px"
      >
        <Text>名前</Text>
        <Flex>
          <Input
            value={user?.name || ''}
            maxWidth={300}
            onChange={handleChangeName}
          />
          <Button onClick={putName} ml={5}>
            変更
          </Button>
        </Flex>
        <Text pt={10}>アイコン</Text>
        <Img src={user?.iconUrl} />
      </VStack>
    </>
  )
}

export default EditUser

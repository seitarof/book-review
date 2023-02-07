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
import { useNavigate } from 'react-router'
import { url } from '../../const'
import { useMessage } from '../../hooks/useMessage'
import { User } from '../../types/User'

const EditUser = () => {
  const [cookie] = useCookies(['token'])
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>()
  const [icon, setIcon] = useState<string>()
  const { showMessage } = useMessage()

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const putName = () => {
    axios
      .put(
        `${url}/users`,
        { name: username },
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then(() => {
        showMessage({ status: 'success', title: '名前を変更しました' })
      })
      .catch((err) => {
        showMessage({ status: 'error', title: err })
      })
  }

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.name)
        setIcon(res.data.iconUrl)
      })
      .catch((err) => {
        navigate('/')
      })
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
          <Input value={username} maxWidth={300} onChange={handleChangeName} />
          <Button onClick={putName} ml={5}>
            変更
          </Button>
        </Flex>
        <Text>アイコン</Text>
        <Img src={icon} />
      </VStack>
    </>
  )
}

export default EditUser

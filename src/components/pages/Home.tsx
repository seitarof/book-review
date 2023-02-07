import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  decrement,
  increment,
  incrementByAmount,
  selectOffset,
} from '../../app/offsetSlice'
import { url } from '../../const'
import { Book } from '../../types/Book'
import Books from '../organisms/books/Books'

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [books, setBooks] = useState<Book[]>([])
  const offset = useAppSelector((state) => state.offset.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios
      .get(`${url}/books?offset=${offset}`, {
        headers: {
          Authorization: `
          Bearer ${cookies.token}
        `,
        },
      })
      .then((res) => {
        setBooks(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [offset])

  return (
    <>
      <Wrap
        p={{ base: 2, md: 10 }}
        justify="center"
        mx="auto"
        maxWidth="1000px"
      >
        <Books books={books} key={offset} />
      </Wrap>
      <Center>
        <HStack mb={10}>
          <Button disabled={offset === 0} onClick={() => dispatch(decrement())}>
            前へ
          </Button>
          {offset / 10 - 1 > 0 ? (
            <Button onClick={() => dispatch(incrementByAmount(-20))}>
              {offset / 10 - 1}
            </Button>
          ) : (
            <></>
          )}
          {offset / 10 > 0 ? (
            <Button onClick={() => dispatch(incrementByAmount(-10))}>
              {offset / 10}
            </Button>
          ) : (
            <></>
          )}
          <Button disabled={true}>{offset / 10 + 1}</Button>
          <Button onClick={() => dispatch(incrementByAmount(10))}>
            {offset / 10 + 2}
          </Button>
          <Button onClick={() => dispatch(incrementByAmount(20))}>
            {offset / 10 + 3}
          </Button>
          <Button onClick={() => dispatch(increment())}>次へ</Button>
        </HStack>
      </Center>
    </>
  )
}

export default Home

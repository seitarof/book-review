import { Box, Button, ButtonGroup, Wrap } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { decrement, increment, selectOffset } from '../../app/offsetSlice'
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
        <Box>
          <Button disabled={offset === 0} onClick={() => dispatch(decrement())}>
            前へ
          </Button>
          <Button onClick={() => dispatch(increment())}>次へ</Button>
        </Box>
      </Wrap>
    </>
  )
}

export default Home

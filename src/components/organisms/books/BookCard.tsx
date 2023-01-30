import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { FC } from 'react'

type Props = {
  title: string
  url: string
  review: string
  reviewer: string
}

const BookCard: FC<Props> = (props) => {
  const { title, url, review, reviewer } = props

  return (
    <>
      <Card w={400} h={400}>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <Heading size="xs">URL</Heading>
            <Link href={url}>
              {url.length > 30 ? url.substring(0, 30) + '...' : url}
            </Link>
            <Heading size="xs">レビュワー</Heading>
            <Text>{reviewer}</Text>
            <Heading size="xs">レビュー</Heading>
            <Text>{review}</Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}

export default BookCard

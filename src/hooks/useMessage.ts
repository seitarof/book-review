import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

type Props = {
  title: string
  status: 'success' | 'error' | 'warning' | 'info'
}

export const useMessage = () => {
  const toast = useToast()
  const showMessage = useCallback((props: Props) => {
    const { title, status } = props
    toast({
      title,
      status,
      isClosable: true,
      duration: 2000,
      position: 'bottom',
    })
  }, [])
  return { showMessage }
}

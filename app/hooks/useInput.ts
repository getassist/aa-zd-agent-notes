import { useState, useEffect, useMemo, ChangeEvent } from 'react'

const useInput = (initialValue: string, delay = 1000) => {
  const [input, setInput] = useState<string>(initialValue)
  const [value, setValue] = useState<string>(initialValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(input)
    }, delay)

    return () => clearTimeout(timeout)
  }, [input, delay])

  const handleChange = useMemo(() => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value)
    }
  }, [])

  return {
    value,
    handleChange,
  }
}

export default useInput
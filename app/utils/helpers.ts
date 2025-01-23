export const uuid = (length: number = 20): string => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let autoId = ''

  for (let i = 0; i < length; i += 1) {
      autoId += CHARS.charAt(
          Math.floor(Math.random() * CHARS.length),
      )
  }
  return autoId
}

export function isEqual(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const isEmptyObject = (object: object): boolean => {
  let isEmpty = Object.values(object).every((x) => x === null)
  return isEmpty
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const shortenNumber = (number: number): string => {
  let shortNumber = number

  if (number < 1000) return `${number}`

  let magnitude = 0
  while (Math.abs(shortNumber) >= 1000) {
      magnitude++
      shortNumber /= 1000.0
  }

  let suffix = ''
  if (magnitude === 1) {
      suffix = 'K'
  } else if (magnitude === 2) {
      suffix = 'M'
  } else if (magnitude === 3) {
      suffix = 'B'
  } else if (magnitude === 4) {
      suffix = 'T'
  }

  return shortNumber.toFixed(1) + suffix
}

export const isFirstInArray = <T>(array: T[], object: T) => {
  return array[0] === object
}

export const sortArray = <T>(array: T[], key: keyof T, ascending: boolean = true): T[] => {
  return array.sort((a, b) => {
    if (a[key] < b[key]) {
      return ascending ? -1 : 1        
    }
    if (a[key] > b[key]) {
        return ascending ? 1 : -1
    }
    return 0
  })
}

export const filterArray = <T>(array: T[], key: keyof T, value: string): T[] => {
  const fieldType = typeof (array[0][key])

  return array.filter((x) => {
    
    // handle strings
    if (fieldType === 'string') {
      const fitlerValue = x[key] as string
      if (fitlerValue.toLowerCase().includes(value.toLowerCase())) return x
    }

  })
}

export const filterArrayFromArray = <T>(array1: T[], array2: T[], key: keyof T): T[] => {
  return array1.filter((x) => !array2.some((y) => y[key] === x[key]))
}

export const capitalize = (string: string): string => {
  if (string.length === 0) return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getTextBeforeFirstNewline = (text: string): string => {
  const newlineIndex = text.indexOf('\n')
  return newlineIndex !== -1 ? text.substring(0, newlineIndex) : text
}

export const removeHtmlTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, '')
}
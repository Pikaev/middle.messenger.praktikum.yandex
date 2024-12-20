const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

type TMethod = (typeof METHODS)[keyof typeof METHODS]

interface IRequestOptions {
  method?: TMethod
  headers?: Record<string, string>
  data?: Record<string, unknown> | string
  timeout?: number
}

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    const value = data[key]
    const encodedValue = encodeURIComponent(
      value !== undefined ? String(value) : ''
    )
    return `${result}${key}=${encodedValue}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

class HTTPTransport {
  get = (
    url: string,
    options: IRequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  post = (
    url: string,
    options: IRequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  put = (
    url: string,
    options: IRequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  delete = (
    url: string,
    options: IRequestOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  request = (
    url: string,
    options: IRequestOptions = {},
    timeout: number = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(
        method,
        isGet && !!data && typeof data === 'object'
          ? `${url}${queryStringify(data)}`
          : url
      )

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(typeof data === 'string' ? data : JSON.stringify(data))
      }
    })
  }
}

export default HTTPTransport

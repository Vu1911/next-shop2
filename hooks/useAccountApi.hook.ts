import useSWR, { cache } from "swr"

export const useFetch = (url: string, fetcher: any) => {

  const { data, error } = useSWR(url, fetcher)


  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
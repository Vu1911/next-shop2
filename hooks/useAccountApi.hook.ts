import useSWR, { cache } from "swr"

export const useFetch = (url: string, fetcher: any) => {

  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  }
  )

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
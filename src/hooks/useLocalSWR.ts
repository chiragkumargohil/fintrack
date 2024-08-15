import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "@/lib/utils";

interface UseDataProps<T> extends SWRConfiguration {}

const useLocalSWR = <T>(key: string, options?: UseDataProps<T>) => {
  return useSWR<T>(key, fetcher, options);
};

export default useLocalSWR;

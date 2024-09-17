import { getEmployee } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployee = (offset: number, pageLimit: number, country: string | '') => {
  return useQuery({
    queryKey: ["employee", offset, pageLimit, country],
    queryFn: async () => getEmployee(offset, pageLimit, country),
  });
};

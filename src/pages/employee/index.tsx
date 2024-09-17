import PageHead from "@/components/shared/page-head";
import { useGetEmployee } from "./components/queries/queries";
import EmployeeTable from "./components/employee-table";
import { useSearchParams } from "react-router-dom";
import { DataTableSkeleton } from "@/components/shared/data-table-skeleton";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export default function EmployeePage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(searchParams.get("limit") || 10);
  const country = searchParams.get("search") || "";
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetEmployee(offset, pageLimit, country);
  const users = data?.users;
  const totalUsers = data?.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);

  if (isLoading) {
    return (
      <div className='p-5'>
        <DataTableSkeleton
          columnCount={5}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className='p-4 md:p-8'>
      <PageHead title='Employee Management' />
      <Breadcrumbs
        items={[
          { title: "Dashboard", link: "/" },
          { title: "Employee", link: "/employee" },
        ]}
      />
      <EmployeeTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}

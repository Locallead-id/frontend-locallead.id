import PageHead from "@/components/shared/page-head";
import { useGetEmployee } from "./components/queries/queries";
import EmployeeTable from "./components/employee-table";
import { useSearchParams } from "react-router-dom";
import { DataTableSkeleton } from "@/components/shared/data-table-skeleton";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function AdminUserPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageLimit = Number(searchParams.get("limit") || 10);
  const country = searchParams.get("search") || "";
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetEmployee(offset, pageLimit, country);
  // const users = data?.users;
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  // const totalUsers = data?.total_users; //1000

  useEffect(() => {
    axios("/admin/users/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        setUsers(res.data.data);
        setTotalUsers(res.data.total_users);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton columnCount={5} filterableColumnCount={2} searchableColumnCount={1} />
      </div>
    );
  }
  return (
    <div className="p-4 md:p-8">
      <PageHead title="Employee Management" />
      <Breadcrumbs
        items={[
          { title: "Dashboard", link: "/dashboard/admin" },
          { title: "User", link: "/dashboard/admin/employee" },
        ]}
      />
      <EmployeeTable users={users} page={page} totalUsers={totalUsers} pageCount={Math.ceil(totalUsers / pageLimit)} />
    </div>
  );
}

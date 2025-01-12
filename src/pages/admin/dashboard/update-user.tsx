import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import { useSearchParams } from "react-router-dom";

export default function AdminUpdateUserPage() {
  
  return (
    <>
      <div className="p-4 md:p-8">
        <PageHead title="Employee Management" />
        <Breadcrumbs
          items={[
            { title: "Dashboard", link: "/dashboard/admin" },
            { title: "Module", link: "/dashboard/admin/employee" },
            { title: `${""}`, link: "/dashboard/admin/assessments" },
          ]}
        />
      </div>
    </>
  );
}

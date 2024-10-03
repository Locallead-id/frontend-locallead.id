import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";

const ComparisonPage = () => {
  return (
    <div className='p-4 md:p-8'>
      <PageHead title='Employee Management' />
      <Breadcrumbs
        items={[
          { title: "Dashboard", link: "/" },
          { title: "Comparison", link: "/comparison" },
        ]}
      />

      
    </div>
  );
};

export default ComparisonPage;

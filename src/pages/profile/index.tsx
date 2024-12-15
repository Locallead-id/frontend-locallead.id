import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import PageHead from "@/components/shared/page-head";
import axios from "axios";
import  { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState();
  const fetchData = async () => {
    const response = await axios.get("/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    setProfileData(response.data);
  };
  useEffect(() => {
    fetchData()
      .catch((err) => console.error(err))
      .finally(() => console.log("done fetching user data"));
  }, []);

  return (
    <div>
      <div className='p-4 md:p-8 overflow-auto h-full'>
        <PageHead title='Profile' />
        <Breadcrumbs
          items={[
            { title: "Dashboard", link: "/" },
            { title: "Profile", link: "/dashboard/profile" },
          ]}
        />
        <div className='grid md:grid-cols-1 lg:grid-cols-2 mt-5'>
          <div>
            <img src={profileData} alt='' className='w-56 h-56' />
          </div>
          <div className='sm:mt-5 md:mt-5'>
            <div className='grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2 gap-3'>
              <div className='flex space-x-5 items-center'>
                <div>
                  <p className='text-gray-500 text-sm'>Name</p>
                  <h3 className='text-xl'>Rezaaa</h3>
                </div>
              </div>
              <div className='flex space-x-5 items-center'>
                <div>
                  <p className='text-gray-500 text-sm'>Placement</p>
                  <h3 className='text-xl'>Malang</h3>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

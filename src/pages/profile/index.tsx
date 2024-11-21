import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";

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

  return <div>Profile: {JSON.stringify(profileData)}</div>;
};

export default ProfilePage;

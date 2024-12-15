import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import Heading from "@/components/shared/heading";
import PageHead from "@/components/shared/page-head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "@/routes/hooks";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "lucide-react"; // Using Lucide icon for profile placeholder

const ProfilePage = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = response.data.data; // Assuming backend returns data in this structure

      // Pre-fill form with existing data
      setFullName(data.fullName || "");
      setEmail(data.email || "");
      setDateOfBirth(data.dateOfBirth || "");
      setAddress(data.address || "");
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance("/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          fullName,
          address,
          dateOfBirth,
        },
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // ** Midtrans **

  const paymentHandler = () => {};

  return (
    <ScrollArea className="h-screen w-full">
      <div className="p-4 md:p-8">
        <PageHead title="Profile Management" />
        <Breadcrumbs
          items={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "Profile", link: "/dashboard/profile" },
          ]}
        />
        <form onSubmit={handleUpdate}>
          <div className="mt-4 rounded-md border border-input bg-background p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl items-center mx-8">
              <div className="flex flex-col justify-center items-center">
                <User size={120} className="text-gray-400" />
                <div className="mt-12 flex flex-col justify-center items-center max-w-sm space-y-4 p-4  rounded-lg ">
                  <div className="border-2 border-[#FFA8A9] bg-white text-[#92292B] text-center px-4 py-3 rounded-md">
                    <p className="font-medium">Your account isn’t Premium. Upgrade now to unlock full test results and features!</p>
                  </div>
                  <Button className="bg-[#DA0004] hover:bg-[#DA0004] text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out" onClick={paymentHandler}>
                    Upgrade Now
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} readOnly className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-4">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};

export default ProfilePage;

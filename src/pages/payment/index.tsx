import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const PaymentPage = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Tabs
        defaultValue='personalInformation'
        className='flex flex-col items-center justify-center'
      >
        <TabsList>
          <TabsTrigger value='personalInformation'>
            Personal Information
          </TabsTrigger>
          <TabsTrigger value='packet'>Packet</TabsTrigger>
          <TabsTrigger value='finish'>Finish</TabsTrigger>
        </TabsList>
        <TabsContent value='personalInformation'>
          <div className='mx-12 mt-5'>
            <img
              className='w-10 h-auto'
              src='https://locallead.id/favicon.svg'
              alt='Logo'
            />
            <div className='flex flex-1'>
              <div className='w-3/5 me'>
                <h1 className='text-2xl font-bold mt-5'>Personal Detail</h1>
                <p className='mt-5 text-sm me-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className='me-5'>
                  <Input className='mt-5' placeholder='Full Name' />
                  <Input className='mt-5' placeholder='Email' />
                  <Input className='mt-5' placeholder='Phone Number' />
                </div>
                <div className='flex items-center justify-end mt-12 me-5'>
                  <Button>
                    <span>Continue</span>
                  </Button>
                </div>
              </div>
              <div className='w-2/5'>
                <h1 className='text-2xl font-bold mt-5'>Payment Method</h1>
                <p className='mt-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentPage;

'use client';

import Link from "next/link";
import React, { useState } from "react";
import { Instagram, Lock } from "@/icons";
import { Button, Input, Card, CardBody, CardHeader, CardFooter, Divider} from "@nextui-org/react";
import axiosInstance from "@/lib/axiosInstance"

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('api/auth/password-reset/', { email });
      if (response.status === 200) {
        alert('Password reset email sent. Please check your inbox.');
        router.push('/auth/login');
      } else {
        console.error('Password reset request failed');
      }
    } catch (error) {
      console.error('Password reset error:', error);
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center align-center">
      <div className="w-full">
        <div className="border-b border-[#DBDBDB] dark:border-[#262626] h-[60px] mb-6 mx-auto w-full">
          <div className="px-[20px] xl:w-[930px] mx-auto mt-4">
            <Instagram/>
          </div>
        </div>
        <div className="mx-auto w-full lg:w-[930px]">
          <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626]  w-full md:w-[340px] rounded-none mx-auto text-center">
            <CardHeader className="flex flex-col justify-center mt-3">
              <Lock/>
              <h1 className="text-xl font-bold mt-2">Trouble logging in?</h1>
              <span className="text-sm font-medium mt-2 ">Enter your email, phone, or username and we'll send you a link to get back into your account.</span>
            </CardHeader>
            <CardBody className="px-4 md:px-8 text-center">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <Input
                  required 
                  size='sm'
                  type="email"
                  label="Email"
                  value={email}
                  radius="none"
                  onChange={(e) => setEmail(e.target.value)}
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      'mt-3'
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "group-data-[focus=true]:bg-[#FAFAFA]",
                      "dark:group-data-[focus=true]:bg-default/30",
                      "!cursor-text",
                      "border border-[#E4E4E7] dark:border-[#262626]",
                    ],
                  }}
                />
                <Button fullWidth size="sm" type="submit" className="bg-[#4CB5F9] text-white mb-3">
                  Login
                </Button>
                <Link href='#' className="text-sm">can't reset password?</Link>
              </form>

              <div className="flex items-center justify-center mt-4 mb-3">
                <div className="flex h-5 items-center text-small ">
                  <Divider className="w-[100px]"/>
                  <div className='mx-[18px]'>OR</div>
                  <Divider className="w-[100px]"/>
                </div>
              </div>
              <div className="mb-14 text-[#1c2b33] dark:text-[#4CB5F9] hover:text-[#929292] font-semibold">
                <Link href="/auth/register" size="sm">Create new account</Link>
              </div>
            </CardBody>
            <CardFooter className="border-t border-[#DBDBDB] dark:border-[#262626] text-[#1c2b33] dark:text-[#4CB5F9] hover:text-[#929292]  font-semibold flex justify-center">
              <Link href="/auth/login">
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

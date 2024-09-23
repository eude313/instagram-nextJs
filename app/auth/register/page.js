'use client';

import Link from "next/link";
import { Instagram } from "@/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Button, Input, Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('api/auth/register/', {
        email,
        password,
        username,
        full_name: fullName
      });

      if (response.status === 201) {
        router.push("/auth/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error.message);
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center align-center pt-3">
      <div>
        <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626] w-full md:w-[340px] rounded-none px-4 md:px-6 text-center">
          <CardHeader className="flex justify-center pt-8">
            <Instagram width="170" height='50' className='mb-5' />
          </CardHeader>
          <CardBody>
            <span className="text-sm font-medium mt-2 text-center">
              Sign up to see photos and videos from your friends.
            </span>
            <Button color="primary" fullWidth size="sm" className="my-3 font-semibold">
              Log in with facebook
            </Button>
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-5 items-center text-small ">
                <Divider className="w-[100px]" />
                <div className='mx-[18px]'>OR</div>
                <Divider className="w-[100px]" />
              </div>
            </div>
            <form onSubmit={handleRegister} className="space-y-2 text-center">
              <Input
                required
                size="sm"
                type="email"
                value={email}
                radius="none"
                label="Mobile Number or Email"
                onChange={(e) => setEmail(e.target.value)}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "group-data-[focus=true]:bg-[#FAFAFA]",
                    "dark:group-data-[focus=true]:bg-default/30",
                    "!cursor-text",
                    "border border-[#DBDBDB] dark:border-[#262626]",
                  ],
                }}
              />
              <Input
                required
                type="text"
                size="sm"
                label="Full Name"
                value={fullName}
                radius="none"
                onChange={(e) => setFullName(e.target.value)}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "group-data-[focus=true]:bg-[#FAFAFA]",
                    "dark:group-data-[focus=true]:bg-default/30",
                    "!cursor-text",
                    "border border-[#DBDBDB] dark:border-[#262626]",
                  ],
                }}
              />
              <Input
                required
                type="text"
                size="sm"
                label="Username"
                value={username}
                radius="none"
                onChange={(e) => setUsername(e.target.value)}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "group-data-[focus=true]:bg-[#FAFAFA]",
                    "dark:group-data-[focus=true]:bg-default/30",
                    "!cursor-text",
                    "border border-[#DBDBDB] dark:border-[#262626]",
                  ],
                }}
              />
              <Input
                size="sm"
                radius="none"
                type={isVisible ? "text" : "password"}
                label="Password"
                value={password}
                endContent={
                  <h2 className="text-sm font-semibold my-auto text-[#1c2b33] dark:text-[#4CB5F9] cursor-pointer" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? 'Hide' : 'Show'}
                  </h2>
                }
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "group-data-[focus=true]:bg-default/30",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                    "border border-[#DBDBDB] dark:border-[#262626]",
                  ],
                }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className='text-xs leading-relaxed tracking-normal font-normal mt-2'>
                People who use our service may have uploaded your contact information to Instagram.
                <Link href='#' className="ml-2 text-[#1c2b33] dark:text-[#4CB5F9] font-semibold"> Learn More</Link>
              </p>
              <p className='text-xs leading-relaxed tracking-normal'>
                By signing up, you agree to our
                <Link href='#' className="ml-2 text-[#1c2b33] dark:text-[#4CB5F9] font-semibold"> Terms , Privacy Policy and Cookies Policy .</Link>
              </p>
              <Button fullWidth isLoading={isLoading} type="submit" size="sm" className="bg-[#4CB5F9]
               text-white mb-4 mt-2">
                Sign Up
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626] h-[60px]  w-full md:w-[340px] rounded-none text-center mt-4">
          <CardBody>
            <div className="text-center my-auto">
              <p className='text-sm'>Have an account?
                <Link href='/auth/login' className="ml-2 text-[#4CB5F9] dark:text-[#4CB5F9] font-semibold">Log in</Link>
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-none rounded-none w-full md:w-[340px] mt-2 px-2">
          <CardBody>
            <div className="text-center pb-1 mb-2">
              <small className="text-sm">Get the app.</small>
            </div>
            <Link href='#'>
              <Image className="rounded-none" src="/play.png" alt="cute kitty" />
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

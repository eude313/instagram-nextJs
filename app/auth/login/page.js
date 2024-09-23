'use client';

import Link from "next/link";
import { Instagram } from "@/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardBody, CardHeader, Image, Divider } from "@nextui-org/react";
import axiosInstance from "@/lib/axiosInstance"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await axiosInstance.post("api/auth/login/", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { access, refresh } = response.data; 
        localStorage.setItem("access_token", access);  
        localStorage.setItem("refresh_token", refresh);
        
        router.push("/"); 
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-screen h-screen  flex justify-center align-center">
      <div className="flex flex-row gap-4 my-auto">
        <Image
          className="min-w-full rounded-none hidden xl:block"
          src="/Instagram.png"
          alt="cute kitty"
        />
        <div className="flex flex-col my-auto">
          <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626] w-full md:w-[340px] rounded-none text-center px-4 md:px-8">
            <CardHeader className="flex justify-center pt-8">
              <Instagram width="170" height='50' className='mb-5'/>
            </CardHeader>
            <CardBody className="px-4">
              <form onSubmit={handleLogin} className="space-y-4 mb-3">
                <Input
                  required 
                  size="sm"
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
                      {isVisible ? 'Hide': 'Show' }
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
                <Button fullWidth type="submit" className="bg-[#4CB5F9] text-white" isLoading={isLoading}>
                  Login
                </Button>
              </form>
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-5 items-center text-small ">
                  <Divider className="w-[100px]"/>
                  <div className='mx-[18px]'>OR</div>
                  <Divider className="w-[100px]"/>
                </div>
              </div>
              <div className="text-[#1c2b33] dark:text-[#4CB5F9] text-center flex flex-col gap-y-4 ">
                <Link className="mb-2 font-semibold" href="#" >
                  Log in with facebook
                </Link>
                <Link href="/auth/password-reset" className="mb-2 text-sm">
                  Forgot password?
                </Link> 
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626] h-[60px] w-[340px] rounded-none text-center mt-4">
            <CardBody>
              <div className="text-center my-auto">
                <p className='text-sm'>Don't have an account?
                  <Link href='/auth/register'
                    className="ml-2 text-[#4CB5F9] font-semibold">Sign up
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-none rounded-none w-[340px] mt-2 px-2">
            <CardBody>
              <div class="text-center pb-1 mb-2">
                <small class="text-sm">Get the app.</small>
              </div>
              <Link href='#'>
                <Image
                  className="rounded-none"
                  src="/play.png"
                  alt="cute kitty"
                />
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

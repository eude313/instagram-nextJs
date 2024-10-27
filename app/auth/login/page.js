
'use client';

import Link from "next/link";
import { Instagram } from "@/icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardBody, CardHeader, Image, Divider } from "@nextui-org/react";
import ApiService from '@/lib/ApiService'; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const credentials = {
        email,
        password,
      };
      
      await ApiService.loginUser(credentials);
      router.push("/");
    } catch (error) {
      setErrorMessage(
        error.detail || 
        (typeof error === 'object' && error !== null ? 
          Object.values(error).flat().join(" ") : 
          "Login error. Please try again."
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);

  return (
    <div className="w-screen h-screen  flex justify-center align-center">
      <div className="flex flex-row lg:gap-4 my-auto">
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
              {errorMessage && (
                <div className="bg-red-500 text-white mb-1.5 text-center py-2">
                  <p>{errorMessage}</p>
                </div>
              )}
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

          <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626]
          h-[60px] w-[340px] rounded-none text-center mt-0 md:mt-4">
            <CardBody>
              <div className="text-center my-auto">
                <p className='text-sm'> 
                 <span> Dont have an account?</span>
                  <Link href='/auth/register'
                    className="ml-2 text-[#4CB5F9] font-semibold">Sign up
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-none rounded-none w-[340px] mt-0 md:mt-2 px-2">
            <CardBody>
              <div className="text-center pb-1 mt-0 md:mb-2">
                <small className="text-sm">Get the app.</small>
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
'use client';

import Link from "next/link";
import { Instagram } from "@/icons";
import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import ApiService from '@/lib/ApiService';
import { Button, Input, Card, CardBody, CardHeader, Image } from "@nextui-org/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
 

  const handleFullNameChange = (e) => {
    const name = e.target.value;
    setFullName(name);

    const nameParts = name.trim().split(/\s+/); 
    if (nameParts.length === 1) {
      setNameError("Your full name should be separated by a space.");
    } else if (nameParts.length === 2) {
      setFirstName(nameParts[0]);
      setLastName(nameParts[1]);
      setNameError(""); 
    } else {
      setNameError("Please enter only your first and last name.");
    }
  };

  // Updated handleRegister function to use ApiService
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = {
        email,
        password,
        username,
        first_name: firstName,
        last_name: lastName,
      };
      
      await ApiService.registerUser(userData);
      router.push("/auth/login");
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        if (error.detail) {
          setNameError(error.detail);
        } else {
          const errorMessages = Object.values(error).flat().join(" ");
          setNameError(errorMessages);
        }
      } else {
        setNameError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle border color based on name validation and focus
  const getBorderColor = () => {
    if (!isFocused && !nameError && firstName && lastName) {
      return '';
    } else if (nameError) {
      return 'border-red-500';
    } else if (firstName && lastName) {
      return 'border-green-500';
    }
    return 'border-[#DBDBDB] dark:border-[#262626]';
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
    <div className="w-screen h-screen overflow-x-hidden flex justify-center align-center pt-0 md:pt-3">
      <div>
        <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626] w-full md:w-[340px] rounded-none px-4 md:px-6 text-center">
          <CardHeader className="flex justify-center pt-8">
            <Instagram width="170" height='50' className='mb-5' />
          </CardHeader>
          <CardBody>
            {/* {errorMessage && (
              <div className="bg-red-500 text-white mb-1.5 text-center py-2">
                <p>{errorMessage}</p>
              </div>
            )} */}
            {nameError && (
              <div className="bg-red-500 text-white mb-1.5 text-center py-2">
                <p>{nameError}</p>
              </div>
            )}
            <span className="text-sm font-medium mt-2 text-center">
              Sign up to see photos and videos from your friends.
            </span>
            <Button color="primary" fullWidth size="sm" className="my-3 font-semibold">
              Log in with facebook
            </Button>
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-5 items-center text-small w-full">
                  <div className="grow md:w-[100px] min-w-fit h-[2px] bg-[#DBDBDB] dark:bg-[#27272A]" />
                  <div className="grow-0 mx-[18px]">OR</div>
                  <div className="grow md:w-[100px] min-w-fit h-[2px] bg-[#DBDBDB] dark:bg-[#27272A]" />
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
              {/* <Input
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
              /> */}
              <Input
                required
                type="text"
                size="sm"
                label="Full Name"
                value={fullName}
                radius="none"
                onChange={handleFullNameChange}
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
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
                    `border ${getBorderColor()}`, 
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

        <Card className="shadow-none md:border border-[#DBDBDB] dark:border-[#262626] 
        h-[60px] w-full md:w-[340px] rounded-none text-center mt-0 md:mt-4">
          <CardBody>
            <div className="text-center my-auto">
              <p className='text-sm'>Have an account?
                <Link href='/auth/login' className="ml-2 text-[#4CB5F9] dark:text-[#4CB5F9] font-semibold">Log in</Link>
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-none rounded-none w-full md:w-[340px] mt-0 md:mt-2 px-2">
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

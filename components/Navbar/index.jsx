import { NAVBAR_CONSTANTS } from "@/data";
import Link from "next/link";
import {
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
  Avatar,
} from "@nextui-org/react";
import { CgMenuGridO } from "react-icons/cg";

export default function App() {
  return (
    // <Navbar>
    //   <NavbarContent>
    //     <NavbarBrand>
    //       <Image
    //         src='/logo.png'
    //         alt='logo'
    //         height='60px'
    //         width='60px'
    //       />
    //       <p className='font-bold text-inherit'>TRANQUIL ESSENCE</p>
    //     </NavbarBrand>
    //   </NavbarContent>

    //   <NavbarContent
    //     className='hidden sm:flex gap-4'
    //     justify='center'>
    //     <NavbarItem>
    //       {NAVBAR_CONSTANTS.NAV_LINKS.map((link) => (
    //         <Link
    //           href={link.href}
    //           key={link.key}
    //           color='foreground'
    //           aria-current='page'>
    //           {link.label}
    //         </Link>
    //       ))}
    //     </NavbarItem>
    //   </NavbarContent>
    //   <NavbarContent
    //     as='div'
    //     justify='end'>
    //     <Dropdown placement='bottom-end'>
    //       <DropdownTrigger>
    //         <Button
    //           size='lg'
    //           isIconOnly
    //           className='bg-[#d8ba6d74] text-[#b99c51]'
    //           aria-label='Book'
    //           variant='flat'>
    //           <CgMenuGridO />
    //         </Button>
    //       </DropdownTrigger>
    //       <DropdownMenu
    //         aria-label='Profile Actions'
    //         variant='flat'>
    //         <DropdownItem key='profile'>Signed</DropdownItem>
    //         <DropdownItem key='settings'>My Settings</DropdownItem>
    //         <DropdownItem key='team_settings'>Team Settings</DropdownItem>
    //         <DropdownItem key='analytics'>Analytics</DropdownItem>
    //         <DropdownItem key='system'>System</DropdownItem>
    //         <DropdownItem key='configurations'>Configurations</DropdownItem>
    //         <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
    //         <DropdownItem
    //           key='logout'
    //           color='danger'>
    //           Log Out
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </Dropdown>

    //   </NavbarContent>
    // </Navbar>
    <Navbar>
      <NavbarBrand>
        <CgMenuGridO />
        <p className='font-bold text-inherit'>ACME</p>
      </NavbarBrand>

      <NavbarContent
        className='hidden sm:flex gap-4'
        justify='center'>
        <NavbarItem>
          <Link
            color='foreground'
            href='#'>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            href='#'
            aria-current='page'
            color='secondary'>
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color='foreground'
            href='#'>
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        as='div'
        justify='end'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Jason Hughes'
              size='sm'
              src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Profile Actions'
            variant='flat'>
            <DropdownItem
              key='profile'
              className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem
              key='logout'
              color='danger'>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

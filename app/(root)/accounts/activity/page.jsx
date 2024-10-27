//  'use client';

// import React, { useState } from "react";
// import { Button,} from "@nextui-org/react";
// import NestedDropdown from "@/components/NestedDropdown";
// import { Menu, DotsMenu, Threads, Setting, Bookmark, MessageWarning, Activity, } from '@/icons';
// import { TiSocialTwitter, TiSocialFacebook } from "react-icons/ti";
// import { BiLogoTelegram } from "react-icons/bi";
// import { RiInstagramFill } from "react-icons/ri";
// import { IoMoon } from "react-icons/io5";

// export default function ActivityPage() {
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     // Dropdown 1 with Theme Switch and Custom Styles
//     const menuItemsWithTheme = [
//         { key: "settings", label: "Settings", href: "/accounts/settings", icon: <Setting /> },
//         { key: "activity", label: "Your activity", href: "/accounts/activity", icon: <Activity /> },
//         { key: "saved", label: "Saved", icon: <Bookmark /> },
//         { key: "report-problem", label: "Report a problem", icon: <MessageWarning /> },
//         {
//             key: "theme",
//             label: "Switch Theme",
//             hasSubmenu: true,
//             icon: <IoMoon />,
//             children: [{ key: "themeToggle", type: "toggle", label: "Dark Mode" }],
//         },
//         { key: "threads", label: "Threads", icon: <Threads /> },
//         { key: "switch-account", label: "Switch account" },
//         { key: "logout", label: "Logout" },
//     ];

//     const customMenuStylesWithTheme = {
//         5: "border-y-3 dark:border-y-[#3F3F46] border-y-[#dcdcdc] py-2 px-2 mx-[0px]",
//         6: "border-b-1 border-b-[#dcdcdc] dark:border-b-[#3F3F46]",
//     };

//     const handleThemeToggle = () => {
//         setIsDarkMode(!isDarkMode);
//     };

//     // Dropdown 2 with Simple Menu (no Theme Switch)
//     const simpleMenuItems = [
//         { key: "report", label: "Report" },
//         { key: "follow", label: "Follow" },
//         { key: "goto-post", label: "Go to post" },
//         { 
//             key: "share-to", 
//             label: "Share to...", 
//             hasSubmenu: true, 
//             children: [
//                 { key: "instagram", label: "Instagram", icon: <RiInstagramFill /> },
//                 { key: "facebook", label: "Facebook", icon: <TiSocialFacebook /> },
//                 { key: "twitter", label: "Twitter", icon: <TiSocialTwitter /> },
//                 { key: "telegram", label: "Telegram", icon: <BiLogoTelegram /> },
//             ] 
//         },
//         { key: "copy", label: "Copy link" },
//         { key: "embed", label: "Embed" },
//         { key: "about", label: "About this account" },
//     ];

//     return (
//         <div className="grow h-screen overflow-y-auto flex flex-col ">
//             <div className="mb-auto">
//                 <Button>Open Menu</Button>
//             </div>
//             {/* <NestedDropdown /> */}
//             <div className="flex space-x-4">
//                 {/* Dropdown 1 with Theme Switch and Custom Styles */}
//                 <NestedDropdown
//                     menuItems={menuItemsWithTheme}
//                     onItemClick={(key) => console.log('Selected from dropdown 1:', key)}
//                     isDarkMode={isDarkMode}
//                     onThemeToggle={handleThemeToggle}
//                     triggerButtonContent={
//                         <div className="flex">
//                             <Menu className="md:mr-0" />
//                             <span className="ml-2 xl:ml-4">More</span>
//                         </div>
//                     }
//                     triggerButtonStyle="hover:bg-[#F2F2F2]  dark:hover:bg-[#1A1A1A] dark:hover:text-white font-light  active:font-bold dark:text-gray-300 "
//                     customMenuStyles={customMenuStylesWithTheme}
//                 />

//                 {/* Dropdown 2 with Simple Menu */}
//                 <NestedDropdown
//                     menuItems={simpleMenuItems}
//                     onItemClick={(key) => console.log('Selected from dropdown 2:', key)}
//                     triggerButtonContent={<DotsMenu />}
//                 //triggerButtonStyle="bg-blue-500 text-white hover:bg-blue-600"
//                 />
//             </div>
//         </div>
//     );
// }

'use client';

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import NestedDropdown from "@/components/NestedDropdown";
import { Menu, DotsMenu, Threads, Setting, Bookmark, MessageWarning, Activity } from '@/icons';
import { TiSocialTwitter, TiSocialFacebook } from "react-icons/ti";
import { BiLogoTelegram } from "react-icons/bi";
import { RiInstagramFill } from "react-icons/ri";
import { IoMoon } from "react-icons/io5";

export default function ActivityPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Dropdown 1 with Theme Switch and Custom Styles
    const menuItemsWithTheme = [
        {
            key: "settings",
            label: "Settings",
            href: "/accounts/settings",
            icon: <Setting className="w-5 h-5" />
        },
        {
            key: "activity",
            label: "Your activity",
            href: "/accounts/activity",
            icon: <Activity className="w-5 h-5" />
        },
        {
            key: "saved",
            label: "Saved",
            icon: <Bookmark className="w-5 h-5" />
        },
        {
            key: "report-problem",
            label: "Report a problem",
            icon: <MessageWarning className="w-5 h-5" />
        },
        {
            key: "theme",
            label: "Switch Theme",
            hasSubmenu: true,
            icon: <IoMoon className="w-5 h-5" />,
            children: [{
                key: "themeToggle",
                type: "toggle",
                label: "Dark Mode",
                icon: <IoMoon className="w-5 h-5" />
            }],
        },
        {
            key: "threads",
            label: "Threads",
            icon: <Threads className="w-5 h-5" />
        },
        { key: "switch-account", label: "Switch account" },
        { key: "logout", label: "Logout" },
    ];

    // Dropdown 2 with Simple Menu (no Theme Switch)
    const simpleMenuItems = [
        { key: "report", label: "Report" },
        { key: "follow", label: "Follow" },
        { key: "goto-post", label: "Go to post" },
        {
            key: "share-to",
            label: "Share to...",
            hasSubmenu: true,
            children: [
                {
                    key: "instagram",
                    label: "Instagram",
                    icon: <RiInstagramFill className="w-5 h-5" />
                },
                {
                    key: "facebook",
                    label: "Facebook",
                    icon: <TiSocialFacebook className="w-5 h-5" />
                },
                {
                    key: "twitter",
                    label: "Twitter",
                    icon: <TiSocialTwitter className="w-5 h-5" />
                },
                {
                    key: "telegram",
                    label: "Telegram",
                    icon: <BiLogoTelegram className="w-5 h-5" />
                },
            ]
        },
        { key: "copy", label: "Copy link" },
        { key: "embed", label: "Embed" },
        { key: "about", label: "About this account" },
    ];

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="grow h-screen overflow-y-auto flex flex-col">
            <div className="mb-auto">
                <Button>Open Menu</Button>
            </div>
            <div className="flex space-x-4">
                {/* Dropdown 1 with Theme Switch and Custom Styles */}
                <NestedDropdown
                    menuItems={menuItemsWithTheme}
                    onItemClick={(key) => console.log('Selected from dropdown 1:', key)}
                    isDarkMode={isDarkMode}
                    onThemeToggle={handleThemeToggle}
                    triggerButtonContent={
                        <div className="flex items-center">
                            <Menu className="w-5 h-5" />
                            <span className="ml-2 xl:ml-4">More</span>
                        </div>
                    }
                    triggerButtonStyle="hover:bg-[#F2F2F2] dark:hover:bg-[#1A1A1A] dark:hover:text-white font-light active:font-bold dark:text-gray-300"
                />

                {/* Dropdown 2 with Simple Menu */}
                <NestedDropdown
                    menuItems={simpleMenuItems}
                    onItemClick={(key) => console.log('Selected from dropdown 2:', key)}
                    triggerButtonContent={<DotsMenu className="w-5 h-5" />}
                    triggerButtonStyle="hover:bg-[#F2F2F2] dark:hover:bg-[#1A1A1A] dark:hover:text-white"
                />
            </div>
        </div>
    );
}
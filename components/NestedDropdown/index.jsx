import { Back } from '@/icons';
import { IoSunny, IoMoon } from "react-icons/io5";
import { useState, useRef, useEffect } from 'react';
import { ThemeSwitch } from '../ThemeSwitch';

export default function NestedDropdown({
    menuItems,
    onItemClick,
    triggerButtonContent,
    triggerButtonStyle = "",
    customMenuStyles = {},
    isThemeDropdown = false,
    isScreenSmall = false,
    isMessagesPage = false,
    isSearchSidebarOpen = false,
    isNotificationsSidebarOpen = false,
    isDarkMode = false,
    onThemeToggle = null,
    dropdownType = "default"
}) {
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState('');
    const [currentTheme, setCurrentTheme] = useState(isDarkMode);
    const [submenuPosition, setSubmenuPosition] = useState('');

    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const mainMenuRef = useRef(null);

    useEffect(() => {
        setCurrentTheme(isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        function updateDropdownPosition() {
            if (!triggerRef.current || !isMainOpen) return;

            // For theme dropdown - keep existing behavior
            if (isThemeDropdown) {
                if (isScreenSmall || isMessagesPage || isSearchSidebarOpen || isNotificationsSidebarOpen) {
                    setDropdownPosition('bottom: 6px; left: 72px;');
                    setSubmenuPosition('bottom: 6px; left: 72px;');
                } else {
                    setDropdownPosition('bottom: 65px; left: 20px;');
                    setSubmenuPosition('bottom: 65px; left: 20px;');
                }
            }
            // For reel/post dropdown - maintain same position for submenu
            else {
                if (isScreenSmall) {
                    const position = 'bottom: 50px; right: 40px;';
                    setDropdownPosition(position);
                    setSubmenuPosition(position);
                } else {
                    const position = 'bottom: 65px; right: 20px;';
                    setDropdownPosition(position);
                    setSubmenuPosition(position);
                }
            }
        }

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMainOpen(false);
                setActiveSubmenu(null);
            }
        }

        function handleScroll() {
            if (isMainOpen) {
                updateDropdownPosition();
            }
        }

        updateDropdownPosition();
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateDropdownPosition);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [isMainOpen, isMessagesPage, isNotificationsSidebarOpen, isScreenSmall, isSearchSidebarOpen, isThemeDropdown, activeSubmenu]);

    const handleSubItemClick = (key) => {
        if (onItemClick) onItemClick(key);
        setIsMainOpen(false);
        setActiveSubmenu(null);
    };

    const handleThemeToggle = () => {
        setCurrentTheme(!currentTheme);
        if (onThemeToggle) onThemeToggle();
    };

    const Divider = () => (
        <div className="my-2 -mx-1">
            <div className="h-[3px] dark:bg-[#3F3F46] bg-[#dcdcdc]" />
        </div>
    );

    const SecondDivider = () => (
        <div className="my-2 -mx-1">
            <div className="h-[1px] dark:bg-[#3F3F46] bg-[#dcdcdc]" />
        </div>
    );

    const SubmenuDivider = () => (
        <div className="my-2 -mx-1">
            <div className="h-[1px] dark:bg-[#3F3F46] bg-[#dcdcdc]" />
        </div>
    );

    const stringToStyle = (styleString) => {
        if (!styleString) return {};

        return styleString
            .split(';')
            .filter(style => style.trim())
            .reduce((acc, style) => {
                const [property, value] = style.split(':').map(str => str.trim());
                const camelProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
                acc[camelProperty] = value;
                return acc;
            }, {});
    };

    const renderSubmenuHeader = () => {
        if (isThemeDropdown) {
            return (
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex items-center">
                        <span className="-rotate-90 w-4 h-4 mr-3 text-gray-600 dark:text-gray-400">
                            <Back width="15" height="15" />
                        </span>
                        <span>Switch mode</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                        {currentTheme ? (
                            <IoMoon className="w-5 h-5" />
                        ) : (
                            <IoSunny className="w-5 h-5" />
                        )}
                    </span>
                </div>
            );
        } else {
            return (
                <div className="flex flex-row w-full">
                    <span className="-rotate-90 w-4 h-4 mr-3 text-gray-600 dark:text-gray-400">
                        <Back width="15" height="15" />
                    </span>
                    <span>Back to menu</span>
                </div>
            );
        }
    };

    const renderMenu = () => (
        <div
            ref={mainMenuRef}
            className="fixed z-50 w-[266px] max-h-[490px] overflow-y-auto p-[6px] m-[0px] 
                bg-white rounded-md shadow-lg dark:bg-[#262626]"
            style={{
                position: 'fixed',
                ...stringToStyle(activeSubmenu ? submenuPosition : dropdownPosition)
            }}
        >
            <div className="py-[1.5px]">
                {!activeSubmenu ? (
                    menuItems?.map((item, index) => (
                        <div key={item.key}>
                            <button
                                onClick={() => {
                                    if (item.hasSubmenu) {
                                        setActiveSubmenu(item);
                                    } else if (item.onClick) {
                                        item.onClick();
                                        setIsMainOpen(false);
                                    } else if (item.href) {
                                        window.location.href = item.href;
                                        setIsMainOpen(false);
                                    } else {
                                        handleSubItemClick(item.key);
                                    }
                                }}
                                className={`flex items-center justify-between
                                    text-left w-full py-3 px-4 hover:bg-[#F2F2F2] rounded-lg 
                                    transition-colors duration-300 font-light active:font-bold 
                                    dark:text-gray-300 dark:hover:bg-[#1A1A1A] dark:hover:text-white my-1.5
                                    ${customMenuStyles[index] || ""}`}
                            >
                                <span className="flex items-center">
                                    {item.icon && (
                                        <span className="inline-flex items-center justify-center mr-3 text-gray-600 dark:text-gray-400">
                                            {item.icon}
                                        </span>
                                    )}
                                    {item.label}
                                </span>
                            </button>
                            {(item.key === "threads" || item.key === "theme") && <Divider />}
                            {item.key === "switch-account" && <SecondDivider />}
                        </div>
                    ))
                ) : (
                    <>
                        <button
                            onClick={() => setActiveSubmenu(null)}
                            className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-[#F2F2F2] rounded-lg hover:text-gray-900 dark:text-gray-300 
                            dark:hover:bg-[#1A1A1A] dark:hover:text-white my-1.5"
                        >
                            {renderSubmenuHeader()}
                        </button>

                        <SubmenuDivider />

                        {activeSubmenu.children?.map((subItem) => (
                            <div key={subItem.key}>
                                {subItem.type === 'toggle' ? (
                                    <div className="flex items-center justify-between px-4 py-3 text-sm 
                                    text-gray-700 dark:text-gray-300 my-1.5">
                                        <span className="flex items-center">
                                            <span className="inline-flex items-center justify-center mr-3 text-gray-600 dark:text-gray-400">
                                                {currentTheme ? (
                                                    <IoMoon className="w-5 h-5" />
                                                ) : (
                                                    <IoSunny className="w-5 h-5" />
                                                )}
                                            </span>
                                            {subItem.label}
                                        </span>
                                        <ThemeSwitch checked={currentTheme} onChange={handleThemeToggle} />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleSubItemClick(subItem.key)}
                                        className="flex items-center w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-[#F2F2F2] rounded-lg hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#1A1A1A] dark:hover:text-white my-1.5"
                                    >
                                        {subItem.icon && (
                                            <span className="inline-flex items-center justify-center mr-3 text-gray-600 dark:text-gray-400">
                                                {subItem.icon}
                                            </span>
                                        )}
                                        {subItem.label}
                                    </button>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="relative" ref={triggerRef}>
            {isMainOpen && renderMenu()}
            <button
                onClick={() => {
                    setIsMainOpen(!isMainOpen);
                    setActiveSubmenu(null);
                }}
                className={`bg-inherit ${triggerButtonStyle}`}
            >
                {triggerButtonContent}
            </button>
        </div>
    );
}
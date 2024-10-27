import React from 'react';

export default function AccountsLayout({ children }) {
    return (
        <main className='flex'>
            <div className="grow h-screen overflow-y-auto">
                {children}
            </div>
        </main>
    );
}



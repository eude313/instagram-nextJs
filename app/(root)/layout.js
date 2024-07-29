import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <main className='flex flex-row'>
      <aside className='border-r border-[#DBDBDB] w-[245px] h-screen overflow-hidden px-[12px] pt-[8px] pb-[20px] dark:border-[#262626]'aria-label="Sidebar">
        <Sidebar/>
      </aside>
      <section className='border border-success w-fit h-full flex-1'>{children}</section>
    </main>
  );
}

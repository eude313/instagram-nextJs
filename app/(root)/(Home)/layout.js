import Navbar from "@/components/Navbar";
import SideList from "@/components/SideList";
import Stories from "@/components/Stories";
import PostModal from '@/components/PostModal';
import PostMenuModal from '@/components/PostMenuModal'

export default function HomeLayout({ children }) {
  return (
    <main className='w-auto px-auto md:flex md:justify-center'>
      <div className="flex flex-row">
        <section className='w-full md:w-[630px] h-full'>
          <div className='border-b border-[#DBDBDB] dark:border-[#262626] h-auto my-3 pb-2 block md:hidden'>
            <Navbar/>
          </div>
          <div className='mt-4 mb-0 md:mb-6 px-1 pb-2 border-b md:border-0 border-[#DBDBDB] dark:border-[#262626]'>
            <Stories/>
          </div>
          <div className="pt-2">
            <div className="mb-2 h-[60rem] z-0 w-full md:w-[470px] md:mx-auto xl:w-[530px]">
              {children}
            </div>
          </div>
        </section>
        <aside className='h-full flex-1 xl:w-[400px] pl-[50px] xl:pl-[64px] pt-5 hidden lg:block'>
          <SideList/>
        </aside>
      </div>
      <PostModal />
      <PostMenuModal/>
    </main>
  );
}


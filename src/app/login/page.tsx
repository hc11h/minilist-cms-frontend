import GoogleLogin from "@/app/login/GoogleLogin";
import { Header } from "@/components/sections/Header";

export default function page() {
  return (

     <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-0">
           <GoogleLogin/>
          </main>
          {/* <Footer /> */}
        </div>
   
  );
}
import { Button } from "../../../components/ui/button";
import { LogInIcon } from "lucide-react";
import { ModeToggle } from "../../../components/shared/theme-toggle";
import { useRouter } from "@/routes/hooks";

const HeaderLandingPage = () => {
  const router = useRouter();
  return (
    <header className='sticky top-0 backdrop-blur-sm z-10 w-full'>
      <div className='px-12 py-5'>
        <div className='flex items-center justify-between'>
          <img
            className='w-10 h-auto'
            src='https://locallead.id/favicon.svg'
            alt='Logo'
          />
          <div className='space-x-4'>
            <ModeToggle />
            <Button
              onClick={() => router.push("/login")}
              className='font-medium'
            >
              <LogInIcon className='w-4 h-4 mr-2' />
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLandingPage;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section>
      <div className='flex flex-col md:mx-44 mx-12 my-8'>
        <div className='flex items-center justify-center'>
          <h1 className='font-bold text-3xl mt-16 mb-8'>
            Frequently Ask Questions (FAQ)
          </h1>
        </div>
        <div className='grid gap-12 grid-cols-1 lg:grid-cols-2'>
          <div>
            <div className='flex items-center justify-center my-4'>
              <h1 className='text-2xl font-medium'>Filling</h1>
            </div>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  Bagaimana Cara Memulai Mengisi Profiling?
                </AccordionTrigger>
                <AccordionContent>
                  Anda harus memiliki akun berupa email dan password untuk bisa
                  mengisi profiling. Bagian HR PT Semen Baturaja (Tbk) akan
                  membagikan email dan password ke masing-masing peserta. Jika
                  butuh bantuan, anda dapat menghubungi Help Desk Locallead
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>
                  Apakah saya bisa mengganti password?
                </AccordionTrigger>
                <AccordionContent>
                  Setelah memperoleh password, anda dapat login dan langsung
                  mengganti password yang diberikan melalui menu Account
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>
                  Mengapa saya tidak bisa login?
                </AccordionTrigger>
                <AccordionContent>
                  Login di awal menggunakan email dan password yang telah
                  diberikan berupa karakter yang "case sensitif" artinya huruf
                  besar dan kecil dianggap berbeda. Pastikan anda menginputkan
                  karakter dengan benar. Bila anda masih menemui kendala,
                  silakan hubungi bagian HR PT Semen Baturaja (Tbk) atau Help
                  Desk Locallead
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger>
                  Mengapa saya tidak bisa login?
                </AccordionTrigger>
                <AccordionContent>
                  Login di awal menggunakan email dan password yang telah
                  diberikan berupa karakter yang "case sensitif" artinya huruf
                  besar dan kecil dianggap berbeda. Pastikan anda menginputkan
                  karakter dengan benar. Bila anda masih menemui kendala,
                  silakan hubungi bagian HR PT Semen Baturaja (Tbk) atau Help
                  Desk Locallead
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <div className='flex items-center justify-center my-4'>
              <h1 className='text-2xl font-medium'>About this Profiling</h1>
            </div>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  Bagaimana Cara Memulai Mengisi Profiling?
                </AccordionTrigger>
                <AccordionContent>
                  Anda harus memiliki akun berupa email dan password untuk bisa
                  mengisi profiling. Bagian HR PT Semen Baturaja (Tbk) akan
                  membagikan email dan password ke masing-masing peserta. Jika
                  butuh bantuan, anda dapat menghubungi Help Desk Locallead
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>
                  Apakah saya bisa mengganti password?
                </AccordionTrigger>
                <AccordionContent>
                  Setelah memperoleh password, anda dapat login dan langsung
                  mengganti password yang diberikan melalui menu Account
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>
                  Mengapa saya tidak bisa login?
                </AccordionTrigger>
                <AccordionContent>
                  Login di awal menggunakan email dan password yang telah
                  diberikan berupa karakter yang "case sensitif" artinya huruf
                  besar dan kecil dianggap berbeda. Pastikan anda menginputkan
                  karakter dengan benar. Bila anda masih menemui kendala,
                  silakan hubungi bagian HR PT Semen Baturaja (Tbk) atau Help
                  Desk Locallead
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger>
                  Mengapa saya tidak bisa login?
                </AccordionTrigger>
                <AccordionContent>
                  Login di awal menggunakan email dan password yang telah
                  diberikan berupa karakter yang "case sensitif" artinya huruf
                  besar dan kecil dianggap berbeda. Pastikan anda menginputkan
                  karakter dengan benar. Bila anda masih menemui kendala,
                  silakan hubungi bagian HR PT Semen Baturaja (Tbk) atau Help
                  Desk Locallead
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

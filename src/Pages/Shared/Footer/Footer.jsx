import Logo from '../../../Components/Logo';

const Footer = () => {
  return (
    <footer className="">
      <aside>
        <p>
          <div className='flex justify-between'>
            <div>
              <Logo></Logo>
            </div>
           <div className='flex gap-8 '>
             <h1>
              hdhdh
            </h1>
            <h1>
              hdhdh
            </h1>
            <h1>
              hdhdh
            </h1>
            <h1>
              hdhdh
            </h1>
            <h1>
              hdhdh
            </h1>
           </div>
          </div>
        </p>
         <p className='text-center'> Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd</p>
      </aside>
    </footer>
  );
};

export default Footer;

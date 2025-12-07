import Logo from '../../../Components/Logo';

const Footer = () => {
  return (
    <footer className="">
      <aside>
        <p>
          <div>
            <Logo></Logo>
            jvvkjhv
          </div>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

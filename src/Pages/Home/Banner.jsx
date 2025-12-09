import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import banar1 from '../../assets/banner1.png';
import banar2 from '../../assets/banner2.png';
import banar3 from '../../assets/banner3.png';

const Banner = () => {
  return (
    <div className='md:mt-10 mt-3'>
      <Carousel infiniteLoop={true} autoPlay={true}>
        <div>
          <img src={banar1} />
          <p className=""></p>
        </div>
        <div>
          <img src={banar2} />
          <p className=""></p>
        </div>
        <div>
          <img src={banar3} />
          <p className=""></p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

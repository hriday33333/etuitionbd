import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import banar1 from '../../assets/banner1.png';
import banar2 from '../../assets/banner2.png';
import banar3 from '../../assets/banner3.png';

const Banner = () => {
  return (
    <Carousel
    infiniteLoop={true}
    autoPlay={true}>
      <div>
        <img src={banar1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={banar2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={banar3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;

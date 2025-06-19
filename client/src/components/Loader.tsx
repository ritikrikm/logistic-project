
import Lottie from 'lottie-react';
import loadingAnimation from '../animations/loading.json'; // Put your JSON in src/animations/

const Loader = ({ size = 100 }: { size?: number }) => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={loadingAnimation}
        loop
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Loader;

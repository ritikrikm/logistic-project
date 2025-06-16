import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

interface PartnersProps {
  partners: { name: string; logo: string; url?: string }[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="partners py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Trusted by our Partners</h2>
        <Slider {...settings}>
          {partners.map((p) => (
            <div key={p.name} className="px-4">
              <a
                href={p.url ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="mx-auto h-12 object-contain transition duration-200"
                />
              </a>
            </div>
          ))}
        </Slider>

        <Link
          to="/contact"
          className="inline-block bg-[#0a1f60] text-white px-6 py-3 rounded-md hover:bg-[#07184b] transition text-sm font-medium mt-8"
        >
          Become a Partner
        </Link>
      </div>
    </section>
  );
};

export default Partners;

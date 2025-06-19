import { FC } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import partnerList from '../data/partnerList';

const Partners: FC = () => {
  const nationalPartners = partnerList.filter((p) =>
    [
      'Blue Dart',
      'SpiceJet',
      'Xpressbees',
      'Skart',
      'Overseas',
      'Rajdhani',
      'The Logisticians',
      'Times',
      'Zephyr',
      'Continental',
      'Skyways',
      'TPL',
      'M5 Continental Logistics',
      'XP',
      'Last Mile',
      'Total Logix',
      'Ekta Express',
      'Movein',
    ].includes(p.name)
  );

  const internationalPartners = partnerList.filter(
    (p) => !nationalPartners.find((n) => n.name === p.name)
  );

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

  const PartnerCarousel = ({
    title,
    partners,
  }: {
    title: string;
    partners: typeof partnerList;
  }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
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
    </div>
  );

  return (
    <section className="partners py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
      

        <PartnerCarousel title="National Partners" partners={nationalPartners} />
        <PartnerCarousel title="International Partners" partners={internationalPartners} />

        <Link
  to="/contact"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="inline-block bg-[#0a1f60] text-white px-6 py-3 rounded-md hover:bg-[#07184b] transition text-sm font-medium mt-8"
>
  Become a Partner
</Link>
      </div>
    </section>
  );
};

export default Partners;

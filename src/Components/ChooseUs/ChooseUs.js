import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { EffectFade, Pagination, Autoplay, Navigation } from "swiper/modules";
import Styles from "./ChooseUs.module.css";
export default function ChooseUsSwiper() {
  const data = [
    {
      title: "24 x 7 User Support",
      text: "We use latest technology for the latest world because we know the demand of peoples We use latest technology for the latest world because we know the demand of peoples.",
      icon: (
        <AccessTimeFilledIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
    {
      title: "24 x 7 User Support",
      text: "We use latest technology for the latest world because we know the demand of peoples We use latest technology for the latest world because we know the demand of peoples.",
      icon: (
        <AccessTimeFilledIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
    {
      title: "24 x 7 User Support",
      text: "We use latest technology for the latest world because we know the demand of peoples We use latest technology for the latest world because we know the demand of peoples.",
      icon: (
        <AccessTimeFilledIcon
          sx={{
            width: "50px",
            height: "50px",
          }}
        />
      ),
    },
  ];
  return (
    <div className={Styles.container}>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide>
              <section key={index} className={Styles.card}>
                <span className={Styles.icon}>{item.icon}</span>
                <span className={Styles.rigth}>
                  <h3 className={Styles.title}>{item.title}</h3>
                  <p className={Styles.p}>{item.text}</p>
                </span>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

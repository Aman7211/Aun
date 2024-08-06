import React from "react";
import image01 from '../assets/media/21.jpeg';
import image02 from '../assets/media/22.jpeg';
import image03 from '../assets/media/23.jpeg';
import image04 from '../assets/media/24.jpeg';
import image05 from '../assets/media/25.jpeg';
import image06 from '../assets/media/26.jpeg';
import image07 from '../assets/media/27.jpeg';

export function FeaturedImage() {

  const data = [
    { imgelink: image01 },
    { imgelink: image02 },
    { imgelink: image03 },
    { imgelink: image04 },
    { imgelink: image05 },
    { imgelink: image06 },
    { imgelink: image07 },
  ];

  const [activeImages, setActiveImages] = React.useState([image01, image02]);

  const handleThumbnailClick = (imgelink, index) => {
    setActiveImages(prevState => {
      const newActiveImages = [...prevState];
      newActiveImages[index] = imgelink;
      return newActiveImages;
    });
  };

  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        {activeImages.map((img, index) => (
          <img
            key={index}
            className="h-auto w-1/2 rounded-lg cover md:h-[600px] mx-1"
            src={img}
            alt=""
          />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {data.map(({ imgelink }, index) => (
          <div key={index} className="md:mx-2">
            <img
              onClick={() => handleThumbnailClick(imgelink, index % 2)}
              src={imgelink}
              className="h-[50px] md:h-[100px] w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

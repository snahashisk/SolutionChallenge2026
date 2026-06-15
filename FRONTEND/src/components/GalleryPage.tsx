import Gallery from "@/components/shadcn-studio/blocks/gallery-component-01/gallery-component-01";

const gallerySections = [
  {
    images: [
      {
        src: "/image-4.jpg",
        alt: "image-4",
      },
    ],
  },
  {
    type: "grid",
    images: [
      {
        src: "/image-5.jpg",
        alt: "image-4",
      },
      {
        src: "/image-6.jpg",
        alt: "image-4",
      },
      {
        src: "/image-7.jpg",
        alt: "image-4",
      },
      {
        src: "/image-8.jpg",
        alt: "image-4",
      },
    ],
  },
  {
    type: "grid",
    images: [
      {
        src: "/image-9.jpg",
        alt: "image-4",
      },
      {
        src: "/image-10.jpg",
        alt: "image-4",
      },
      {
        src: "/image-4.jpg",
        alt: "image-4",
      },
      {
        src: "/image-9.jpg",
        alt: "image-4",
      },
    ],
  },
  {
    images: [
      {
        src: "/image-8.jpg",
        alt: "image-4",
      },
    ],
  },
];

const GalleryPage = () => {
  return (
    <section id="gallery" className="scroll-mt-8">
      <Gallery sections={gallerySections} />
    </section>
  );
};

export default GalleryPage;

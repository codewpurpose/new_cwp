/** Stable photo tiles: loading a photo never changes the gallery's geometry. */
export default function Masonry({
  photos,
  className = "",
  fallbackRatio = "3 / 4",
}: {
  photos: readonly { src: string; alt: string }[];
  className?: string;
  fallbackRatio?: string;
}) {
  return (
    <div className={`gap-2.5 ${className}`}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="home-card mb-2.5 break-inside-avoid overflow-hidden rounded-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="block w-full object-cover"
            style={{ aspectRatio: fallbackRatio }}
          />
        </div>
      ))}
    </div>
  );
}

import PhotoCard from "./PhotoCard";

const images = import.meta.glob(
  "../assets/photos/images/*.{png,jpg,jpeg,JPG,PNG}",
  {
    eager: true,
    import: "default",
  }
);

const photoList = Object.entries(images).map(([path, src], index) => {

  const name = path
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");

  return {
    id: index + 1,
    src,
    title: name,
    album: "All",
    favorite: false,
  };

});

function PhotoGrid({ searchTerm, selectedAlbum, onImageClick }) {

  const filteredPhotos = photoList.filter((photo) => {

    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlbum =
      selectedAlbum === "All" ||
      photo.album === selectedAlbum;

    return matchesSearch && matchesAlbum;

  });

  return (

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {filteredPhotos.map((photo) => (

        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={() => onImageClick(photo)}
        />

      ))}

      {filteredPhotos.length === 0 && (

        <div className="col-span-full py-24 text-center">

          <h2 className="text-3xl font-bold text-white">
            No Photos Found
          </h2>

          <p className="mt-3 text-slate-400">
            Try another search.
          </p>

        </div>

      )}

    </div>

  );

}

export default PhotoGrid;

export default function UploadButton({ imageData }) {

  function handleImageUpload(event) {
    imageData(event.target.files[0]);
  }
  return (
    <>
      <input type="file" onChange={handleImageUpload} />
    </>
  );
};
import { ImageGalleryItemEl, ImageGalleryItemImage } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({image, onClick}) => {

  return ( <ImageGalleryItemEl>
    <ImageGalleryItemImage src={image.webformatURL} alt={image.tags} onClick={onClick}/>
  </ImageGalleryItemEl>)
}

export default ImageGalleryItem
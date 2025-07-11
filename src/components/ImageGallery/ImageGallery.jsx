import { useEffect, useState } from 'react';
import { getData } from 'components/services/api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ImageGalleryEl } from './ImageGallery.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const { IDLE, PENDING, REJECTED, RESOLVED } = STATUS;

const ImageGallery = ({ searchImage }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [status, setStatus] = useState(IDLE);
  const [error, setError] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(false);

  useEffect(() => {
    if (searchImage) {
      setImages([]);
      setPage(1);
      fetchImages(searchImage, 1);
    }
  }, [searchImage]);

  useEffect(() => {
    if (page > 1) {
      fetchImages(searchImage, page);
    }
  }, [searchImage, page]);

  const fetchImages = async (query, page) => {
    setStatus(PENDING);

    try {
      const data = await getData(page, query);
      const newImages = data.hits;

      setImages(prevImages => [...prevImages, ...newImages]);
      setStatus(RESOLVED);
      setHasMoreImages(newImages.length > 0 && newImages.length === 12);
    } catch (error) {
      setError(error.message);
      setStatus(REJECTED);
    }
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = largeImageURL => {
    setOpenModal(true);
    setLargeImageURL(largeImageURL);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setLargeImageURL('');
  };

  if (status === IDLE) {
    return <div>Enter a search term to begin.</div>;
  }

  if (status === PENDING) {
    return <Loader />;
  }

  if (status === REJECTED) {
    return <div>Error: {error}</div>;
  }

  if (status === RESOLVED) {
    return (
      <>
        <ImageGalleryEl>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={() => onOpenModal(image.largeImageURL)}
            />
          ))}
        </ImageGalleryEl>
        {hasMoreImages && <Button onClick={onLoadMore} />}
        {!hasMoreImages && <p>No more images found.</p>}

        {openModal && (
          <Modal imageUrl={largeImageURL} onCloseModal={onCloseModal} />
        )}
      </>
    );
  }
};

export default ImageGallery;

// class ImageGallery extends Component {
//   state = {
//     images: [],
//     page: 1,
//     searhImage: '',
//     openModal: false,
//     largeImageURL: '',
//     status: IDLE,
//     error: null,
//     hasMoreImages: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevProps.searhImage !== this.props.searhImage &&
//       this.props.searhImage
//     ) {
//       this.setState({ images: [], page: 1, hasMoreImages: true }, () => {
//         this.fetchImages(this.props.searhImage, 1);
//       });
//     }
//   }

//   onLoadMore = () => {
//     const { searhImage, page } = this.state;
//     const nextPage = page + 1;
//     this.setState({ page: nextPage }, () => {
//       this.fetchImages(searhImage, nextPage);
//     });
//   };

//   onOpenModal = largeImageURL => {
//     this.setState({ openModal: true, largeImageURL });
//   };

//   onCloseModal = () => {
//     this.setState({ openModal: false, largeImageURL: '' });
//   };

//   fetchImages = async (query, page) => {
//     this.setState({ status: PENDING });

//     try {
//       const response = await getData(page, query); // Fetching the first page of results
//       const newImages = response.data.hits;

//       this.setState(prevState => ({
//         images: [...prevState.images, ...newImages], // Assuming the response contains an array of hits
//         status: RESOLVED,
//         hasMoreImages: newImages.length > 0 && newImages.length === 12,
//       }));
//     } catch (error) {
//       this.setState({
//         error: error.message,
//         status: REJECTED,
//       });
//     }
//   };

//   render() {
//     const { images, status, error, openModal, largeImageURL, hasMoreImages } =
//       this.state;

//     if (status === IDLE) {
//       return <div>Enter a search term to begin.</div>;
//     }

//     if (status === PENDING) {
//       return <Loader />;
//     }

//     if (status === REJECTED) {
//       return <div>Error: {error}</div>;
//     }

//     if (status === RESOLVED) {
//       return (<>
//       <ImageGalleryEl>
//           {images.map(image => (
//             <ImageGalleryItem
//               key={image.id}
//               image={image}
//               onClick={() => this.onOpenModal(image.largeImageURL)}
//             />
//           ))}
//         </ImageGalleryEl>
//           {hasMoreImages && <Button onClick={this.onLoadMore} />}
//           {!hasMoreImages && <p>No more images found.</p>}

//           {openModal && (
//             <Modal imageUrl={largeImageURL} onCloseModal={this.onCloseModal} />
//           )}
//       </>

//       );
//     }

//     return null;
//   }
// }

// export default ImageGallery;

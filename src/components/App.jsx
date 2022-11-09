import React, { useState, useEffect } from 'react';
// import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import PropTypes from 'prop-types';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchPhotos } from 'api';
import { Loader } from './Loader/Loader';
import '../css/styles.css';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchPhotos, setSearchPhotos] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // const { searchPhotos, page } = this.state;
    // if (
    //   prevState.page !== this.state.page ||
    //   prevState.searchPhotos !== this.state.searchPhotos
    // )

    console.log('componentDidUpdate... ');
    try {
      // this.setState({ isLoading: true });
      setIsLoading(true);
      const { images, pages } = fetchPhotos({ searchPhotos, page });
      if (images.length === 0) {
        toast.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (page === 1) {
        // this.setState({ pages: pages });
        setPages(pages);
      }
      // this.setState(prevState => ({
      //   photos: [...prevState.photos, ...images],
      // }));
      setPhotos(prevPhotos => [...prevPhotos, images]);
    } catch (error) {
      console.log(error);
    } finally {
      // this.setState({ isLoading: false });
      setIsLoading(false);
    }
  }, [page, searchPhotos]);

  const handleFormSubmit = searchPhotos => {
    // this.setState({ searchPhotos, page: 1, photos: [] });
    setSearchPhotos(searchPhotos);
    setPage(1);
    setPhotos([]);
  };

  const loadMore = evt => {
    //  this.setState(prevState => ({ page: prevState.page + 1 }));
    setPage(prevPage => prevPage + 1);
    // console.log('this.state, ', this.state);
  };

  // const { photos, isLoading, pages, page } = this.state;
  // const { loadMore, handleFormSubmit } = this;
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {photos.length > 0 && <ImageGallery photos={photos} />}
      {!!pages && pages !== page && !isLoading && <Button onClick={loadMore} />}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     photos: [],
//     searchPhotos: '',
//     page: 1,
//     isLoading: false,
//     pages: 0,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { searchPhotos, page } = this.state;
//     if (
//       prevState.page !== this.state.page ||
//       prevState.searchPhotos !== this.state.searchPhotos
//     ) {
//       console.log('componentDidUpdate... ');
//       try {
//         this.setState({ isLoading: true });

//         const { images, pages } = await fetchPhotos({ searchPhotos, page });

//         if (images.length === 0) {
//           toast.info(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//           return;
//         }

//         if (page === 1) {
//           this.setState({ pages: pages });
//         }

//         this.setState(prevState => ({
//           photos: [...prevState.photos, ...images],
//         }));
//       } catch (error) {
//         console.log(error);
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   handleFormSubmit = ({ searchPhotos, page }) => {
//     this.setState({ searchPhotos, page: 1, photos: [] });
//   };

//   loadMore = evt => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//     console.log('this.state, ', this.state);
//   };

//   render() {
//     const { photos, isLoading, pages, page } = this.state;
//     const { loadMore, handleFormSubmit } = this;
//     return (
//       <div className="App">
//         <Searchbar onSubmit={handleFormSubmit} />
//         {isLoading && <Loader />}
//         {photos.length > 0 && <ImageGallery photos={photos} />}
//         {!!pages && pages !== page && !isLoading && (
//           <Button onClick={loadMore} />
//         )}
//         <ToastContainer autoClose={2000} />
//       </div>
//     );
//   }
// }

// App.propTypes = {
//   state: PropTypes.shape({
//     photos: PropTypes.array.isRequired,
//     searchPhotos: PropTypes.string.isRequired,
//     page: PropTypes.number.isRequired,
//     isLoading: PropTypes.bool.isRequired,
//     pages: PropTypes.number.isRequired,
//   }).isRequired,
// };

import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos, onClose }) => {
  return (
    <div>
      <ul className="ImageGallery">
        <ImageGalleryItem photos={photos} />
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
};

// export class ImageGallery extends Component {
//   render() {
//     const { photos } = this.props;
//     return (
//       <div>
//         <ul className="ImageGallery">
//           <ImageGalleryItem photos={photos} />
//         </ul>
//       </div>
//     );
//   }
// }

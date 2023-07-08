import {RefObject} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {CustomFocusMethod, alertBox} from '../components';
import {Strings} from '../constants';
import {activeUserActions, store} from '../redux';

/**
 * Generate Random Id
 * @param {string} email
 * @returns {string}
 * Returns Generated id
 */
const generateId = (email: string): string => {
  return Math.random() + email;
};

/**
 * Focuses on Text-Input on a given ref
 * @param {RefObject<CustomFocusMethod>} ref
 * @returns {void}
 */
const focusNextRef = (ref: RefObject<CustomFocusMethod>): void => {
  ref.current?.focus();
};

const openImageLibrary = async () => {
  const result = await launchImageLibrary({
    selectionLimit: 1,
    mediaType: 'photo',
  });
  if (result?.assets?.[0]?.uri) {
    const uploadedImage = result?.assets?.[0]?.uri;
    store.dispatch(activeUserActions.uploadedImage({uploadedImage}));
  }
};

const openCamera = async () => {
  const result = await launchCamera({
    mediaType: 'photo',
  });
  if (result?.assets?.[0]?.uri) {
    const uploadedImage = result?.assets?.[0]?.uri;
    store.dispatch(activeUserActions.uploadedImage({uploadedImage}));
  }
};

const checkCameraPermission = () => {
  check(PERMISSIONS.IOS.CAMERA || PERMISSIONS.ANDROID.CAMERA)
    .then(async status => {
      if (status === 'unavailable') {
        alertBox(Strings.error, Strings.errorOccurred);
      } else if (status === 'denied') {
        cameraRequest();
      } else if (status === 'blocked') {
        alertForPermission();
      } else {
        await openCamera();
      }
    })
    .catch(error => {
      alertBox(Strings.error, error);
    });
};

const checkGalleryPermission = () => {
  check(PERMISSIONS.IOS.PHOTO_LIBRARY || PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
    .then(async status => {
      if (status === 'unavailable') {
        alertBox(Strings.error, Strings.errorOccurred);
      } else if (status === 'denied') {
        galleryRequest();
      } else if (status === 'blocked') {
        alertForPermission();
      } else {
        await openImageLibrary();
      }
    })
    .catch(error => {
      alertBox(Strings.error, error);
    });
};

const alertForPermission = () => {
  alertBox(
    Strings.permissionDenied,
    Strings.accessGallery,
    openSettings,
    Strings.ok,
    Strings.cancelString,
  );
};

const cameraRequest = () => {
  request(PERMISSIONS.IOS.CAMERA || PERMISSIONS.ANDROID.CAMERA)
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          alertBox(Strings.error, Strings.errorOccurred);
          break;
        case RESULTS.DENIED:
          alertForPermission();
          break;
        case RESULTS.LIMITED:
          await openCamera();
          break;
        case RESULTS.GRANTED:
          await openCamera();
          break;
        case RESULTS.BLOCKED:
          alertForPermission();
          break;
      }
    })
    .catch(error => {
      alertBox(Strings.error, error);
    });
};

const galleryRequest = () => {
  // checkNotifications.
  request(
    PERMISSIONS.IOS.PHOTO_LIBRARY || PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  )
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          alertBox(Strings.error, Strings.errorOccurred);
          break;
        case RESULTS.DENIED:
          alertForPermission();
          break;
        case RESULTS.LIMITED:
          await openImageLibrary();
          break;
        case RESULTS.GRANTED:
          await openImageLibrary();
          break;
        case RESULTS.BLOCKED:
          alertForPermission();
          break;
      }
    })
    .catch(error => {
      alertBox(Strings.error, error);
    });
};

const uploadPicture = () => {
  alertBox(
    Strings.accessMultiple,
    Strings.openCameraOrGallery,
    () => checkGalleryPermission(),
    Strings.gallery,
    Strings.camera,
    () => checkCameraPermission(),
  );
};

export {
  checkCameraPermission,
  checkGalleryPermission,
  focusNextRef,
  generateId,
  uploadPicture,
};

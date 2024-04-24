import React, { useEffect, useRef, useState } from 'react';
import '../.././../styles/shared/FormElement/imageUpload.css';
import Button from './Button';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsvalid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsvalid = true;
    } else {
      setIsValid(false);
      fileIsvalid = false;
    }
    props.onInput(props.id, pickedFile, fileIsvalid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input style={{ display: 'none' }} id={props.id} ref={filePickerRef} type="file" accept=".jpg,.png,.jpeg" onChange={pickedHandler} />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {preview && <img src={preview} alt="Preview" />}
          {!preview && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK ME
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

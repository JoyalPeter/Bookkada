import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./uploadConfig";
import { useState } from "react";

export default function uploadPhoto(photo: File) {

  const [url, setUrl] = useState("");
  const storageRef = ref(storage, `Bookkada/${photo.name}`);
  const uploadImage = uploadBytesResumable(storageRef, photo);

  uploadImage.on(
    "state_changed",

    (_) => { },


    (error) => {
      console.log("Error :", error);
    },
    () => {
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        setUrl(url);
      });
    }
  );

  return url;
}

import React, { useState } from "react";
import {storage} from './/firebase';
import { useEffect } from "react";
import {ref, uploadBytes, getDownloadURL, listAll, list} from "firebase/storage"
import { v4 } from  "uuid"; 
  
function Imagefirebase ()
{   
    const [imageUpload, setImageUpload ] = useState(null);

    const [coverUpload, setCoverUpload ] = useState(null);
    const [url2, setUrl2] =useState (null);

    const [dpUpload, setDpUpload ] = useState(null);
    const [url3, setUrl3] =useState (null);

    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, "gallery/");
    const uploadImage = () =>
    {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `gallery/${imageUpload.name + v4() }`)
        uploadBytes(imageRef, imageUpload).then ((snapshot)=> {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
              });
            });
          };

        useEffect(() => {
            listAll(imageListRef).then((response) => {
              response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                  setImageList((prev) => [...prev, url]);
                });
              });
            });
          }, []);     

          //For Cover
          const uploadCover = () =>
          {
            if (coverUpload == null) return;
            const coverRef = ref(storage, `cover/${coverUpload.name + v4() }`)
            uploadBytes(coverRef, coverUpload).then (()=> {
                getDownloadURL(coverRef).then((url2) => {
                    setUrl2(url2); 
                  })
                  .catch((error) => {
                      console.log(error.message, "error getting while uploading")
                  });
                  setCoverUpload(null);
                })
                .catch((error) => {
                    console.log(error.message);
                });
              };
          
              
          //For Dp
          const uploadDp = () =>
          {
            if (dpUpload == null) return;
            const dpRef = ref(storage, `dp/${dpUpload.name + v4() }`)
            uploadBytes(dpRef, dpUpload).then (()=> {
                getDownloadURL(dpRef).then((url3) => {
                    setUrl3(url3); 
                  })
                  .catch((error) => {
                      console.log(error.message, "error getting while uploading")
                  });
                  setDpUpload(null);
                })
                .catch((error) => {
                    console.log(error.message);
                });
          }
    return (
        <>
            <div>
                <input 
                    type="file"
                    onChange={(event) => {
                                            setImageUpload(event.target.files[0])
                                        }}   
                />
                <button onClick={uploadImage}> Upload Gallery </button>
                {imageList.map((url) => {
                    return  <img src={url} />
                })}

                        <br/>

                <input 
                    type="file"
                    onChange={(event) => {
                                            setCoverUpload(event.target.files[0])
                                        }}   
                />
                <button onClick={uploadCover}> Upload Cover </button>
                <img src ={url2} />
                                        <br/>
                <input 
                    type="file"
                    onChange={(event) => {
                                            setDpUpload(event.target.files[0])
                                        }}   
                />
                <button onClick={uploadDp}> Upload Dp </button>
                <img src ={url3} />
                
            </div>
        </>
    );  
};

export default Imagefirebase;
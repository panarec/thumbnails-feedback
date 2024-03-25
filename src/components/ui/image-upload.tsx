// 'use client';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// export const ImageUpload = ({ files }) => {
//   const [selectedFile, setSelectedFile] = useState();
//   const [preview, setPreview] = useState();

//   // create a preview as a side effect, whenever selected file is changed
//   useEffect(() => {
//     if (!selectedFile) {
//       setPreview(undefined);
//       return;
//     }

//     const objectUrl = URL.createObjectURL(selectedFile);
//     setPreview(objectUrl);

//     // free memory when ever this component is unmounted
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [selectedFile]);

//   const onSelectFile = (e) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       setSelectedFile(undefined);
//       return;
//     }

//     // I've kept this example simple by using the first image instead of multiple
//     setSelectedFile(e.target.files[0]);
//   };

//   return <div>{selectedFile && <Image alt="thumbnail-preview-image" src={preview} />}</div>;
// };

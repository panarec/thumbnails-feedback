// 'use client';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useRef, useState } from 'react';
// import type { PutBlobResult } from '@vercel/blob';

// export function InputFile() {
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const [blob, setBlob] = useState<PutBlobResult | null>(null);
//   // return (
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       <form
//         onSubmit={async (event) => {
//           event.preventDefault();

//           if (!inputFileRef.current?.files) {
//             throw new Error('No file selected');
//           }

//           const file = inputFileRef.current.files[0];

//           const response = await fetch(`/api/file?filename=${file.name}`, {
//             method: 'POST',
//             body: file,
//           });

//           const newBlob = (await response.json()) as PutBlobResult;

//           setBlob(newBlob);
//         }}
//         className="flex h-full items-center w-full lg:w-2/3 justify-start"
//       >
//         <label
//           htmlFor="dropzone-file"
//           className={cn(
//             'group relative h-full flex flex-col items-center justify-center w-full aspect-video border-2 border-slate-300 border-dashed rounded-lg dark:border-gray-600 transition',
//             { 'dark:border-slate-400 dark:bg-slate-800': dragActive },
//             { 'h-fit aspect-auto': !noInput },
//             { 'items-start justify-start': !noInput },
//             { 'dark:hover:border-gray-500 dark:hover:bg-slate-800': noInput }
//           )}
//         ></label>
//         <input name="file" ref={inputFileRef} type="file" required />
//         <button type="submit">Upload</button>
//       </form>
//       {blob && (
//         <div>
//           Blob url: <a href={blob.url}>{blob.url}</a>
//         </div>
//       )}
//     </div>
//   );
// }

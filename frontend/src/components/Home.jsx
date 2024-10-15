import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa";
import axios from 'axios';


function Home() {
      const [selectedFile,setSelectedFile]=useState(null)
      const [convert,setConvert]=useState("");
      const [downloadError,setDownloadError]=useState("")
    const handleFileChange=(e)=>{
      setConvert("");
    setSelectedFile(e.target.files[0]);
  }

const handleSubmit=async (e)=>{
e.preventDefault();
if(!selectedFile){
 setConvert("Please Select File")
 return;
}
setConvert(
  <p className='text-orange-500'>
    File Converting..... Please Wait
  </p>
)


const formData=new FormData();
formData.append("file",selectedFile)
try {
  const response=await axios.post("https://word-to-pdf-converter-jlh9.onrender.com/home",formData,{
    responseType:"blob",
  });
  
  const url=window.URL.createObjectURL(new Blob([response.data]))

  const link=document.createElement("a")
   
  link.href=url;
  link.setAttribute("download",selectedFile.name.replace(/\.[^/.]+$/,"")+".pdf")
   
  document.body.appendChild(link)
   
  link.click()
    link.parentNode.removeChild(link)
    setSelectedFile(null)
    setDownloadError("")
    setConvert("File Converted Successfully")
} catch (error) {
  console.log(error)
  if(error.response && error.response.status===400){
    setDownloadError("Error : ",error.response.data.message);
  }else{
    setConvert("");
  }
}
}

  return (
    <>
    <div className=' max-w-screen-2xl mx-auto container py-2 px-6 md:px-24'>
      <div className='flex flex-col h-screen items-center justify-center'>
        <div className='border-2  border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-bold text-center mb-2'>Convert Word To PDF Online</h1>
          <p className='text-sm text-center mb-5'>Easily convert Word document to PDf format online </p>
        <div className='flex flex-col items-center space-y-4 '>
          <input type="file" 
          accept='.doc,.docx' 
          className='hidden'
          onChange={handleFileChange}
           id="FileInput"
           />
          <label htmlFor="FileInput" className='w-full hover:bg-slate-300  hover:text-black  bg-blue-700 flex text-white items-center justify-center px-2 py-3 rounded-lg shadow-lg border-blue-300 cursor-pointer  duration-300'>
          <FaFileWord className='text-2xl mr-4' />
          <span className='text-lg md:text-xl mr-2 '>{selectedFile ? selectedFile.name: "Choose File"}</span>
          </label>
          <div id="msg"> 
          {convert && (<div className='text-green-500  font-bold text-center'>{convert}</div>)}
          {downloadError && (<div className='text-red-500 font-bold text-center'>{downloadError}</div>)}
          </div>
          <button 
            onClick={handleSubmit}
          disabled={!selectedFile} className='text-white  disabled:bg-slate-400 disabled:pointer-events-none bg-blue-500 hover:bg-blue-700 duration-300 font-bold px-4 py-2 rounded-lg'>
            Convert File
          </button>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home

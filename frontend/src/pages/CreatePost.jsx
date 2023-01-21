import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components';


const apiUrl = 'http://localhost:8080' || process.env.REACT_APP_API_URL;

let initFormData = { name:'', prompt:'', photo:'' }

const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(initFormData)
    const [generatingImg, setgeneratingImg] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const generateImage = async() => {
        if(form.prompt){
            try {
                setgeneratingImg(true);
                const res = await fetch(`${apiUrl}/api/v1/dalle`, {
                    method: 'POST',
                    body: JSON.stringify({ prompt: form.prompt }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});
            } catch (error) {
                alert(error)
            } finally{
                setgeneratingImg(false);
            }
        }else{
            alert('Please enter a prompt')
        }
    }

    const handleSubmit = () => {

    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const handleSurprise = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({...form, prompt:randomPrompt})
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
                    Generate an imaginative image through DALL-E AI and share it with the community
                </p>
            </div>
            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName='Your Name'
                        type='text'
                        name='name'
                        placeholder='John Doe'
                        handleChange = {handleChange}
                    />
                    <FormField
                        labelName='prompt'
                        type='text'
                        name='prompt'
                        placeholder='The long-lost Star Wars 1990 Japanese Anime'
                        value={form.prompt}
                        handleChange = {handleChange}
                        isSurpriseMe
                        handleSurprise={handleSurprise}
                    />
                    <div
                        className='relative bg-gray-50 border
                        border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 w-64 p-3
                        h-64 flex justify-center items-center'
                        >
                            {form.photo?(
                                <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
                            ) : (
                                <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40'/>
                            )}
                            {generatingImg && (
                                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                    <Loader />
                                </div>
                            )}
                    </div>
                </div>
                <div className='mt-5 flex gap-5'>
                    <button 
                        type='button'
                        onClick = {generateImage}
                        className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                            {generatingImg ?"Generating...": "Generate"}
                    </button>
                </div>
                <div className='mt-10'>
                    <p className='mt-2 text-[#666e75] text-[14px]'>
                        ** Once you have created the image you want, you can share it with others in the community **
                    </p>
                    <button 
                        type='submit'
                        className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                            {isLoading ?"Sharing...": "Share With the community"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost
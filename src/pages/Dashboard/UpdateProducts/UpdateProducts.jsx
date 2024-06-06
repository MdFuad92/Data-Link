import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import useAuth from '../../../Hook/useAuth';

import useAxiosPublic from '../../../Hook/useAxiosPublic';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateProducts = () => {
    const  {_id,status,name,image,description,link,tags}= useLoaderData()
    console.log(_id,status,name,)


    const { user } = useAuth()
    const [selected, setSelected] = useState(tags)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit,control,reset } = useForm({
        defaultValues: {
            owner_email:user?.email,
            owner_image:user?.photoURL,
            owner_name:user?.displayName,
        }
    })
   
    const onSubmit = async(data) => {
        console.log(data)
        const imageFile = {image:data.image[0]}
       const res = await axiosPublic.post( image_hosting_api,imageFile,{
           headers:{
            'Content-Type': 'multipart/form-data'
           }
       })
       console.log(res.data)
       if(res.data.success){
        const productsItem = {
          image: res.data.data.display_url,
          name: data.name,
          
          timestamp: new Date(),
          description: data.description,
          tags: data.tags,
          link: data.link,
      
        }
  
        const productsRes = await axiosSecure.put(`/userproduct/${_id}`,productsItem)
        console.log( productsRes.data)
        if( productsRes.data.modifiedCount > 0){
            reset()
          toast.success('Product updated successfully')
            
        }
      }


       
    }

   


    return (
        <div>

        <div className='ml-40 mt-10'>
            <h1 className='text-lg font-semibold text'>Update post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col gap-6'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Product Name</span>
                        </div>
                        <input type="name" {...register("name")} placeholder="Product Name" defaultValue={name} className="input input-bordered w-full max-w-xs"  />

                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Product Image</span>
                        </div>
                        <input type="file" {...register("image")}  placeholder="Product Image" className=" max-w-xs" required  />

                    </label>

                </div>

                {/* description */}
                <div>
                    <label className="form-control w-4/5">
                        <div className="label">
                            <span className="label-text">Description </span>

                        </div>
                        <textarea {...register("description")} defaultValue={description} className="textarea textarea-bordered h-24" placeholder="Description" ></textarea>

                    </label>
                </div>

                <div className='flex gap-6'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">OwnerName</span>
                        </div>
                        <input type="name" {...register("owner_name")}  placeholder="Owner Name" className="input input-bordered w-full max-w-xs" disabled />

                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Owner Image</span>
                        </div>
                        <input type="photo" {...register("owner_image")}  placeholder="Owner Image" className="input input-bordered w-full max-w-xs"   disabled/>

                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Owner Image</span>
                        </div>
                        <input type="email" {...register("owner_email")}  placeholder="Owner Image" className="input input-bordered w-full max-w-xs"  disabled  />

                    </label>
           
                </div>
                {/* rating */}
                <div className='flex gap-6'>
                    <label className="form-contro max-w-xs ">
                        <div className="label">
                            <span className="label-text">Tags</span>
                            
                        <Controller
               
               name="tags"
               control={control}
               render={({ field }) => (
                   <TagsInput
           
                       value={selected}
                       onChange={(newTags) => {
                           setSelected(newTags);
                           field.onChange(newTags);
                       }}
                       name="tags"
                       placeHolder="Enter tags"
                   />
               )}
           />

                        </div>

                    </label>
                    <label className="form-control w-full max-w-xs ">
                        <div className="label">
                            <span className="label-text">link</span>
                            <input type="url" {...register("link")} defaultValue={link}  placeholder="external-link" className="input input-bordered w-full max-w-xs"  />
                        </div>

                      
                    </label>
                </div>

                <button className='btn btn-error text-white my-4 '>Submit</button>
            </form>
        </div>
    </div>
    );
};

export default UpdateProducts;
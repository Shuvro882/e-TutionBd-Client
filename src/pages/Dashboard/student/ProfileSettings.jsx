import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProfileSettings = () => {
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = async (data) => {
    try {
      let photoURL = "";

      // image upload
      if (data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const res = await axios.post(image_API_URL, formData);

        photoURL = res.data.data.url;
      }

      // updated profile data
      const updatedProfile = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        photoURL,
      };

      console.log(updatedProfile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-6">Profile Settings</h2>

        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="space-y-5"
        >
          {/* profile image */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("photo")}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>

          {/* name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                Name is required
              </p>
            )}
          </div>

          {/* phone number */}
          <div>
            <label className="label">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              {...register("phoneNumber", { required: true })}
            />

            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                Phone Number is required
              </p>
            )}
          </div>

          {/* email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Email is required
              </p>
            )}
          </div>

          {/* address */}
          <div>
            <label className="label">Address</label>
            <textarea
              placeholder="Your Address"
              className="textarea textarea-bordered w-full"
              {...register("address")}
            ></textarea>
          </div>

          {/* button */}
          <button className="btn btn-primary w-full text-white">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const StudentProfileSettings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fileRef = useRef();

  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [selectedFile, setSelectedFile] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // LOAD DEFAULT DATA
  useEffect(() => {
  if (user) {
    reset({
      name: user.displayName || "",
      phoneNumber: user.phoneNumber || "",
      email: user.email || "",
      address: user.address || "",
    });
  }
}, [user, reset]);

  // IMAGE CLICK
  const handleImageClick = () => {
    if (!editMode) return;
    fileRef.current?.click();
  };

  // SUBMIT PROFILE
  const onSubmit = async (data) => {
    try {
      let photoURL = preview;

      // upload image if changed
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await res.json();

        if (result.success) {
          photoURL = result.data.url;
        }
      }

      const updatedProfile = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        photoURL,
      };

      const res = await axiosSecure.patch(
        `/users/${user.email}`,
        updatedProfile
      );

      if (res.data.modifiedCount > 0) {
        setEditMode(false);
        setPreview(photoURL);
        setSelectedFile(null);

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Student Profile
        </h2>

        <button
          onClick={() => setEditMode(!editMode)}
          className="btn btn-primary btn-sm flex items-center gap-2"
        >
          <FaEdit />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* CARD */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6">

        {/* IMAGE */}
        <div className="flex flex-col items-center mb-6">

          <img
            src={preview || "https://i.ibb.co/4pDNDk1/avatar.png"}
            onClick={handleImageClick}
            className={`w-28 h-28 rounded-full object-cover border-4 ${
              editMode ? "cursor-pointer hover:opacity-80" : ""
            }`}
            alt="profile"
          />

          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* NAME */}
          <input
            className="input input-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Name"
            {...register("name")}
          />

          {/* PHONE */}
          <input
            className="input input-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Phone Number"
            {...register("phoneNumber")}
          />

          {/* EMAIL */}
          <input
            className="input input-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Email"
            {...register("email")}
          />

          {/* ADDRESS */}
          <textarea
            className="textarea textarea-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Address"
            {...register("address")}
          />

          {/* SAVE */}
          {editMode && (
            <button className="btn btn-primary w-full">
              Save Changes
            </button>
          )}

        </form>
      </div>
    </div>
  );
};

export default StudentProfileSettings;
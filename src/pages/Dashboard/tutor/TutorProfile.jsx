import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const TutorProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fileRef = useRef();

  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState("");

  const { register, handleSubmit, reset } = useForm();

  // load user data
  useEffect(() => {
    if (user) {
      const data = {
        name: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        subject: user.subject || "",
        university: user.university || "",
        experience: user.experience || "",
        about: user.about || "",
        photoURL: user.photoURL || "",
      };

      setPreview(data.photoURL);
      reset(data);
    }
  }, [user, reset]);

  //  IMAGE CLICK OPEN FILE PICKER
  const handleImageClick = () => {
    if (!editMode) return;
    fileRef.current?.click();
  };

  //  SUBMIT PROFILE UPDATE
  const onSubmit = async (data) => {
    try {
      let photoURL = preview;

      // upload image if selected
      if (fileRef.current.files[0]) {
        const formData = new FormData();
        formData.append("image", fileRef.current.files[0]);

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
        address: data.address,
        subject: data.subject,
        university: data.university,
        experience: data.experience,
        about: data.about,
        photoURL,
      };

      const res = await axiosSecure.patch(
        `/users/${user.email}`,
        updatedProfile
      );

      if (res.data.modifiedCount > 0) {
        setPreview(photoURL);
        setEditMode(false);

        Swal.fire({
          icon: "success",
          title: "Updated Successfully!",
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
          My Profile
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

          {/* ❗ IMPORTANT: NO register here */}
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
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
            defaultValue={user?.displayName}
            {...register("name")}
          />

          {/* PHONE */}
          <input
            className="input input-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Phone"
            {...register("phoneNumber")}
          />

          {/* SUBJECT */}
          <input
            className="input input-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Subject"
            {...register("subject")}
          />

          {/* UNIVERSITY */}
          <input
            className="input input-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="University"
            {...register("university")}
          />

          {/* EXPERIENCE */}
          <input
            className="input input-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Experience"
            {...register("experience")}
          />

          {/* ADDRESS */}
          <textarea
            className="textarea textarea-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="Address"
            {...register("address")}
          />

          {/* ABOUT */}
          <textarea
            className="textarea textarea-bordered w-full mb-3"
            disabled={!editMode}
            placeholder="About Me"
            {...register("about")}
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

export default TutorProfile;
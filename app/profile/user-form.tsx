"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "../types";

interface FormData extends Omit<UserProfile, 'image'> {
  image?: string | null
}

export default function UserForm({ data }: {
  data: FormData | null
}) {
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, },
  } = useForm<UserProfile>({
    defaultValues: {
      ...data,
      image: null
    },
  })

  const [previewImage, setPreviewImage] = useState(data?.image)
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState('')

  return (
    <form
      onSubmit={handleSubmit(async ({ username, bio, websites, image }) => {
        setIsSaving(true)
        const res = await fetch('/api/profile', {
          method: 'POST',
          body: JSON.stringify({
            username,
            bio,
            websites,
            image: image && await fileToBase64(image[0] as File)
          })
        })
        setIsSaving(false)

        if (!res.ok) {
          return setToast('Something went wrong.')
        }
        setToast('Profile updated.')
      })}
      className="flex flex-col md:flex-row md:gap-4"
    >
      <div className="md:order-1">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Avatar</label>
        <div
          style={{ backgroundImage: `url("${previewImage}")` }}
          className="bg-cover bg-center mt-4 mx-auto bg-gray-900 rounded-full relative w-24 h-24 md:w-[200px] md:h-[200px]">
          <input
            {...register('image', {
              required: false,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                if (!event.target.files || event.target.files.length === 0) {
                  return
                }
                const image = event.target.files[0] as File;
                setPreviewImage(URL.createObjectURL(image))
              }
            })}
            type="file"
            className="cursor-pointer absolute left-0 top-0 opacity-0 w-full h-full"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            className="input input-bordered w-full"
            {...register("username", { required: true })}
            onBlur={async () => {
              const username = getValues('username')
              const res = await fetch(`/api/profile/checkUsername`, {
                method: 'POST',
                body: JSON.stringify({ username })
              })
              if (!res.ok && res.status === 422) {
                return setError('username', {
                  type: 'manual',
                  message: 'username already exists.'
                })
              }
              clearErrors('username')
            }}
          />
          {errors.username?.type === 'manual' && (
            <span className="self-end text-sm text-error">{errors.username.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            disabled
            className="input input-bordered w-full"
            {...register("email", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            placeholder="Tell us a bit about yourself"
            rows={3}
            className="textarea textarea-bordered w-full"
            {...register("bio", { required: false })}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="websites" className="block text-sm font-medium text-gray-700">Website links</label>
          <input
            type="url"
            placeholder="e.g. https://yourawesome.website"
            className="input input-bordered w-full"
            {...register("websites.0", {
              required: false,
              pattern: /^https?:\/\//
            })}
          />
          <input
            type="url"
            placeholder="e.g. https://twitter.com/username"
            className="input input-bordered w-full"
            {...register("websites.1", {
              required: false,
              pattern: /^https?:\/\/(www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i
            })}
          />
          <input
            type="url"
            placeholder="e.g. https://linkedin.com/in/username"
            className="input input-bordered w-full"
            {...register("websites.2", {
              required: false,
              pattern: /^https?:\/\/(www\.)?linkedin\.com\/(#!\/)?[a-zA-Z0-9_]+$/i
            })}
          />
        </div>
        <div>
          <button disabled={isSaving} type="submit" className="capitalize btn btn-primary">Save</button>
        </div>
      </div>
      {
        toast && (
          <div className="toast">
            <div className="alert alert-info">
              <span>{toast}</span>
            </div>
          </div>
        )
      }
    </form >
  )
}

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
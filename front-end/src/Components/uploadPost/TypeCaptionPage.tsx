import React, { useState } from 'react'
interface CaptionTagProps {
    caption: string;
    tags: string;
    setCaption: (caption: string) => void;
    setTags: (tags: string) => void;
    onPostSubmit: () => void;
    onBack: () => void;
}
export const TypeCaptionPage = ({
    caption,
    tags,
    setCaption,
    setTags,
    onPostSubmit,
    onBack,
}) => {

    const [errors, setErrors] = useState({
        caption: '',
        tag: ''
    })

    const isValid = () => {
        const error = {
            caption: "",
            tag: ""
        }
        let returnResult = true

        if (!caption) {
            error.caption = 'Please enter  post caption.'
            returnResult = false
        }

        if (!tags) {
            error.tag = 'Please enter post tags.'
        }
        setErrors(error)
        return returnResult



    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await isValid()
        if (result) {
            onPostSubmit()
        }
    }
    return (
        <div>
            <h2 className="text-xl mb-4">Step 3: Add Caption and Tags</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="caption" className="block text-gray-600 mb-2">
                        Caption
                    </label>
                    <textarea
                        id="caption"
                        rows={4}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                    {errors?.caption && <p className="text-red-500 text-sm mt-1">{errors.caption}</p>}

                </div>


                <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-600 mb-2">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={onBack}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TypeCaptionPage
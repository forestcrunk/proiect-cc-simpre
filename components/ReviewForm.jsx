
import { useState } from 'react';

const ReviewForm = ({ data , onSubmit}) => {
    const [formData, setFormData] = useState({...data});

    const handleChange = (e) => {
        const { name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="artist" className="font-medium">
            Artist Name*
        </label>
        <input
          id="artist"
          name="artist"
          type="text"
          value={formData.artist}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="album" className="font-medium">
          Album Name*
        </label>
        <input
          id="album"
          name="album"
          type="text"
          value={formData.album}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="review_text" className="font-medium">
          Review*
        </label>
        <textarea
          id="review_text"
          name="review_text"
          value={formData.review_text}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
      >
        {formData._id ? 'Update' : 'Create'}
      </button>
    </form>
}

export default ReviewForm;
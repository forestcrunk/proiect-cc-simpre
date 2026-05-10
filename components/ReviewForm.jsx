
import { useState } from 'react';

const RecordForm = ({ data , onSubmit}) => {
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
        <label htmlFor="name" className="font-medium">
            Name*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="font-medium">
          Type*
        </label>
        <input
          id="type"
          name="type"
          type="text"
          value={formData.type}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-medium">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
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

export default RecordForm;
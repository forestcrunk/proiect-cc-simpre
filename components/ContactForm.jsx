'use client';

import { useState } from 'react';
import { sendContactMessage } from '@/utils/contactFunctions';

const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

export default function ContactForm() {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const result = await sendContactMessage(formData);

            if (!result.ok) {
                setStatus({
                    type: 'error',
                    message: result.error || 'Something went wrong. Please try again.',
                });
                return;
            }

            setStatus({
                type: 'success',
                message: 'Your message was sent successfully. We will get back to you soon.',
            });
            setFormData(initialForm);
        } catch {
            setStatus({
                type: 'error',
                message: 'Could not send your message. Check your connection and try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                    Subject
                </label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                />
            </div>

            <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                />
            </div>

            {status.message && (
                <p className={`text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {status.message}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="inline-flex min-w-35 items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
                {loading ? 'Sending...' : 'Send message'}
            </button>
        </form>
    );
}
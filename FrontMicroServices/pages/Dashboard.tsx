
import React, { useEffect, useState } from 'react';
import { eventService } from '../services/api';
import { AppEvent } from '../types';
import EventModal from '../components/EventModal';

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AppEvent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAll();
      setEvents(data);
    } catch (err) {
      setError('Event Service Error: Could not load your events.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: AppEvent) => {
    try {
      await eventService.create(formData);
      setIsModalOpen(false);
      fetchEvents();
    } catch (err) {
      alert('Error creating event');
    }
  };

  const handleUpdate = async (formData: AppEvent) => {
    try {
      await eventService.update(formData);
      setIsModalOpen(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      alert('Error updating event');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventService.delete(id);
      fetchEvents();
    } catch (err) {
      alert('Error deleting event');
    }
  };

  const openEditModal = (event: AppEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Event Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and organize your public events effortlessly.</p>
        </div>
        <button
          onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 font-bold"
        >
          <i className="fas fa-plus"></i>
          Create New Event
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 flex items-center gap-4">
          <i className="fas fa-exclamation-circle text-2xl"></i>
          <p className="font-medium">{error}</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Event Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                        <i className="fas fa-star text-sm"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{event.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{event.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{event.date}</div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-tighter">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <i className="fas fa-map-marker-alt mr-1.5 text-red-400"></i>
                    {event.location}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id!)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">
                    No events found. Start by creating one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingEvent ? handleUpdate : handleCreate}
        eventToEdit={editingEvent}
      />
    </div>
  );
};

export default Dashboard;

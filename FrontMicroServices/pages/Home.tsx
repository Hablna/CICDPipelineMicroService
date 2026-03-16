
import React, { useEffect, useState } from 'react';
import { eventService } from '../services/api';
import { AppEvent } from '../types';

const Home: React.FC = () => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);
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
      setError('Could not connect to Event Service. Please ensure the backend is running at http://localhost:8082');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-16 px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">Discover Amazing Events</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Connect with people, learn new things, and make memories at the best events in town.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg">
              Explore Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {events.length} Events
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Fetching the latest events...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl text-center max-w-2xl mx-auto">
            <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
            <p className="text-lg font-semibold">{error}</p>
            <button 
              onClick={fetchEvents}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-calendar-xmark text-3xl text-gray-300"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900">No events found</h3>
            <p className="text-gray-500 mt-2">Check back later for new updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 bg-indigo-100 overflow-hidden">
                   <img 
                    src={`https://picsum.photos/seed/${event.id || event.title}/600/400`} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-widest shadow-sm">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-indigo-600 font-semibold mb-2">
                    <i className="far fa-calendar-alt mr-2"></i>
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                  <p className="text-gray-600 line-clamp-2 mb-4 h-12">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-50">
                    <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

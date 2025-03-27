import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contextAPI/projectcontext';
import BackNavbar from '../planning/navbar.jsx';
import ProjectSidebar from '../planning/sidebar';
import { Menu, Search, ChevronDown, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project } = useContext(ProjectContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState([]);

  // Find the current project from context
  const currentProject = project && Array.isArray(project) ? 
    project.find(p => p.id === projectId || p.id?.toString() === projectId) : null;
  
  // Improved project name resolution with multiple fallbacks
  const projectName = currentProject?.projectName || 
                     (localStorage.getItem('currentProject') ? 
                      JSON.parse(localStorage.getItem('currentProject'))?.projectName : 
                      `Project ${projectId}`);
  
  // Toggle sidebar on small screens
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar on small screens when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions
  const goToPreviousPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar data
  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total days in the month
    const daysInMonth = lastDay.getDate();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Previous month's last day
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Calendar array (6 weeks x 7 days)
    const calendarDays = [];
    
    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      calendarDays.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        events: []
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === new Date().toDateString(),
        events: events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.toDateString() === date.toDateString();
        })
      });
    }
    
    // Add days from next month to complete the grid
    const remainingDays = 42 - calendarDays.length; // 6 weeks x 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        events: []
      });
    }
    
    return calendarDays;
  };

  const calendarData = generateCalendarData();

  // Format date for display
  const formatDate = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Add a new event
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="flex flex-col h-screen">
      <BackNavbar projectName={projectName} />
      
      <div className="flex flex-1 pt-14 relative">
        {/* Mobile sidebar toggle button */}
        <button 
          className="md:hidden fixed top-16 left-4 z-40 p-2 rounded-md bg-white shadow-md"
          onClick={toggleSidebar}
          aria-label="Toggle project sidebar"
        >
          <Menu size={20} />
        </button>
        
        {/* Sidebar with responsive classes */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transform transition-transform duration-300 ease-in-out
          fixed md:static z-30 h-[calc(100vh-56px)] md:h-auto
        `}>
          <ProjectSidebar 
            projectId={projectId} 
            isMobileOpen={sidebarOpen}
            onCloseMobile={() => setSidebarOpen(false)}
          />
        </div>
        
        {/* Overlay to close sidebar on mobile */}
        {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Calendar content */}
        <div className="flex-1 p-3 md:p-6 overflow-auto bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Calendar header with breadcrumbs and actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  <span className="hover:underline cursor-pointer">Projects</span> / 
                  <span className="hover:underline cursor-pointer ml-1">{projectName}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">Calendar</h1>
              </div>
              
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                  <Search size={20} />
                </button>
              </div>
            </div>
            
            {/* Calendar controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6 gap-2">
              <div className="flex items-center space-x-4">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={goToToday}
                >
                  Today
                </button>
                
                <div className="flex items-center">
                  <button 
                    className="p-1 rounded-full hover:bg-gray-200"
                    onClick={goToPreviousPeriod}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="p-1 rounded-full hover:bg-gray-200"
                    onClick={goToNextPeriod}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <h2 className="text-lg font-medium">{formatDate(currentDate)}</h2>
              </div>
              
              <div className="flex items-center ml-auto">
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    className={`px-3 py-1 ${view === 'month' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    onClick={() => setView('month')}
                  >
                    Month
                  </button>
                  <button 
                    className={`px-3 py-1 ${view === 'week' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    onClick={() => setView('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`px-3 py-1 ${view === 'day' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    onClick={() => setView('day')}
                  >
                    Day
                  </button>
                </div>
              </div>
            </div>
            
            {/* Calendar grid - Month view */}
            {view === 'month' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Days of week header */}
                <div className="grid grid-cols-7 border-b border-gray-200">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={index} className="py-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 grid-rows-6 h-[calc(100vh-250px)]">
                  {calendarData.map((day, index) => (
                    <div 
                      key={index} 
                      className={`border border-gray-200 p-2 ${
                        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                      } ${day.isToday ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-medium ${day.isToday ? 'text-blue-600' : ''}`}>
                          {day.date.getDate()}
                        </span>
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => {
                            // Open event creation modal
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      {/* Events for this day */}
                      <div className="mt-1 space-y-1 max-h-[80%] overflow-y-auto">
                        {day.events.map((event, eventIndex) => (
                          <div 
                            key={eventIndex}
                            className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Week view placeholder */}
            {view === 'week' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Week View</h2>
                <p>Week view implementation coming soon...</p>
              </div>
            )}
            
            {/* Day view placeholder */}
            {view === 'day' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Day View</h2>
                <p>Day view implementation coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
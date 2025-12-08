'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cloud, Calendar, AlertTriangle, Inbox, Zap, ChevronLeft, ChevronRight, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

export default function ServiceHealthPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Calendar navigation
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Get month name and year
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Calculate calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Create array of days with empty slots for alignment
    const days: (number | null)[] = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  // Mock data for planned outages (you can replace this with actual data)
  const plannedOutages: { [key: string]: number } = {
    '2025-11-06': 1,
    '2025-11-11': 2,
    '2025-11-13': 1
  };

  const getOutageCount = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return plannedOutages[dateStr] || 0;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-structural-light-gray">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="font-sans text-3xl font-bold text-primary-blue">Service Status</h1>
            <p className="font-sans mt-2 text-text-secondary">Check the status of our services and view planned maintenance.</p>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Current Service Outages */}
              <div className="bg-white rounded-lg shadow-lg border border-structural-gray-blue">
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Cloud className="text-primary-blue" size={32} />
                      <h2 className="font-sans text-xl font-semibold text-text-dark">Current Service Outages</h2>
                    </div>
                    <a
                      href="/service-health/dashboard"
                      className="font-sans px-4 py-2 text-sm font-medium bg-primary-blue text-white rounded-md hover:bg-dark-blue transition-colors inline-block"
                    >
                      View All Service Health
                    </a>
                  </div>
                  <div className="mt-6 flex flex-col items-center justify-center text-center p-8 bg-structural-light-gray rounded-md">
                    <CheckCircle2 className="text-complement-sea-green" size={48} />
                    <p className="font-sans mt-4 text-lg font-medium text-text-dark">All systems are operational.</p>
                    <p className="font-sans mt-1 text-sm text-text-secondary">
                      There are no current service outages.
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-text-secondary mb-3">
                      Experiencing issues? To report an outage, please contact the Service Desk.
                    </p>
                    <a
                      className="font-sans inline-block px-6 py-2.5 text-sm font-semibold bg-primary-blue text-white rounded-md hover:bg-dark-blue transition-colors shadow-sm"
                      href="https://sdchat.edmonton.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact Service Desk
                    </a>
                  </div>
                </div>
              </div>

              {/* Planned Outages with Calendar */}
              <div className="bg-white rounded-lg shadow-lg border border-structural-gray-blue flex-1 flex flex-col">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <Calendar className="text-primary-blue" size={32} />
                    <h2 className="font-sans text-xl font-semibold text-text-dark">Planned Outages</h2>
                  </div>
                </div>
                <div className="px-6 pb-6 flex-1">
                  <div className="bg-structural-light-gray p-4 rounded-md h-full flex flex-col">
                    {/* Calendar Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={goToToday}
                          className="font-sans px-3 py-1.5 text-sm font-medium border border-structural-gray-blue bg-white rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Today
                        </button>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={goToPreviousMonth}
                            className="p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <ChevronLeft className="text-primary-blue" size={20} />
                          </button>
                          <button
                            onClick={goToNextMonth}
                            className="p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <ChevronRight className="text-primary-blue" size={20} />
                          </button>
                        </div>
                        <h3 className="font-sans text-lg font-medium text-text-dark">{monthName}</h3>
                      </div>
                      <button className="p-2 rounded-full hover:bg-white transition-colors">
                        <Calendar className="text-primary-blue" size={20} />
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="mt-4 grid grid-cols-7 text-center text-xs font-sans font-medium text-complement-grey-flannel">
                      <span>SUN</span>
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                      <span>SAT</span>
                    </div>
                    <div className="mt-2 grid grid-cols-7 gap-px text-center text-sm flex-1 content-start">
                      {calendarDays.map((day, index) => {
                        if (day === null) {
                          return <div key={`empty-${index}`}></div>;
                        }

                        const outageCount = getOutageCount(day);
                        const isTodayDate = isToday(day);

                        return (
                          <div key={day} className="py-2 relative">
                            {isTodayDate ? (
                              <span className="font-sans mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white font-medium">
                                {day}
                              </span>
                            ) : (
                              <span className={`font-sans ${outageCount > 0 ? 'font-medium text-text-dark' : 'text-text-secondary'}`}>
                                {day}
                              </span>
                            )}
                            {outageCount > 0 && (
                              <span className="font-sans absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-complement-grey-flannel whitespace-nowrap">
                                {outageCount} more
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Current Outage Reports */}
              <div className="bg-white rounded-lg shadow-lg border border-structural-gray-blue">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="text-primary-blue" size={32} />
                    <h2 className="font-sans text-xl font-semibold text-text-dark">Current Outage Reports</h2>
                  </div>
                  <div className="mt-6 flex flex-col items-center justify-center text-center p-8 bg-structural-light-gray rounded-md">
                    <Inbox className="text-complement-grey-flannel" size={48} />
                    <p className="font-sans mt-4 text-base font-medium text-text-dark">No reports found</p>
                    <p className="font-sans mt-1 text-sm text-text-secondary">The outage reports we publish will appear here.</p>
                  </div>
                </div>
              </div>

              {/* How To Section */}
              <div className="bg-white rounded-lg shadow-lg border border-structural-gray-blue">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <Zap className="text-primary-blue" size={32} />
                    <h2 className="font-sans text-xl font-semibold text-text-dark">How To</h2>
                  </div>
                  <div className="mt-4 space-y-3">
                    <a
                      className="flex items-center justify-between w-full p-4 rounded-md bg-structural-light-gray hover:bg-structural-gray-blue transition-colors"
                      href="https://remedydwp.edmonton.ca/dwp/app/#/catalog"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-sans font-medium text-text-dark">Access DWP</span>
                      <ArrowRight className="text-primary-blue" size={18} />
                    </a>
                    <a
                      className="flex items-center justify-between w-full p-4 rounded-md bg-structural-light-gray hover:bg-structural-gray-blue transition-colors"
                      href="https://docs.google.com/document/d/1My8ghONfvqqwogKhxZdE21PB7-9MvqgZlAB64CYqOBk/edit?tab=t.0#heading=h.utl9hw95rfjq"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-sans font-medium text-text-dark">Subscribe to DWP Alerts</span>
                      <ArrowRight className="text-primary-blue" size={18} />
                    </a>
                    <a
                      className="flex items-center justify-between w-full p-4 rounded-md bg-structural-light-gray hover:bg-structural-gray-blue transition-colors"
                      href="https://docs.google.com/document/d/1H2YUvjWOMMsCwQHvjHHQIwLJbBl8S_M7DavGaIlopzE/edit?tab=t.0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-sans font-medium text-text-dark">DWP Quick Reference</span>
                      <ArrowRight className="text-primary-blue" size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-primary-blue rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-semibold text-white">Need Help?</h2>
                    <p className="font-sans mt-2 text-sm text-white/90">
                      For any questions, to request assistance, or to report an outage, please contact support.
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p className="font-sans text-white/90">
                        <span className="font-semibold text-white">Online:</span>{' '}
                        <a className="underline hover:text-white" href="https://remedydwp.edmonton.ca/dwp/app/#/catalog" target="_blank" rel="noopener noreferrer">
                          Digital Workplace
                        </a>
                      </p>
                      <p className="font-sans text-white/90">
                        <span className="font-semibold text-white">Phone:</span>{' '}
                        <a className="underline hover:text-white" href="tel:7809444311">
                          780.944.4311
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

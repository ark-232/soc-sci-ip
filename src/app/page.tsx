"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Settings, Book, Briefcase, Activity, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { President, PowerDistribution, TimelineEvent, presidents } from "./content";

const PresidentSelector: React.FC<{ presidents: President[]; onSelect: (president: President) => void }> = ({ presidents, onSelect }) => (
  <div className="flex space-x-4 mb-8">
    {presidents.map((president) => (
      <motion.button
        key={president.name}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4 cursor-pointer transition-colors duration-300 hover:shadow-xl"
        onClick={() => onSelect(president)}
      >
        <h2 className="text-xl font-semibold dark:text-white">{president.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{president.years}</p>
      </motion.button>
    ))}
  </div>
);

const PowerDistributionChart: React.FC<{ data: PowerDistribution }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={Object.entries(data).map(([key, value]) => ({ subject: key, A: value }))}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      <Radar name="Power" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  </ResponsiveContainer>
);

const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <div className="relative w-full mt-8 mb-12">
      <div className="absolute inset-0 flex items-center">
        <div className="h-0.5 w-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="relative flex justify-between">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              className="w-4 h-4 rounded-full bg-blue-500 dark:bg-purple-700 hover:bg-blue-600 dark:hover:bg-purple-600 transition-colors duration-300"
              onClick={() => setSelectedEvent(event)}
            ></button>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{event.year}</p>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-8 left-0 right-0 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg mt-4"
          >
            <h3 className="text-lg font-semibold dark:text-white">{selectedEvent.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{selectedEvent.description}</p>
            <button
              className="mt-2 text-blue-500 dark:text-purple-400 hover:underline"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabContent: React.FC<{ icon: React.ReactNode; title: string; content: React.ReactNode }> = ({ icon, title, content }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2 flex items-center dark:text-white">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    {content}
  </div>
);

const Modal: React.FC<{ president: President; onClose: () => void; onNext: () => void; onPrev: () => void }> = ({ president, onClose, onNext, onPrev }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", icon: <Settings />, title: "Overview" },
    { id: "strategy", icon: <Book />, title: "Strategy" },
    { id: "events", icon: <Clock />, title: "Key Events" },
    { id: "analysis", icon: <Activity />, title: "Analysis" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full shadow-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-4 dark:text-white">{president.name} Administration ({president.years})</h2>

        <div className="flex mb-4 border-b dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.title}</span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "overview" && (
            <TabContent
              icon={<Settings className="mr-2" />}
              title="Overview"
              content={
                <div>
                  <p className="dark:text-gray-300 mb-4">{president.focus}</p>
                  <h4 className="font-semibold mb-2 dark:text-white">Power Distribution</h4>
                  <PowerDistributionChart data={president.powerDistribution} />
                </div>
              }
            />
          )}
          {activeTab === "strategy" && (
            <TabContent
              icon={<Book className="mr-2" />}
              title="Strategy"
              content={
                <div>
                  <p className="dark:text-gray-300 mb-4"><strong>Grand Strategy:</strong> {president.grandStrategy}</p>
                  <p className="dark:text-gray-300 mb-4"><strong>Theory:</strong> {president.theory}</p>
                  <h4 className="font-semibold mb-2 dark:text-white">National Interests</h4>
                  <ul className="list-disc pl-5 dark:text-gray-300">
                    {president.nationalInterests.map((interest, index) => (
                      <li key={`interest-${index}`}>{interest}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold mt-4 mb-2 dark:text-white">Instruments of Power</h4>
                  <ul className="list-disc pl-5 dark:text-gray-300">
                    {president.instrumentsOfPower.map((instrument, index) => (
                      <li key={`instrument-${index}`}>{instrument}</li>
                    ))}
                  </ul>
                </div>
              }
            />
          )}
          {activeTab === "events" && (
            <TabContent
              icon={<Clock className="mr-2" />}
              title="Key Events"
              content={
                <Timeline events={president.timelineEvents} />
              }
            />
          )}
          {activeTab === "analysis" && (
            <TabContent
              icon={<Activity className="mr-2" />}
              title="Analysis"
              content={
                <div>
                  <h4 className="font-semibold mb-2 dark:text-white">FAS Analysis</h4>
                  <p className="dark:text-gray-300 mb-4">{president.fasAnalysis}</p>
                  <h4 className="font-semibold mb-2 dark:text-white">Relevant Quotes</h4>
                  <ul className="list-disc pl-5 dark:text-gray-300">
                    {president.quotes.map((quote, index) => (
                      <li key={`quote-${index}`} className="mb-2">{quote}</li>
                    ))}
                  </ul>
                </div>
              }
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            <ChevronLeft className="mr-2" /> Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            Next <ChevronRight className="ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const [selectedPresident, setSelectedPresident] = useState<President | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePresidentSelect = (president: President) => {
    setSelectedPresident(president);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextPresident = () => {
    if (selectedPresident) {
      const currentIndex = presidents.findIndex(p => p.name === selectedPresident.name);
      const nextIndex = (currentIndex + 1) % presidents.length;
      setSelectedPresident(presidents[nextIndex]);
    }
  };

  const prevPresident = () => {
    if (selectedPresident) {
      const currentIndex = presidents.findIndex(p => p.name === selectedPresident.name);
      const prevIndex = (currentIndex - 1 + presidents.length) % presidents.length;
      setSelectedPresident(presidents[prevIndex]);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-300 dark:bg-gray-800 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-blue-900">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-10 text-center dark:text-white text-gray-800 drop-shadow-lg"
      >
        U.S. Grand Strategy Visualization
      </motion.h1>

      <PresidentSelector presidents={presidents} onSelect={handlePresidentSelect} />

      <AnimatePresence>
        {isModalOpen && selectedPresident && (
          <Modal 
            president={selectedPresident} 
            onClose={closeModal}
            onNext={nextPresident}
            onPrev={prevPresident}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Book, Clock, Activity, ChevronLeft, ChevronRight, X } from "lucide-react"
import { President, PowerDistribution, TimelineEvent, presidents } from "./content"

const PowerDistributionChart: React.FC<{ data: PowerDistribution }> = ({ data }) => {
  const maxValue = Math.max(...Object.values(data))
  const categories = Object.keys(data)
  const values = Object.values(data)

  return (
    <div className="w-full h-[300px] relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[200px] h-[200px] rounded-full border-4 border-cyan-500 opacity-20" />
        <div className="w-[150px] h-[150px] rounded-full border-2 border-cyan-500 opacity-20" />
        <div className="w-[100px] h-[100px] rounded-full border border-cyan-500 opacity-20" />
      </div>
      {categories.map((category, index) => {
        const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2
        const value = values[index]
        const radius = (value / maxValue) * 100
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={category}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-cyan-500"
            initial={{ x: 0, y: 0 }}
            animate={{ x, y }}
            transition={{ duration: 1, delay: index * 0.1 }}
          >
            <motion.div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-cyan-300 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {category}: {value}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  return (
    <div className="relative w-full mt-8 mb-12 overflow-x-auto">
      <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
      <div className="relative flex space-x-16 px-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center"
              onClick={() => setSelectedEvent(event)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xs font-bold text-white">{index + 1}</span>
            </motion.button>
            <p className="mt-2 text-sm font-medium text-gray-300">{event.year}</p>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-0 right-0 bg-gray-800 rounded-lg p-6 shadow-2xl mt-4 border-2 border-cyan-500"
          >
            <h3 className="text-xl font-bold mb-2 text-cyan-300">{selectedEvent.title}</h3>
            <p className="text-gray-300 mb-4">{selectedEvent.description}</p>
            <motion.button
              className="text-cyan-400 hover:text-cyan-300 font-medium"
              onClick={() => setSelectedEvent(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const PresidentSelector: React.FC<{ presidents: President[]; onSelect: (president: President) => void }> = ({ presidents, onSelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {presidents.map((president, index) => (
        <motion.button
          key={president.name}
          className="relative w-40 h-40 bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-cyan-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          onClick={() => onSelect(president)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold text-white text-center mb-2">{president.name}</h2>
            <p className="text-sm text-cyan-300">{president.years}</p>
          </div>
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                className="absolute inset-0 bg-cyan-500 bg-opacity-20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-white font-bold">View Details</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </motion.div>
  )
}

const TabContent: React.FC<{ icon: React.ReactNode; title: string; content: React.ReactNode }> = ({ icon, title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-2xl font-bold mb-4 flex items-center text-cyan-300">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    {content}
  </motion.div>
)

const Modal: React.FC<{ president: President; onClose: () => void; onNext: () => void; onPrev: () => void }> = ({ president, onClose, onNext, onPrev }) => {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", icon: <Settings />, title: "Overview" },
    { id: "strategy", icon: <Book />, title: "Strategy" },
    { id: "events", icon: <Clock />, title: "Key Events" },
    { id: "analysis", icon: <Activity />, title: "Analysis" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full shadow-2xl overflow-hidden relative border border-cyan-500"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </motion.button>

        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          {president.name} Administration ({president.years})
        </h2>

        <div className="flex mb-6 border-b border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 ${
                activeTab === tab.id
                  ? "border-b-2 border-cyan-500 text-cyan-400"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {tab.icon}
              <span className="ml-2 font-medium">{tab.title}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <div className="mt-6">
            {activeTab === "overview" && (
              <TabContent
                icon={<Settings className="mr-2" />}
                title="Overview"
                content={
                  <div>
                    <p className="text-gray-300 mb-6 text-lg">{president.focus}</p>
                    <h4 className="font-bold mb-4 text-xl text-cyan-300">Power Distribution</h4>
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
                    <p className="text-gray-300 mb-4 text-lg"><strong className="text-cyan-300">Grand Strategy:</strong> {president.grandStrategy}</p>
                    <p className="text-gray-300 mb-6 text-lg"><strong className="text-cyan-300">Theory:</strong> {president.theory}</p>
                    <h4 className="font-bold mb-3 text-xl text-cyan-300">National Interests</h4>
                    <ul className="list-disc pl-6 text-gray-300 mb-6">
                      {president.nationalInterests.map((interest, index) => (
                        <li key={`interest-${index}`} className="mb-2">{interest}</li>
                      ))}
                    </ul>
                    <h4 className="font-bold mb-3 text-xl text-cyan-300">Instruments of Power</h4>
                    <ul className="list-disc pl-6 text-gray-300">
                      {president.instrumentsOfPower.map((instrument, index) => (
                        <li key={`instrument-${index}`} className="mb-2">{instrument}</li>
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
                    <h4 className="font-bold mb-3 text-xl text-cyan-300">FAS Analysis</h4>
                    <p className="text-gray-300 mb-6 text-lg">{president.fasAnalysis}</p>
                    <h4 className="font-bold mb-3 text-xl text-cyan-300">Relevant Quotes</h4>
                    <ul className="list-disc pl-6 text-gray-300">
                      {president.quotes.map((quote, index) => (
                        <li key={`quote-${index}`} className="mb-3 text-lg italic">{quote}</li>
                      ))}
                    </ul>
                  </div>
                }
              />
            )}
          </div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-cyan-500/50"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            <ChevronLeft className="mr-2" /> Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-cyan-500/50"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            Next <ChevronRight className="ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [selectedPresident, setSelectedPresident] = useState<President | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePresidentSelect = (president: President) => {
    setSelectedPresident(president)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextPresident = () => {
    if (selectedPresident) {
      const currentIndex = presidents.findIndex(p => p.name === selectedPresident.name)
      const nextIndex = (currentIndex + 1) % presidents.length
      setSelectedPresident(presidents[nextIndex])
    }
  }

  const prevPresident = () => {
    if (selectedPresident) {
      const currentIndex = presidents.findIndex(p => p.name === selectedPresident.name)
      const prevIndex = (currentIndex - 1 + presidents.length) % presidents.length
      setSelectedPresident(presidents[prevIndex])
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
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
  )
}
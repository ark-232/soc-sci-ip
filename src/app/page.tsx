"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Settings, Book, Briefcase, Activity, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";

interface PowerDistribution {
  diplomatic: number;
  informational: number;
  military: number;
  economic: number;
}

interface President {
  name: string;
  years: string;
  focus: string;
  grandStrategy: string;
  nationalInterests: string[];
  theory: string;
  instrumentsOfPower: string[];
  fasAnalysis: string;
  keyEvents: string[];
  powerDistribution: PowerDistribution;
  quotes: string[];
}

const presidents: President[] = [
  {
    name: "Truman",
    years: "1945-1953",
    focus: "Containment and Post-WWII Recovery",
    grandStrategy: "Containment",
    nationalInterests: ["Defense of homeland", "Promote democracy", "Prevent Soviet expansion"],
    theory: "Neorealism",
    instrumentsOfPower: ["Military (NATO)", "Economic (Marshall Plan)", "Diplomacy"],
    fasAnalysis: "High feasibility due to U.S. post-war economic and military strength. Strong acceptability both domestically and internationally. Highly suitable for stabilizing Europe and containing Soviet influence.",
    keyEvents: ["Marshall Plan (1948)", "NATO Formation (1949)", "Korean War (1950-1953)"],
    powerDistribution: { diplomatic: 80, informational: 70, military: 90, economic: 100 },
    quotes: [
      "George Kennan's 'Long Telegram' described the Soviets as 'implacably hostile' and 'incapable of long-term cooperation with the West.'",
      "Brands (2014) highlights that Truman’s 'containment' strategy fundamentally shaped the Cold War era, asserting U.S. dominance in a bipolar world order.",
      "As noted by Nuechterlein, Truman prioritized 'defense of the homeland' and 'promoting democracy,' essential national interests in the early Cold War period."
    ]
  },
  {
    name: "Nixon",
    years: "1969-1974",
    focus: "Détente and China Relations",
    grandStrategy: "Détente",
    nationalInterests: ["Economic well-being", "Stable world order", "Maintain balance with USSR and China"],
    theory: "Realism",
    instrumentsOfPower: ["Diplomacy (China, USSR)", "Military (Vietnam)", "Economic"],
    fasAnalysis: "Mixed feasibility due to domestic economic challenges and Cold War complexities. High acceptability for détente with China but mixed public opinion on Vietnam. Suitable for reducing Cold War tensions.",
    keyEvents: ["Opening to China (1972)", "SALT I Treaty (1972)", "End of Vietnam War (1973)"],
    powerDistribution: { diplomatic: 100, informational: 60, military: 70, economic: 80 },
    quotes: [
      "Nixon described his foreign policy as a 'strategy of negotiations'—seeking leverage through diplomacy to reduce global tensions (Brands, 2014).",
      "'China’s role in the world has changed, and America must adjust.' Nixon’s move to open relations with China in 1972 was a pivotal geopolitical shift (Nye, 2015).",
      "Détente was 'a calculated blend of hard and soft power,' focusing on managing relations with both China and the USSR (Elman & Jensen, 2014)."
    ]
  },
  {
    name: "Reagan",
    years: "1981-1989",
    focus: "Confrontation with USSR",
    grandStrategy: "Confrontation with USSR",
    nationalInterests: ["Promote democracy", "Defense of homeland", "Defeat Soviet Union"],
    theory: "Offensive Realism",
    instrumentsOfPower: ["Military (SDI)", "Economic sanctions", "Diplomacy (arms reduction)"],
    fasAnalysis: "Feasibility was challenging due to high defense spending (SDI) and Cold War pressures. Acceptability strong domestically with Reagan’s 'evil empire' rhetoric but raised concerns internationally. Suitable for increasing pressure on the USSR.",
    keyEvents: ["Strategic Defense Initiative (1983)", "Reykjavík Summit (1986)", "Fall of Berlin Wall (1989)"],
    powerDistribution: { diplomatic: 70, informational: 90, military: 100, economic: 80 },
    quotes: [
      "Reagan's Strategic Defense Initiative (SDI) symbolized 'hard power at its peak,' challenging the Soviet Union's military capabilities (Brands, 2014).",
      "Reagan framed the Cold War as 'a moral struggle between good and evil,' emphasizing ideological confrontation (Nuechterlein, 2001).",
      "Reykjavík Summit was a turning point in arms control, showcasing Reagan’s 'dual-use' of military pressure and diplomatic outreach (Nye, 2009)."
    ]
  }
];

const PresidentCard: React.FC<{ president: President; onClick: (president: President) => void }> = ({ president, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 cursor-pointer transition-colors duration-300 hover:shadow-xl"
    onClick={() => onClick(president)}
  >
    <h2 className="text-2xl font-semibold dark:text-white">{president.name}</h2>
    <p className="text-sm text-gray-500 dark:text-gray-400">{president.years}</p>
    <p className="mt-2 dark:text-gray-300">{president.focus}</p>
  </motion.div>
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
                <ul className="list-disc pl-5 dark:text-gray-300">
                  {president.keyEvents.map((event, index) => (
                    <li key={`event-${index}`} className="mb-2">{event}</li>
                  ))}
                </ul>
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

  const handleModal = (president: President) => {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {presidents.map((president, index) => (
          <motion.div
            key={president.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PresidentCard president={president} onClick={handleModal} />
          </motion.div>
        ))}
      </div>

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
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Droplets, 
  ThermometerSun, 
  Wind, 
  AlertTriangle, 
  Leaf, 
  Trash2, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Menu,
  X,
  Heart,
  Info
} from 'lucide-react';

// --- Data & Content ---

const topics = {
  climate: {
    id: 'climate',
    title: 'Climate Change',
    icon: <Wind className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    description: "Long-term shifts in temperatures and weather patterns, largely driven by human activity.",
    content: {
      causes: [
        { title: "Fossil Fuels", desc: "Burning coal, oil, and gas generates greenhouse gas emissions that act like a blanket wrapped around the Earth, trapping the sun's heat.", icon: <Zap /> },
        { title: "Deforestation", desc: "Cutting down forests to create farms or pastures, or for other reasons, causes emissions, since trees, when they are cut, release the carbon they have been storing.", icon: <Trash2 /> },
        { title: "Agriculture", desc: "Planting crops and rearing animals releases many different types of greenhouse gases into the air.", icon: <Leaf /> }
      ],
      effects: [
        { title: "Intense Droughts", desc: "Water is becoming scarcer in more regions. Droughts can stir destructive sand and dust storms that can move billions of tons of sand across continents.", icon: <ThermometerSun /> },
        { title: "Severe Storms", desc: "Destructive storms have become more intense and more frequent in many regions. As temperatures rise, more moisture evaporates, which exacerbates extreme rainfall.", icon: <Wind /> },
        { title: "Rising Oceans", desc: "The ocean soaks up most of the heat from global warming. This melts ice sheets and raises sea levels, threatening coastal and island communities.", icon: <Droplets /> }
      ],
      solutions: [
        { title: "Renewable Energy", desc: "Transitioning from fossil fuels to renewables like solar and wind will reduce the emissions driving climate change.", icon: <Zap /> },
        { title: "Reforestation", desc: "Protecting and restoring forests is a powerful solution. Forests soak up carbon dioxide that would otherwise escape into the atmosphere.", icon: <Leaf /> },
        { title: "Sustainable Transport", desc: "Walking, cycling, or using public transport instead of driving reduces greenhouse gas emissions and helps fight climate change.", icon: <Globe /> }
      ]
    }
  },
  ocean: {
    id: 'ocean',
    title: 'Ocean Pollution',
    icon: <Droplets className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-600',
    description: "The introduction of harmful materials like plastic, oil, and chemicals into the ocean ecosystem.",
    content: {
      causes: [
        { title: "Plastic Waste", desc: "Millions of tons of plastic enter the oceans every year. Plastics do not decompose; they break down into microplastics.", icon: <Trash2 /> },
        { title: "Chemical Runoff", desc: "Fertilizers from farms wash into rivers and eventually the ocean, causing algae blooms that deplete oxygen.", icon: <AlertTriangle /> },
        { title: "Oil Spills", desc: "Spills from ships and offshore drilling rigs release toxic hydrocarbons that coat marine life and destroy habitats.", icon: <Droplets /> }
      ],
      effects: [
        { title: "Marine Life Harm", desc: "Animals mistake plastic for food or become entangled in it. Chemical toxins accumulate in their bodies.", icon: <Heart /> },
        { title: "Coral Bleaching", desc: "Pollution and rising temperatures cause coral to expel the algae living in their tissues, turning them white and often killing them.", icon: <ThermometerSun /> },
        { title: "Human Health", desc: "Microplastics and toxins make their way up the food chain, eventually ending up on our dinner plates.", icon: <AlertTriangle /> }
      ],
      solutions: [
        { title: "Reduce Plastics", desc: "Avoiding single-use plastics like straws, bags, and bottles drastically reduces the amount of waste entering the ocean.", icon: <Trash2 /> },
        { title: "Beach Cleanups", desc: "Participating in local cleanups prevents garbage on land from being washed into the sea.", icon: <Leaf /> },
        { title: "Responsible Choices", desc: "Choosing sustainable seafood and eco-friendly household products helps protect marine ecosystems.", icon: <CheckCircle2 /> }
      ]
    }
  },
  warming: {
    id: 'warming',
    title: 'Global Warming',
    icon: <ThermometerSun className="w-6 h-6" />,
    color: 'from-orange-500 to-red-600',
    description: "The unusually rapid increase in Earth's average surface temperature primarily due to greenhouse gases.",
    content: {
      causes: [
        { title: "Greenhouse Effect", desc: "Gases like CO2 and methane trap heat in the atmosphere, preventing it from escaping into space.", icon: <Wind /> },
        { title: "Industrialization", desc: "Since the Industrial Revolution, human activities have increased atmospheric CO2 by 50%.", icon: <Zap /> },
        { title: "Livestock Farming", desc: "Cows and sheep produce large amounts of methane when they digest their food.", icon: <Leaf /> }
      ],
      effects: [
        { title: "Melting Ice Caps", desc: "Glaciers and polar ice sheets are melting at an alarming rate, contributing to sea-level rise.", icon: <Droplets /> },
        { title: "Heatwaves", desc: "Extreme heat events are becoming more frequent, longer, and more intense, posing health risks.", icon: <ThermometerSun /> },
        { title: "Habitat Loss", desc: "Many species are losing their habitats because they cannot adapt quickly enough to the changing temperature.", icon: <Globe /> }
      ],
      solutions: [
        { title: "Energy Efficiency", desc: "Insulating homes and using energy-efficient appliances reduces the demand for energy production.", icon: <Zap /> },
        { title: "Green Policies", desc: "Supporting policies that limit carbon emissions and promote green technology is crucial.", icon: <CheckCircle2 /> },
        { title: "Carbon Capture", desc: "Developing technologies to remove CO2 from the atmosphere and store it underground.", icon: <Wind /> }
      ]
    }
  }
};

const quizQuestions = [
  {
    question: "What is the primary cause of modern global warming?",
    options: ["Solar Flares", "Volcanic Eruptions", "Greenhouse Gas Emissions", "Ocean Currents"],
    correct: 2
  },
  {
    question: "Which of these is a major source of ocean pollution?",
    options: ["Single-use Plastics", "Sand", "Seaweed", "Salt"],
    correct: 0
  },
  {
    question: "What is a simple way you can help fight climate change?",
    options: ["Leave lights on", "Use public transport", "Buy more plastic", "Drive a diesel car"],
    correct: 1
  }
];

const pledges = [
  { id: 1, text: "Use a reusable water bottle", points: 10 },
  { id: 2, text: "Walk or bike for short trips", points: 20 },
  { id: 3, text: "Recycle paper and plastic", points: 15 },
  { id: 4, text: "Switch to LED lightbulbs", points: 10 },
  { id: 5, text: "Eat one plant-based meal a week", points: 25 },
];

// --- Components ---

const Hero = ({ onExplore }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 z-0 opacity-30">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-900 animate-gradient-slow"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2000ms' }}></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4000ms' }}></div>
    </div>

    <div className="relative z-10 container mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in-down">
        <Globe className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-medium text-emerald-100">Our Planet needs us</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
        The Future is <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Green & Blue</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
        Understand the threats of Climate Change, Ocean Pollution, and Global Warming. Discover how you can make a real impact today.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onExplore}
          className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
        >
          Explore Topics <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
    </div>
  </div>
);

const TopicCard = ({ topic, isActive, onClick }) => {
  const ringColors = {
    warming: '#f97316',
    climate: '#10b981',
    ocean: '#0ea5e9'
  };

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 w-full h-full border ${
        isActive
          ? `bg-white shadow-xl border-transparent scale-[1.02]`
          : 'bg-white/50 hover:bg-white border-slate-200 hover:shadow-lg'
      }`}
      style={isActive ? { outline: `2px solid ${ringColors[topic.id]}`, outlineOffset: '2px' } : {}}
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 ${isActive ? 'opacity-20' : ''}`}>
        {topic.icon}
      </div>
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-white bg-gradient-to-br ${topic.color}`}>
        {topic.icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{topic.title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{topic.description}</p>
    </button>
  );
};

const InfoSection = ({ content, type, colorClass }) => {
  const [activeTab, setActiveTab] = useState('causes');

  const borderColors = {
    climate: '#10b981',
    ocean: '#0ea5e9',
    warming: '#f97316'
  };

  // Reset tab when content changes (i.e. different topic selected)
  useEffect(() => {
    setActiveTab('causes');
  }, [content]);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mt-8">
      <div className="flex border-b border-slate-100 overflow-x-auto">
        {['causes', 'effects', 'solutions'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 px-6 text-sm md:text-base font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
              activeTab === tab
                ? `text-slate-900 bg-slate-50`
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            style={activeTab === tab ? { borderBottomWidth: '2px', borderBottomColor: borderColors[type] } : {}}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="p-8 bg-slate-50/50 min-h-[400px]">
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          {content[activeTab].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 text-white bg-gradient-to-br ${colorClass} opacity-90`}>
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PledgeTracker = () => {
  const [checkedPledges, setCheckedPledges] = useState([]);
  const [score, setScore] = useState(0);

  const togglePledge = (id, points) => {
    if (checkedPledges.includes(id)) {
      setCheckedPledges(prev => prev.filter(p => p !== id));
      setScore(prev => prev - points);
    } else {
      setCheckedPledges(prev => [...prev, id]);
      setScore(prev => prev + points);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Heart className="text-pink-500 fill-pink-500" /> Heal the Planet
          </h2>
          <p className="text-indigo-200 mb-6">Commit to simple actions. Track your impact.</p>
          
          <div className="space-y-3">
            {pledges.map((pledge) => (
              <button
                key={pledge.id}
                onClick={() => togglePledge(pledge.id, pledge.points)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border ${
                  checkedPledges.includes(pledge.id)
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-100'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-3 text-left">
                  {checkedPledges.includes(pledge.id) ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <div className="w-5 h-5 rounded-full border border-slate-500" />}
                  {pledge.text}
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded bg-white/10">+{pledge.points} pts</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="text-center mb-6">
            <div className="text-sm text-indigo-300 uppercase tracking-widest font-semibold mb-2">Impact Score</div>
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono">
              {score}
            </div>
            <div className="text-slate-400 text-sm mt-2">points earned today</div>
          </div>
          
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min((score / 80) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="mt-4 text-xs text-center text-indigo-300">
            {score === 0 ? "Start checking boxes to heal the planet!" : score < 50 ? "Great start! Keep going!" : "You're an eco-hero!"}
          </p>
        </div>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswerOptionClick = (index) => {
    setSelectedOption(index);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedOption(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Info className="text-blue-500" /> Knowledge Check
      </h3>
      
      {showScore ? (
        <div className="text-center py-8">
          <div className="text-5xl font-bold text-slate-800 mb-4">{score} / {quizQuestions.length}</div>
          <p className="text-slate-500 mb-6">You answered {score} questions correctly!</p>
          <button 
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="transition-opacity duration-300">
          <div className="flex justify-between text-sm text-slate-400 mb-4 uppercase tracking-wider font-semibold">
            <span>Question {currentQuestion + 1}</span>
            <span>{quizQuestions.length} Total</span>
          </div>
          <h4 className="text-xl font-medium text-slate-800 mb-8">{quizQuestions[currentQuestion].question}</h4>
          <div className="space-y-3">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                disabled={selectedOption !== null}
                onClick={() => handleAnswerOptionClick(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all font-medium ${
                  selectedOption === index 
                    ? index === quizQuestions[currentQuestion].correct 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-red-50 border-red-500 text-red-700'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Globe className="w-6 h-6 text-emerald-500" />
        <span className="text-xl font-bold text-white">EcoAware</span>
      </div>
      <p className="mb-6 max-w-md mx-auto">
        Dedicated to raising awareness about the critical environmental challenges facing our planet. Every action counts.
      </p>
      <div className="border-t border-slate-800 pt-6 text-sm">
        &copy; {new Date().getFullYear()} EcoAware Initiative. Built for a better tomorrow.
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState('climate');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className={`flex items-center gap-2 font-bold text-xl ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            <Globe className={`w-6 h-6 ${scrolled ? 'text-emerald-500' : 'text-emerald-400'}`} />
            EcoAware
          </div>
          
          <div className="hidden md:flex gap-8">
            {['Learn', 'Act', 'Quiz'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium transition-colors hover:text-emerald-400 ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={scrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900' : 'text-white'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 flex flex-col items-center gap-4 md:hidden">
            {['Learn', 'Act', 'Quiz'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-600 font-medium py-2"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <Hero onExplore={() => scrollToSection('learn')} />

      <main className="container mx-auto px-6 space-y-24 pb-20 -mt-20 relative z-20">
        
        {/* Education Section */}
        <section id="learn" className="pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Understanding the Crisis</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Click on a topic below to explore the causes, the damaging effects, and the actionable solutions we can implement today.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.values(topics).map((topic) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                isActive={activeTopicId === topic.id} 
                onClick={() => setActiveTopicId(topic.id)} 
              />
            ))}
          </div>

          <InfoSection 
            content={topics[activeTopicId].content} 
            type={activeTopicId}
            colorClass={topics[activeTopicId].color}
          />
        </section>

        {/* Action Section */}
        <section id="act" className="grid md:grid-cols-1 gap-12 items-center">
          <PledgeTracker />
        </section>

        {/* Quiz Section */}
        <section id="quiz" className="bg-slate-100 rounded-[3rem] p-8 md:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Test Your Knowledge</h2>
            <p className="text-slate-600 mb-10">See how much you've learned about the environmental challenges we face.</p>
            <Quiz />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
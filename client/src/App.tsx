import React, { useState, useEffect } from 'react';
import { 
  Car, User, Users, Plus, RotateCcw, Copy, MapPin, Trash2, XCircle, 
  CheckCircle2, Armchair, AlertCircle, ArrowRight, Edit3, Megaphone, 
  Calendar, Clock, Ban, Bike, ChevronLeft, Lock, Unlock, Cloud,
  ArrowLeftCircle, ArrowRightCircle, ArrowLeftRight, Baby
} from 'lucide-react';

// --- FIREBASE SETUP ---
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, onSnapshot, addDoc, 
  doc, updateDoc, deleteDoc, setDoc 
} from "firebase/firestore";

// Your Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGCxb3plraFAVLJBhbAM0C-FPs5Ge47Ak",
  authDomain: "travel-ay.firebaseapp.com",
  projectId: "travel-ay",
  storageBucket: "travel-ay.firebasestorage.app",
  messagingSenderId: "359029897758",
  appId: "1:359029897758:web:526cc5ee4101b1df84cc0f",
  measurementId: "G-7H0939YNSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    pink: "bg-pink-100 text-pink-700",
    green: "bg-green-100 text-green-700",
    slate: "bg-slate-100 text-slate-700",
    amber: "bg-amber-100 text-amber-800",
    teal: "bg-teal-100 text-teal-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[color] || colors.slate}`}>
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <XCircle size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, colorClass, bgClass }) => (
  <div className={`${bgClass} p-4 rounded-xl border border-slate-100/50 flex flex-col justify-between h-24 transition-all hover:shadow-md`}>
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <Icon size={18} className={colorClass} />
    </div>
    <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
  </div>
);

// --- Main App Component ---

export default function App() {
  // --- Real-time Data State ---
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTripId, setActiveTripId] = useState(null);
  const [isCreateTripModalOpen, setCreateTripModalOpen] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState("");

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [adminPin, setAdminPin] = useState("");

  // --- Firebase Listener ---
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "trips"), (snapshot) => {
      const tripsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setTrips(tripsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Handlers ---

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === "1234") { // Default PIN
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setAdminPin("");
    } else {
      alert("Incorrect PIN");
    }
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!newTripTitle.trim()) return;

    const newTrip = {
      title: newTripTitle,
      origin: "Kota Kinabalu",
      destination: "Destination",
      tripDate: new Date().toISOString().split('T')[0],
      tripTime: "08:00 AM",
      venue: "Gathering Point",
      people: [] 
    };

    try {
      await addDoc(collection(db, "trips"), newTrip);
      setNewTripTitle("");
      setCreateTripModalOpen(false);
    } catch (error) {
      alert("Error creating trip: " + error.message);
    }
  };

  const handleDeleteTrip = async (id, e) => {
    e.stopPropagation();
    if (!isAdmin) {
      alert("Only Admins can delete trips.");
      return;
    }
    if(window.confirm("Delete this entire trip and its data?")) {
       await deleteDoc(doc(db, "trips", id));
    }
  };

  const updateActiveTrip = async (updatedTripData) => {
    const tripRef = doc(db, "trips", updatedTripData.id);
    await setDoc(tripRef, updatedTripData);
  };

  // --- View Selection ---

  if (!activeTripId) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-8">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                   Travel List <Cloud size={20} className="text-indigo-400" />
                </h1>
                <p className="text-slate-500">Cloud Connected. Updates appear in real-time.</p>
              </div>
              <div className="flex gap-2">
                {isAdmin ? (
                  <button onClick={() => setIsAdmin(false)} className="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-300 transition-all">
                    <Unlock size={18} /> Admin Active
                  </button>
                ) : (
                  <button onClick={() => setIsLoginModalOpen(true)} className="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-50 transition-all">
                    <Lock size={18} /> Admin Login
                  </button>
                )}
                <button 
                  onClick={() => isAdmin ? setCreateTripModalOpen(true) : alert("Only Admins can create new trips.")}
                  className={`${isAdmin ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed'} text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg transition-all`}
                >
                  <Plus size={18} /> New Trip
                </button>
              </div>
            </div>

            {loading && <div className="text-center py-12 text-slate-400">Loading trips from cloud...</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {!loading && trips.map(trip => (
                 <div 
                   key={trip.id} 
                   onClick={() => setActiveTripId(trip.id)}
                   className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all group relative"
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                         <MapPin size={24} />
                       </div>
                       {isAdmin && (
                         <button 
                           onClick={(e) => handleDeleteTrip(trip.id, e)}
                           className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                         >
                           <Trash2 size={16} />
                         </button>
                       )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{trip.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                       <Calendar size={14} /> {trip.tripDate}
                    </div>
                    <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-4">
                       <span className="text-slate-500">{trip.people ? trip.people.length : 0} People</span>
                       <span className="text-indigo-600 font-medium flex items-center gap-1">
                         Open Dashboard <ArrowRight size={14} />
                       </span>
                    </div>
                 </div>
               ))}
               {!loading && trips.length === 0 && (
                 <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-400">No trips found. Switch to Admin Mode to create one!</p>
                 </div>
               )}
            </div>
         </div>

         <Modal isOpen={isCreateTripModalOpen} onClose={() => setCreateTripModalOpen(false)} title="Create New Trip">
            <form onSubmit={handleCreateTrip}>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trip Name</label>
              <input 
                autoFocus type="text" value={newTripTitle} onChange={e => setNewTripTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
                placeholder="e.g. Kundasang Trip"
              />
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium">Create Trip</button>
            </form>
         </Modal>

         <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} title="Admin Access">
            <form onSubmit={handleAdminLogin}>
              <div className="text-center mb-6">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock size={32} className="text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm">Enter PIN to edit trips and manage drivers.</p>
              </div>
              <input 
                autoFocus type="password" value={adminPin} onChange={e => setAdminPin(e.target.value)} maxLength={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4 text-center tracking-widest text-2xl"
                placeholder="PIN"
              />
              <button className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium">Unlock</button>
              <p className="text-center text-xs text-slate-400 mt-3">Default PIN: 1234</p>
            </form>
         </Modal>
      </div>
    );
  }

  // --- DASHBOARD ---
  const activeTrip = trips.find(t => t.id === activeTripId);
  if (!activeTrip) { setActiveTripId(null); return null; }

  return (
    <Dashboard 
      trip={activeTrip} 
      onUpdate={(updatedTrip) => updateActiveTrip(updatedTrip)} 
      onBack={() => setActiveTripId(null)}
      isAdmin={isAdmin}
    />
  );
}

// --- Dashboard Component ---

function Dashboard({ trip, onUpdate, onBack, isAdmin }) {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [currentDriverIdForNote, setCurrentDriverIdForNote] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [selectedPassengerId, setSelectedPassengerId] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // New Person State
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonType, setNewPersonType] = useState("passenger"); // passenger, driver, driver_parents, own_transport, unavailable
  const [newPersonGender, setNewPersonGender] = useState("male");
  const [newCarSeats, setNewCarSeats] = useState(4);
  const [newTransportNeed, setNewTransportNeed] = useState("both"); // both, going_only, return_only

  const people = trip.people || [];

  const updatePeople = (newPeople) => onUpdate({ ...trip, people: newPeople });
  const updateDetails = (details) => onUpdate({ ...trip, ...details });

  // Filter Logic
  const drivers = people.filter(p => p.type === 'driver' || p.type === 'driver_parents');
  const passengers = people.filter(p => p.type === 'passenger');
  const unavailablePeople = people.filter(p => p.type === 'unavailable');
  const ownTransportPeople = people.filter(p => p.type === 'own_transport');

  const unassignedPassengers = passengers.filter(p => !p.assignedTo);
  const menWaiting = unassignedPassengers.filter(p => p.gender === 'male');
  const womenWaiting = unassignedPassengers.filter(p => p.gender === 'female');
  const selectedPassenger = people.find(p => p.id === selectedPassengerId);

  const totalSeats = drivers.reduce((acc, driver) => acc + driver.seats, 0);
  const occupiedSeats = drivers.reduce((acc, driver) => acc + (driver.passengers ? driver.passengers.length : 0), 0);
  const seatsLeft = totalSeats - occupiedSeats;
  const totalTravelers = drivers.length + passengers.length + ownTransportPeople.length;

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!newPersonName.trim()) return;

    const isDriver = newPersonType === 'driver' || newPersonType === 'driver_parents';

    const newPerson = {
      id: Date.now(),
      name: newPersonName,
      type: newPersonType,
      gender: newPersonGender,
      seats: isDriver ? parseInt(newCarSeats) : null,
      passengers: isDriver ? [] : null,
      note: isDriver ? "" : null,
      assignedTo: null,
      transportNeed: newPersonType === 'passenger' ? newTransportNeed : null
    };

    updatePeople([...people, newPerson]);
    setNewPersonName("");
    setAddModalOpen(false);
    // Reset defaults
    setNewPersonType("passenger");
    setNewTransportNeed("both");
  };

  const handleDeletePerson = (id) => {
    if (!isAdmin) { alert("Only Admins can remove people."); return; }
    if (!window.confirm("Remove this person?")) return;

    const personToDelete = people.find(p => p.id === id);
    let updatedPeople = people.filter(p => p.id !== id);

    if (personToDelete.type === 'driver' || personToDelete.type === 'driver_parents') {
       updatedPeople = updatedPeople.map(p => {
         if (p.assignedTo === id) return { ...p, assignedTo: null };
         return p;
       });
    }
    if (personToDelete.type === 'passenger' && personToDelete.assignedTo) {
        updatedPeople = updatedPeople.map(p => {
            if (p.id === personToDelete.assignedTo) {
                return { ...p, passengers: p.passengers.filter(name => name !== personToDelete.name) };
            }
            return p;
        });
    }
    updatePeople(updatedPeople);
    if (selectedPassengerId === id) setSelectedPassengerId(null);
  };

  const handleAssignToCar = (driverId) => {
    if (!selectedPassengerId) return;
    const driver = people.find(p => p.id === driverId);

    if (driver.passengers.length >= driver.seats) {
      alert("This car is full!");
      return;
    }
    const passengerToAssign = people.find(p => p.id === selectedPassengerId);

    const updatedPeople = people.map(p => {
      if (p.id === driverId) {
        return { ...p, passengers: [...(p.passengers || []), passengerToAssign.name] };
      }
      if (p.id === selectedPassengerId) {
        return { ...p, assignedTo: driverId };
      }
      return p;
    });
    updatePeople(updatedPeople);
    setSelectedPassengerId(null);
  };

  const handleUnassign = (passengerName, driverId) => {
    const passengerObj = people.find(p => p.name === passengerName && p.type === 'passenger');
    if (!passengerObj) return; 

    const updatedPeople = people.map(p => {
      if (p.id === driverId) {
        return { ...p, passengers: p.passengers.filter(name => name !== passengerName) };
      }
      if (p.id === passengerObj.id) {
        return { ...p, assignedTo: null };
      }
      return p;
    });
    updatePeople(updatedPeople);
  };

  const handleReset = () => {
    if (!isAdmin) { alert("Only Admins can reset the board."); return; }
    if(!window.confirm("Clear all assignments?")) return;
    const resetPeople = people.map(p => {
      if (p.type === 'driver' || p.type === 'driver_parents') return { ...p, passengers: [] };
      if (p.type === 'passenger') return { ...p, assignedTo: null };
      return p;
    });
    updatePeople(resetPeople);
  };

  const handleSaveNote = () => {
    const updatedPeople = people.map(p => {
      if (p.id === currentDriverIdForNote) return { ...p, note: noteText };
      return p;
    });
    updatePeople(updatedPeople);
    setNoteModalOpen(false);
  };

  const copyToClipboard = () => {
    let text = `🚗 *${trip.title}*\n`;
    text += `📅 ${trip.tripDate} | ⏰ ${trip.tripTime}\n`;
    text += `📍 Venue: ${trip.venue}\n`;
    text += `🛣️ ${trip.origin} -> ${trip.destination}\n\n`;
    drivers.forEach(d => {
      const typeLabel = d.type === 'driver_parents' ? " (w/ Parents)" : "";
      text += `*${d.name}${typeLabel}* (${d.passengers ? d.passengers.length : 0}/${d.seats})\n`;
      if (d.note) text += `📢 _"${d.note}"_\n`;
      if (d.passengers && d.passengers.length > 0) {
        d.passengers.forEach(p => text += `  ├ ${p}\n`);
      } else { text += `  (Empty)\n`; }
      text += `\n`;
    });
    const waiting = people.filter(p => p.type === 'passenger' && !p.assignedTo);
    if (waiting.length > 0) { text += `⏳ *Waiting List*: ${waiting.map(p => p.name).join(', ')}\n\n`; }
    if (ownTransportPeople.length > 0) {
      text += `🚙 *Own Transport*:\n`;
      ownTransportPeople.forEach(p => text += `  • ${p.name}\n`);
      text += `\n`;
    }
    if (unavailablePeople.length > 0) {
      text += `🚫 *Unavailable*:\n`;
      unavailablePeople.forEach(p => text += `  • ${p.name}\n`);
    }
    navigator.clipboard.writeText(text);
    alert("List copied to clipboard!");
  };

  // Helper to render transport status icon for passengers
  const TransportIcon = ({ need }) => {
    if (need === 'return_only') return <ArrowLeftCircle size={16} className="text-orange-500" title="Has transport Going, Needs Ride Back" />;
    if (need === 'going_only') return <ArrowRightCircle size={16} className="text-emerald-500" title="Needs Ride Going, Has transport Back" />;
    return null; // Both ways is default, no icon
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-24 pt-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex justify-between items-center mb-6">
             <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
               <ChevronLeft size={16} /> Back to Travel List
             </button>

             {isAdmin ? (
               <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/20">
                 <Unlock size={12} /> Admin Mode
               </div>
             ) : (
               <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                 <Lock size={12} /> View Only
               </div>
             )}
          </div>

          <div className="flex justify-end gap-2 mb-6 -mt-12">
             {isAdmin && (
               <button onClick={() => setSettingsModalOpen(true)} className="text-slate-300 hover:text-white flex items-center gap-2 text-sm px-3 py-1 rounded-full hover:bg-white/10 transition-colors">
                 <Edit3 size={14} /> Edit Details
               </button>
             )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div>
                 <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">{trip.title}</h1>
                 <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-indigo-300 text-sm md:text-base">
                    <div className="flex items-center gap-2"><Calendar size={16} /> {trip.tripDate}</div>
                    <div className="flex items-center gap-2"><Clock size={16} /> {trip.tripTime}</div>
                    <div className="flex items-center gap-2"><MapPin size={16} /> {trip.venue}</div>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-medium text-sm bg-slate-800/50 w-fit px-3 py-1.5 rounded-lg border border-slate-700/50">
                <span>{trip.origin}</span>
                <ArrowRight size={14} className="opacity-50" />
                <span>{trip.destination}</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
               <button onClick={() => setAddModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-900/20 flex items-center gap-2 transition-all active:scale-95">
                 <Plus size={18} /> Add Person
               </button>
               <button onClick={copyToClipboard} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium backdrop-blur-sm flex items-center gap-2 transition-all active:scale-95 border border-white/10">
                 <Copy size={18} /> Copy
               </button>
               {isAdmin && (
                 <button onClick={handleReset} title="Reset Assignments" className="bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-200 p-2.5 rounded-lg transition-all border border-white/5">
                   <RotateCcw size={20} />
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Travelers" value={totalTravelers} icon={Users} bgClass="bg-slate-50" colorClass="text-slate-600" />
            <StatCard label="Drivers" value={drivers.length} icon={Car} bgClass="bg-blue-50" colorClass="text-blue-600" />
            <StatCard label="Waiting" value={unassignedPassengers.length} icon={AlertCircle} bgClass="bg-amber-50" colorClass="text-amber-600" />
            <StatCard label="Seats Left" value={seatsLeft} icon={Armchair} bgClass="bg-purple-50" colorClass="text-purple-600" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">

          {/* Map Display */}
          <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 h-48 overflow-hidden relative group">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(trip.origin + ' to ' + trip.destination)}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
              className="rounded-lg opacity-90 group-hover:opacity-100 transition-opacity"
            ></iframe>
            <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 text-xs font-bold rounded shadow pointer-events-none">
               Map Preview
            </div>
          </div>

          {/* Own Transportation */}
          <Card className="overflow-hidden border-teal-200/50">
            <div className="bg-teal-50 px-4 py-3 border-b border-teal-100 flex justify-between items-center">
              <h2 className="font-bold text-teal-800 flex items-center gap-2"><Bike size={18} className="text-teal-600" /> Own Transportation</h2>
              <Badge color="teal">{ownTransportPeople.length}</Badge>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {ownTransportPeople.length === 0 && <div className="text-center py-4 text-slate-400 text-sm italic">No one self-driving</div>}
              {ownTransportPeople.map(p => (
                <div key={p.id} className="flex gap-2 items-center bg-white p-2 rounded-lg border border-teal-100 shadow-sm">
                   <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                   <span className="truncate flex-1 text-sm font-medium text-slate-700">{p.name}</span>
                   {isAdmin && <button onClick={() => handleDeletePerson(p.id)} className="p-1 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>}
                </div>
              ))}
            </div>
          </Card>

          {/* Gentlemen Waiting */}
          <Card className="overflow-hidden">
            <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
              <h2 className="font-bold text-blue-800 flex items-center gap-2"><User size={18} className="fill-blue-500 text-blue-600" /> Gentlemen Waiting</h2>
              <Badge color="blue">{menWaiting.length}</Badge>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {menWaiting.length === 0 && <div className="text-center py-4 text-slate-400 text-sm italic">No gentlemen waiting</div>}
              {menWaiting.map(p => (
                <div key={p.id} className="flex gap-2">
                  <button onClick={() => setSelectedPassengerId(selectedPassengerId === p.id ? null : p.id)} className={`flex-1 p-2 rounded-lg text-sm font-medium text-left transition-all flex items-center gap-2 ${selectedPassengerId === p.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-100'}`}>
                      <div className={`w-2 h-2 rounded-full ${selectedPassengerId === p.id ? 'bg-white' : 'bg-blue-400'}`}></div>
                      <span className="truncate flex-1">{p.name}</span>
                      <TransportIcon need={p.transportNeed} />
                  </button>
                  {isAdmin && <button onClick={() => handleDeletePerson(p.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-slate-100 transition-colors"><Trash2 size={16} /></button>}
                </div>
              ))}
            </div>
          </Card>

          {/* Ladies Waiting */}
          <Card className="overflow-hidden">
            <div className="bg-pink-50 px-4 py-3 border-b border-pink-100 flex justify-between items-center">
              <h2 className="font-bold text-pink-800 flex items-center gap-2"><User size={18} className="fill-pink-500 text-pink-600" /> Ladies Waiting</h2>
              <Badge color="pink">{womenWaiting.length}</Badge>
            </div>
            <div className="p-3 flex flex-col gap-2">
            {womenWaiting.length === 0 && <div className="text-center py-4 text-slate-400 text-sm italic">No ladies waiting</div>}
              {womenWaiting.map(p => (
                <div key={p.id} className="flex gap-2">
                  <button onClick={() => setSelectedPassengerId(selectedPassengerId === p.id ? null : p.id)} className={`flex-1 p-2 rounded-lg text-sm font-medium text-left transition-all flex items-center gap-2 ${selectedPassengerId === p.id ? 'bg-pink-600 text-white shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-pink-50 hover:text-pink-700 border border-slate-100'}`}>
                      <div className={`w-2 h-2 rounded-full ${selectedPassengerId === p.id ? 'bg-white' : 'bg-pink-400'}`}></div>
                      <span className="truncate flex-1">{p.name}</span>
                      <TransportIcon need={p.transportNeed} />
                  </button>
                  {isAdmin && <button onClick={() => handleDeletePerson(p.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-slate-100 transition-colors"><Trash2 size={16} /></button>}
                </div>
              ))}
            </div>
          </Card>

           {/* Unavailable */}
           <Card className="overflow-hidden">
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-600 flex items-center gap-2"><Ban size={18} className="text-slate-500" /> Unavailable</h2>
              <Badge color="slate">{unavailablePeople.length}</Badge>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {unavailablePeople.length === 0 && <div className="text-center py-4 text-slate-400 text-sm italic">No one unavailable</div>}
              {unavailablePeople.map(p => (
                <div key={p.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-100 opacity-60">
                   <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                   <span className="truncate flex-1 text-sm font-medium text-slate-500 line-through">{p.name}</span>
                   {isAdmin && <button onClick={() => handleDeletePerson(p.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Cars */}
        <div className="lg:col-span-8">

          {/* Selection Indicator */}
          {selectedPassenger && (
            <div className="mb-4 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-between animate-in slide-in-from-top-2">
              <div className="flex items-center gap-2 font-medium"><User size={18} className="fill-white" /> <span>Assigning: <span className="font-bold underline decoration-2 underline-offset-2">{selectedPassenger.name}</span></span></div>
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-90">Click a car to join</span>
                <button onClick={() => setSelectedPassengerId(null)} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-medium transition-colors">Cancel</button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {drivers.map(driver => {
              const isFull = driver.passengers && driver.passengers.length >= driver.seats;
              const isSelectable = selectedPassengerId && !isFull;
              const isParentDriver = driver.type === 'driver_parents';

              return (
                <div 
                  key={driver.id}
                  onClick={() => isSelectable && handleAssignToCar(driver.id)}
                  className={`group relative bg-white rounded-xl border transition-all duration-200 overflow-hidden ${isSelectable ? 'cursor-pointer ring-2 ring-indigo-400 shadow-xl scale-[1.02] z-10' : ''} ${isFull ? 'border-slate-200 bg-slate-50' : 'border-slate-200 shadow-sm hover:shadow-md'}`}
                >
                  <div className="p-4 border-b border-slate-100 flex justify-between items-start relative">
                    <div className="flex items-center gap-3 z-10">
                      <div className={`p-2.5 rounded-lg ${isParentDriver ? 'bg-purple-100 text-purple-600' : (driver.gender === 'female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600')}`}>
                          <Car size={20} className="fill-current" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-bold text-slate-800">{driver.name}</h3>
                           {isParentDriver && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold border border-purple-200">Parents</span>}
                           {isAdmin && <button onClick={(e) => {e.stopPropagation(); handleDeletePerson(driver.id);}} className="text-slate-300 hover:text-red-500 transition-colors p-0.5"><Trash2 size={12} /></button>}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-500 mt-0.5"><Users size={12} /> <span>{driver.passengers ? driver.passengers.length : 0}/{driver.seats} Seats</span></div>
                      </div>
                    </div>
                    <div className="relative w-6 h-6 z-10">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                          <path className={isFull ? "text-red-500" : "text-green-500"} strokeDasharray={`${((driver.passengers ? driver.passengers.length : 0) / driver.seats) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                     </div>
                  </div>

                  {/* Note - Editable by Admin only (or show view only) */}
                  {driver.note ? (
                     <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-start justify-between gap-2">
                       <div className="flex gap-2"><Megaphone size={14} className="text-amber-600 mt-0.5 shrink-0" /> <p className="text-xs text-amber-800 italic font-medium leading-tight">"{driver.note}"</p></div>
                       {isAdmin && <button onClick={(e) => { e.stopPropagation(); setCurrentDriverIdForNote(driver.id); setNoteText(driver.note); setNoteModalOpen(true); }} className="text-amber-400 hover:text-amber-600"><Edit3 size={12} /></button>}
                     </div>
                  ) : (
                    isAdmin && <button onClick={(e) => { e.stopPropagation(); setCurrentDriverIdForNote(driver.id); setNoteText(""); setNoteModalOpen(true); }} className="w-full py-1 bg-slate-50 border-b border-slate-100 text-xs text-slate-400 hover:text-indigo-500 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"><Plus size={10} /> Add Announcement</button>
                  )}

                  <div className="p-3 min-h-[100px]">
                      {(!driver.passengers || driver.passengers.length === 0) ? <div className="h-full flex items-center justify-center text-slate-300 text-sm italic">Empty car</div> : (
                        <ul className="space-y-2">
                          {driver.passengers.map((pName, idx) => (
                            <li key={idx} className="flex items-center justify-between bg-slate-50 px-2 py-1.5 rounded border border-slate-100 text-sm text-slate-700 group/item">
                               <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> {pName}</div>
                               <button onClick={(e) => { e.stopPropagation(); handleUnassign(pName, driver.id); }} className="text-slate-300 hover:text-red-500 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity"><XCircle size={14} /></button>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                  {isSelectable && <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"><span className="bg-white text-indigo-600 px-3 py-1 rounded-full shadow-sm text-sm font-bold flex items-center gap-2"><CheckCircle2 size={16} /> Join Car</span></div>}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* --- Modals --- */}

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Person">
        <form onSubmit={handleAddPerson} className="space-y-4">
          {!isAdmin && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex gap-2 text-sm text-blue-800 mb-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <p>You are adding yourself to the list. Once added, click your name to choose a car.</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" required value={newPersonName} onChange={e => setNewPersonName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. John Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
               <select value={newPersonType} onChange={e => setNewPersonType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                 <option value="passenger">Passenger</option>
                 <option value="driver">Driver (Car)</option>
                 <option value="driver_parents">Driver (w/ Parents)</option>
                 <option value="own_transport">Own Transport</option>
                 <option value="unavailable">Unavailable</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
               <select value={newPersonGender} onChange={e => setNewPersonGender(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                 <option value="male">Male</option>
                 <option value="female">Female</option>
               </select>
            </div>
          </div>

          {/* Dynamic Inputs based on Role */}
          {(newPersonType === 'driver' || newPersonType === 'driver_parents') && (
            <div className="animate-in fade-in slide-in-from-top-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                 {newPersonType === 'driver_parents' ? 'Extra Seats Available' : 'Car Capacity'}
              </label>
              <input type="number" min="1" max="10" value={newCarSeats} onChange={e => setNewCarSeats(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              {newPersonType === 'driver_parents' && <p className="text-xs text-slate-500 mt-1">Enter capacity excluding parents & yourself.</p>}
            </div>
          )}

          {newPersonType === 'passenger' && (
            <div className="animate-in fade-in slide-in-from-top-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-1">Transportation Needs</label>
              <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm p-2 bg-white border border-slate-200 rounded cursor-pointer hover:border-indigo-300">
                      <input type="radio" name="transportNeed" value="both" checked={newTransportNeed === 'both'} onChange={e => setNewTransportNeed(e.target.value)} className="text-indigo-600" />
                      <span>Round Trip (Need ride both ways)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm p-2 bg-white border border-slate-200 rounded cursor-pointer hover:border-orange-300">
                      <input type="radio" name="transportNeed" value="return_only" checked={newTransportNeed === 'return_only'} onChange={e => setNewTransportNeed(e.target.value)} className="text-orange-600" />
                      <span className="flex items-center gap-2"><ArrowLeftCircle size={14} className="text-orange-500"/> Return Only (Has ride going)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm p-2 bg-white border border-slate-200 rounded cursor-pointer hover:border-emerald-300">
                      <input type="radio" name="transportNeed" value="going_only" checked={newTransportNeed === 'going_only'} onChange={e => setNewTransportNeed(e.target.value)} className="text-emerald-600" />
                      <span className="flex items-center gap-2"><ArrowRightCircle size={14} className="text-emerald-500"/> Going Only (Has ride back)</span>
                  </label>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">Add Person</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} title="Edit Trip Details">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Trip Title</label><input type="text" value={trip.title} onChange={e => updateDetails({title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Date</label><input type="date" value={trip.tripDate} onChange={e => updateDetails({tripDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Time</label><input type="time" value={trip.tripTime} onChange={e => updateDetails({tripTime: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Venue</label><input type="text" value={trip.venue} onChange={e => updateDetails({venue: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Origin</label><input type="text" value={trip.origin} onChange={e => updateDetails({origin: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Destination</label><input type="text" value={trip.destination} onChange={e => updateDetails({destination: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" /></div>
          </div>
          <div className="pt-4 flex justify-end"><button onClick={() => setSettingsModalOpen(false)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium w-full">Save Changes</button></div>
        </div>
      </Modal>

      <Modal isOpen={isNoteModalOpen} onClose={() => setNoteModalOpen(false)} title="Driver Announcement">
         <div className="space-y-4">
           <textarea value={noteText} onChange={e => setNoteText(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none h-24 resize-none" placeholder="Enter announcement here..."></textarea>
           <div className="pt-2 flex justify-end gap-2">
            <button onClick={() => setNoteModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
            <button onClick={handleSaveNote} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium">Save Note</button>
          </div>
         </div>
      </Modal>

    </div>
  );
}
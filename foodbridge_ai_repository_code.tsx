import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  Menu,
  X,
  TrendingUp,
  Users,
  Utensils,
  Wind,
  Search,
  Filter,
  Navigation,
  Info,
  ShieldCheck,
  Award,
  Heart
} from 'lucide-react';

const DEMO_DONORS = [
  { id: 'd1', name: 'Fresh Market Grocery', type: 'Grocery', rating: 4.8 },
  { id: 'd2', name: 'Downtown Bistro', type: 'Restaurant', rating: 4.5 },
  { id: 'd3', name: 'TechConf 2026', type: 'Event', rating: 4.9 },
  { id: 'd4', name: 'Green Valley Farm Co-op', type: 'Farm', rating: 5.0 },
  { id: 'd5', name: 'Grand Hotel Catering', type: 'Hotel', rating: 4.7 }
];

const DEMO_RECEIVERS = [
  { id: 'r1', name: 'Hope Community Shelter', type: 'Shelter', distance: '1.2 km' },
  { id: 'r2', name: 'Open Arms Kitchen', type: 'Community Kitchen', distance: '3.5 km' },
  { id: 'r3', name: 'St. Mary Food Pantry', type: 'Pantry', distance: '2.1 km' },
  { id: 'r4', name: 'Youth Outreach Center', type: 'Youth Home', distance: '4.0 km' }
];

const getFoodImage = (foodType = '') => {
  const query = (typeof foodType === 'string' ? foodType : '').toLowerCase();
  if (query.includes('produce') || query.includes('vegetable') || query.includes('fruit') || query.includes('apple') || query.includes('farm') || query.includes('tomato')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
  } else if (query.includes('meal') || query.includes('hot') || query.includes('lasagna') || query.includes('cater') || query.includes('dinner') || query.includes('food')) {
    return 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80';
  } else if (query.includes('sandwich') || query.includes('bakery') || query.includes('bread') || query.includes('pastry') || query.includes('bagel')) {
    return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80';
  } else if (query.includes('dairy') || query.includes('milk') || query.includes('egg') || query.includes('cheese')) {
    return 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80';
  }
  return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80';
};

const INITIAL_DONATIONS = [
  {
    id: 'don_1',
    foodType: 'Organic Fresh Produce & Heirloom Tomatoes',
    quantity: '45 lbs (approx. 35 meals)',
    expiry: '2026-08-14T18:00:00',
    status: 'available', 
    donorId: 'd1',
    donorName: 'Fresh Market Grocery',
    location: '120 Retail Pkwy',
    matchScore: 94,
    matchReason: 'Perfect match. Hope Community Shelter is 1.2 km away, urgently needs fresh produce, and has high capacity today.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'don_2',
    foodType: 'Catered Gourmet Hot Meals (Lasagna & Garden Salad)',
    quantity: '30 servings',
    expiry: '2026-08-14T14:00:00',
    status: 'available',
    donorId: 'd3',
    donorName: 'TechConf 2026',
    location: 'Convention Center, Hall B',
    matchScore: 88,
    matchReason: 'High match. Open Arms Kitchen is 3.5 km away and serves hot lunch in 2 hours. Requires thermal transport bags.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'don_3',
    foodType: 'Artisanal Bakery & Artisan Sandwiches',
    quantity: '15 units',
    expiry: '2026-08-14T16:00:00',
    status: 'reserved',
    donorId: 'd2',
    donorName: 'Downtown Bistro',
    location: '45 Main St',
    matchScore: 91,
    matchReason: 'Reserved by Hope Community Shelter. Awaiting volunteer pickup.',
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'don_4',
    foodType: 'Farm-Fresh Organic Dairy & Free-Range Eggs',
    quantity: '20 lbs',
    expiry: '2026-08-14T20:00:00',
    status: 'transit',
    donorId: 'd4',
    donorName: 'Green Valley Farm Co-op',
    location: '88 Countryside Rd',
    matchScore: 85,
    matchReason: 'In transit to Open Arms Kitchen. Volunteer Alex is en route.',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 14400000).toISOString()
  }
];

const GLOBAL_STATS = {
  mealsRescued: 142530,
  foodDonors: 854,
  partners: 312,
  co2Saved: '45,200 kg'
};

const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white/80 backdrop-blur-md border border-white shadow-sm rounded-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    secondary: 'bg-slate-100 text-slate-800 border-slate-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-95",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 active:scale-95 shadow-sm",
    outline: "bg-transparent text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 active:scale-95"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const MapPlaceholder = ({ activePoints = [] }) => (
  <div className="relative w-full h-full min-h-[300px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')` }}
    ></div>
    
    <div className="absolute inset-0 bg-slate-900/10"></div>

    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl shadow-lg border border-white text-xs font-semibold text-slate-700 flex items-center">
       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-2"></span>
       Live Mapbox Routing Active (Demo Mode)
    </div>

    {activePoints.length > 0 ? (
      activePoints.map((p, i) => (
        <div key={i} className="absolute w-5 h-5 bg-emerald-600 rounded-full border-2 border-white shadow-xl animate-bounce flex items-center justify-center text-[10px] text-white font-bold" 
             style={{ top: `${(i * 20) + 30}%`, left: `${(i * 25) + 25}%` }}>
          📍
        </div>
      ))
    ) : (
      <>
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
        <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
      </>
    )}
  </div>
);

const LandingView = ({ setView }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="max-w-7xl mx-auto pt-16 pb-20 px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <Badge variant="secondary" className="mb-6 inline-flex px-4 py-1.5 text-sm border-emerald-200 bg-emerald-50 text-emerald-700">
            ✨ Join the Food Rescue Revolution
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Turn Surplus Food Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">
              Community Impact
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
            FoodBridge AI connects businesses with nearby shelters, community kitchens, and volunteers to rescue surplus food before it goes to waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setView('donor')} className="text-lg px-8 py-3.5 shadow-xl shadow-emerald-600/20">
              Donate Surplus Food
            </Button>
            <Button onClick={() => setView('receiver')} variant="secondary" className="text-lg px-8 py-3.5">
              Find Available Food
            </Button>
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80" 
              alt="Volunteers organizing food" 
              className="rounded-3xl shadow-2xl w-full h-64 object-cover transform translate-y-8 hover:scale-105 transition duration-500 border-4 border-white" 
            />
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80" 
              alt="Fresh produce delivery" 
              className="rounded-3xl shadow-2xl w-full h-80 object-cover hover:scale-105 transition duration-500 border-4 border-white" 
            />
          </div>
          
          <div className="absolute -left-12 top-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce hover:scale-110 transition-transform cursor-default" style={{animationDuration: '3.5s'}}>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Just Rescued</p>
              <p className="font-bold text-slate-900">45 lbs of Produce</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Impact Statistics */}
    <div className="max-w-6xl mx-auto px-4 mb-24">
      <GlassCard className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
        <div>
          <div className="text-4xl font-bold text-emerald-600 mb-2 flex items-center justify-center">
            <Utensils className="w-6 h-6 mr-2 opacity-50" /> {GLOBAL_STATS.mealsRescued.toLocaleString()}+
          </div>
          <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Meals Rescued</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-slate-800 mb-2 flex items-center justify-center">
            <Package className="w-6 h-6 mr-2 opacity-50 text-emerald-600" /> {GLOBAL_STATS.foodDonors}
          </div>
          <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Food Donors</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-slate-800 mb-2 flex items-center justify-center">
            <Users className="w-6 h-6 mr-2 opacity-50 text-emerald-600" /> {GLOBAL_STATS.partners}
          </div>
          <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Community Partners</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-teal-500 mb-2 flex items-center justify-center">
            <Wind className="w-6 h-6 mr-2 opacity-50" /> {GLOBAL_STATS.co2Saved}
          </div>
          <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">CO₂ Emission Saved</div>
        </div>
      </GlassCard>
    </div>

    {/* How It Works */}
    <div className="max-w-6xl mx-auto px-4 pb-24" id="how-it-works">
      <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">How FoodBridge AI Works</h2>
      <div className="grid md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-1/4 left-1/8 right-1/8 h-0.5 bg-emerald-100 z-0"></div>
        {[
          { step: '1', title: 'List Surplus', desc: 'Donors easily log excess food and set pickup windows.', icon: Package },
          { step: '2', title: 'AI Matches', desc: 'Our algorithm finds the best receiver based on needs and location.', icon: Search },
          { step: '3', title: 'Volunteer Collects', desc: 'Nearby verified volunteers are routed for efficient pickup.', icon: Truck },
          { step: '4', title: 'Community Feeds', desc: 'Food reaches those in need, safely and quickly.', icon: CheckCircle }
        ].map((s, i) => (
          <div key={i} className="relative z-10 text-center">
            <div className="w-16 h-16 mx-auto bg-white border-4 border-emerald-50 rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition">
              <s.icon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonials */}
    <div className="max-w-6xl mx-auto px-4 pb-24">
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Trusted by Local Heroes</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { quote: "FoodBridge AI transformed how we handle end-of-day surplus. It's effortless and rewarding.", author: "Chef Marcus, Downtown Bistro", role: "Donor Partner" },
          { quote: "We receive fresh, high-quality meals right when our shelter guests need them most.", author: "Sarah Jenkins, Hope Shelter", role: "Receiver Partner" },
          { quote: "The volunteer routing is seamless. I can complete a food rescue run in under 30 minutes.", author: "Alex Rivera", role: "Lead Volunteer" }
        ].map((t, idx) => (
          <GlassCard key={idx} className="p-6 flex flex-col justify-between">
            <p className="text-slate-700 italic mb-6">"{t.quote}"</p>
            <div>
              <p className="font-bold text-slate-900">{t.author}</p>
              <p className="text-xs text-emerald-600 font-semibold">{t.role}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </div>
);

const DonorView = ({ donations, addDonation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const myDonations = donations.filter(d => d.donorId === 'd1');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');
    const form = e.target;
    const foodTypeVal = form.foodType.value || 'Surplus Food';
    
    setTimeout(() => {
      addDonation({
        donorId: 'd1',
        donorName: 'Fresh Market Grocery',
        foodType: foodTypeVal,
        quantity: form.quantity.value,
        expiry: `${new Date().toISOString().split('T')[0]}T${form.expiry.value}:00`,
        location: '120 Retail Pkwy (Loading Dock B)',
        matchScore: Math.floor(Math.random() * 15) + 85,
        matchReason: `AI Recommended: Found nearby shelters seeking this donation item today.`,
        imageUrl: getFoodImage(foodTypeVal),
        status: 'available'
      });
      setIsSubmitting(false);
      setSuccessMsg('Donation successfully listed! AI matching initiated.');
      form.reset();
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1 space-y-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Package className="w-5 h-5 mr-2 text-emerald-600" /> List New Surplus
          </h2>
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" /> {successMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Food Category/Description</label>
              <input name="foodType" required placeholder="e.g., Assorted Pastries & Organic Vegetables" 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none transition bg-white/50 focus:bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quantity/Weight</label>
              <input name="quantity" required placeholder="e.g., ~15 lbs (25 meals)" 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none transition bg-white/50 focus:bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Deadline (Today)</label>
              <input type="time" name="expiry" required defaultValue="17:00"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none transition bg-white/50 focus:bg-white" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full mt-4 flex items-center justify-center">
              {isSubmitting ? (
                <><Search className="w-4 h-4 mr-2 animate-spin" /> AI Analyzing Matches...</>
              ) : 'Publish & Find Receivers'}
            </Button>
          </form>
        </GlassCard>

        <GlassCard className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none shadow-xl">
          <h3 className="font-semibold text-emerald-50 mb-1">Your Monthly Impact</h3>
          <div className="text-4xl font-bold mb-4">420<span className="text-xl font-normal text-emerald-100 ml-1">meals</span></div>
          <p className="text-sm text-emerald-50 opacity-90 border-t border-emerald-400/30 pt-3">
            You've diverted 500 lbs of food from landfills this month, saving approx 1,200 kg of CO2.
          </p>
        </GlassCard>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Your Donations Log</h2>
            <p className="text-sm text-slate-500">Real-time tracking of listings and collections</p>
          </div>
          <Button variant="secondary" className="!px-4 !py-1.5 text-sm"><Filter className="w-4 h-4 mr-2"/> Filter</Button>
        </div>
        
        <div className="space-y-4">
          {myDonations.length === 0 ? (
            <div className="text-center py-12 text-slate-500 glass-card">No donations listed yet. Use the form to list your first surplus item!</div>
          ) : myDonations.map(donation => (
            <GlassCard key={donation.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:shadow-md">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img 
                  src={donation.imageUrl} 
                  alt={donation.foodType} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80'; }} 
                  className="w-20 h-20 rounded-xl object-cover shadow-sm flex-shrink-0 bg-slate-100 border border-slate-200" 
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{donation.foodType}</h3>
                  <div className="text-sm text-slate-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                    <span className="flex items-center"><Package className="w-3.5 h-3.5 mr-1"/> {donation.quantity}</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1"/> Expires {new Date(donation.expiry).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0">
                <Badge variant={
                  donation.status === 'available' ? 'info' : 
                  donation.status === 'reserved' ? 'warning' : 
                  donation.status === 'transit' ? 'primary' : 'success'
                } className="mb-2">
                  {donation.status.toUpperCase()}
                </Badge>
                {donation.status === 'available' && <span className="text-xs text-slate-500">Awaiting match</span>}
                {donation.status === 'reserved' && <span className="text-xs text-slate-500">Receiver confirmed</span>}
                {donation.status === 'transit' && <span className="text-xs text-emerald-600 font-medium">Volunteer en route</span>}
                {donation.status === 'delivered' && <span className="text-xs text-emerald-700 font-bold">Delivered Successfully 🎉</span>}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReceiverView = ({ donations, updateStatus }) => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [toast, setToast] = useState('');
  const availableDonations = donations.filter(d => d.status === 'available');

  const handleReserve = (id) => {
    updateStatus(id, 'reserved');
    setToast('Donation reserved! Volunteer assigned for pickup.');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {toast && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-3" />
            <span>{toast}</span>
          </div>
          <button onClick={() => setToast('')}><X className="w-5 h-5"/></button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <Badge variant="primary" className="mb-2 inline-flex"><TrendingUp className="w-3 h-3 mr-1"/> AI Smart Feed</Badge>
          <h2 className="text-3xl font-bold text-slate-900">Curated Matches for You</h2>
          <p className="text-slate-500 mt-1">Optimized for Hope Community Shelter based on your preferences and location.</p>
        </div>
        <div className="flex gap-2 text-sm font-medium text-slate-600 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
           <button className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-900">Highest Match</button>
           <button className="px-3 py-1.5 hover:bg-slate-50 rounded-lg">Expiring Soon</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableDonations.map(donation => (
          <GlassCard key={donation.id} className="flex flex-col group hover:shadow-xl transition-all duration-300">
            <div className="h-48 w-full relative overflow-hidden bg-slate-100">
              <img 
                src={donation.imageUrl} 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80'; }} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="Food" 
              />
              
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 border border-white/50">
                <div className="relative flex items-center justify-center w-6 h-6">
                  <svg className="w-6 h-6 transform -rotate-90">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="text-slate-200" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="transparent" 
                            strokeDasharray={`${(donation.matchScore / 100) * 62.8} 62.8`} className="text-emerald-500" />
                  </svg>
                </div>
                <span className="text-emerald-700 font-extrabold text-sm">{donation.matchScore}%</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{donation.foodType}</h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" /> {donation.donorName}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Package className="w-4 h-4 mr-2 text-slate-400" /> {donation.quantity}
                </div>
                <div className="flex items-center text-sm text-red-500 font-medium">
                  <Clock className="w-4 h-4 mr-2" /> Needs pickup by {new Date(donation.expiry).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50 mb-6 mt-auto">
                <p className="text-xs text-emerald-800 leading-relaxed flex items-start">
                  <Info className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0 text-emerald-600" /> 
                  {donation.matchReason}
                </p>
              </div>

              <Button onClick={() => handleReserve(donation.id)} className="w-full">
                Reserve & Request Volunteer
              </Button>
            </div>
          </GlassCard>
        ))}
        {availableDonations.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80" alt="Clean Plate" className="w-32 h-32 object-cover rounded-full mb-6 shadow-md border-4 border-white bg-slate-100" />
            <h3 className="text-2xl font-bold text-slate-700 mb-2">All Caught Up!</h3>
            <p className="text-slate-500">No available donations match your criteria right now.<br/>We'll notify you when AI finds a new match.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const VolunteerView = ({ donations, updateStatus }) => {
  const activePickups = donations.filter(d => d.status === 'reserved' || d.status === 'transit');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      <div className="lg:col-span-2 hidden lg:block rounded-2xl overflow-hidden shadow-sm">
         <MapPlaceholder activePoints={activePickups} />
      </div>

      <div className="flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-emerald-600" /> Available Delivery Tasks
          </h2>
          <Badge variant="secondary">{activePickups.length} Active</Badge>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {activePickups.map(task => (
            <div key={task.id} className={`border rounded-xl p-4 transition-all duration-300 ${
              task.status === 'transit' ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <Badge variant={task.status === 'reserved' ? 'warning' : 'primary'} className="mb-2">
                  {task.status === 'reserved' ? 'Needs Pickup' : 'In Transit'}
                </Badge>
                <span className="text-xs font-bold text-slate-400">{new Date(task.expiry).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              
              <div className="space-y-3 mb-5">
                <div className="relative pl-6">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                  
                  <div className="relative mb-3">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full"></div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pickup From</p>
                    <p className="font-semibold text-slate-900">{task.donorName}</p>
                    <p className="text-xs text-slate-600">{task.location}</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 bg-white border-2 border-slate-800 rounded-full"></div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Deliver To</p>
                    <p className="font-semibold text-slate-900">Hope Community Shelter</p>
                    <p className="text-xs text-slate-600">1.2 mi away</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 flex items-center border border-slate-100">
                  <Package className="w-4 h-4 mr-2 text-slate-400" />
                  {task.quantity} of {task.foodType}
                </div>
              </div>
              
              {task.status === 'reserved' ? (
                <Button 
                  onClick={() => updateStatus(task.id, 'transit')}
                  className="w-full bg-slate-900 hover:bg-slate-800 shadow-none text-sm"
                >
                  <Truck className="w-4 h-4 mr-2" /> Start Delivery Route
                </Button>
              ) : (
                <Button 
                  onClick={() => updateStatus(task.id, 'delivered')}
                  className="w-full text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Confirm Drop-off
                </Button>
              )}
            </div>
          ))}
          {activePickups.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center text-slate-500">
              <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80" alt="Relaxing Volunteer" className="w-24 h-24 object-cover rounded-full mb-5 shadow-sm opacity-90 border-4 border-slate-50 bg-slate-100" />
              <p className="font-medium text-slate-700">No active deliveries right now.</p>
              <p className="text-sm mt-1">Take a well-deserved break!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addDonation = (newDonation) => {
    setDonations([{ ...newDonation, id: `don_${Date.now()}` }, ...donations]);
  };

  const updateDonationStatus = (id, newStatus) => {
    setDonations(donations.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const views = [
    { id: 'landing', label: 'Home' },
    { id: 'donor', label: 'Donor Portal' },
    { id: 'receiver', label: 'Receiver Portal' },
    { id: 'volunteer', label: 'Volunteer App' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      
      {/* Navigation Header */}
      <nav className="sticky top-0 w-full bg-white/85 backdrop-blur-md z-50 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => navigateTo('landing')}
            >
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center mr-2 shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                FoodBridge <span className="text-emerald-600">AI</span>
              </span>
              <Badge variant="warning" className="ml-3 hidden sm:inline-flex border-amber-200 text-amber-800 bg-amber-50">
                Hackathon Demo Mode
              </Badge>
            </div>
            
            <div className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-full border border-slate-200">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => navigateTo(view.id)}
                  className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    currentView === view.id 
                      ? 'bg-white shadow-sm text-emerald-700' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-slate-900 p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
             {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => navigateTo(view.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    currentView === view.id 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {view.label}
                </button>
              ))}
          </div>
        )}
      </nav>
      
      {/* Main Content Area */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 lg:py-12">
        {currentView === 'landing' && <LandingView setView={navigateTo} />}
        {currentView === 'donor' && <DonorView donations={donations} addDonation={addDonation} />}
        {currentView === 'receiver' && <ReceiverView donations={donations} updateStatus={updateDonationStatus} />}
        {currentView === 'volunteer' && <VolunteerView donations={donations} updateStatus={updateDonationStatus} />}
      </main>

      {/* Footer */}
      {currentView === 'landing' && (
        <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-emerald-500 mr-2" />
                <span className="text-xl font-bold text-white">FoodBridge AI</span>
              </div>
              <p className="max-w-md text-slate-400">Bridging the gap between food surplus and food scarcity through intelligent routing and community action.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('donor')} className="hover:text-emerald-400 transition">For Donors</button></li>
                <li><button onClick={() => navigateTo('receiver')} className="hover:text-emerald-400 transition">For Receivers</button></li>
                <li><button onClick={() => navigateTo('volunteer')} className="hover:text-emerald-400 transition">Volunteer App</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal & Compliance</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Good Samaritan Food Donation Act</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 text-center">
            © 2026 FoodBridge AI Inc. Built for sustainable communities worldwide.
          </div>
        </footer>
      )}
    </div>
  );
}
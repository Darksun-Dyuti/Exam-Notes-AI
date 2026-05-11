import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import axios from 'axios';
import { serverUrl } from '../App';
import Navbar from '../components/Navbar';
import { LuCircleCheck } from "react-icons/lu";

function Pricing() {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount)
      setPaying(true)
      const result = await axios.post(serverUrl + "/api/credit/order" , {amount} , {withCredentials:true})

      if(result.data.url){
        window.location.href = result.data.url
      }

      setPaying(false)

    } catch (error) {
          setPaying(false)
          console.log(error)
    }
  }
  return (
    <div className='min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300'>
      <Navbar />

      <main className='max-w-5xl mx-auto px-6 py-12 relative z-10 mt-6'>
        <motion.div 
        initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Buy Credits</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-3 text-lg">
            Choose a plan that fits your study needs
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

          <PricingCard 
            title="Starter"
            price="₹100"
            amount={100}
            credits="50 Credits"
            description="Perfect for quick revisions"
            features={[
              "Generate AI notes",
              "Exam-focused answers",
              "Diagram & charts support",
              "Fast generation"
            ]}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
           />

            <PricingCard
            popular
            title="Popular"
            price="₹200"
            amount={200}
            credits="120 Credits"
            description="Best value for students"
            features={[
              "All Starter features",
              "More credits per ₹",
              "Revision mode access",
              "Priority AI response"
            ]}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

          <PricingCard
            title="Pro Learner"
            price="₹500"
            amount={500}
            credits="300 Credits"
            description="For serious exam preparation"
            features={[
              "Maximum credit value",
              "Unlimited revisions",
              "Charts & diagrams",
              "Ideal for full syllabus"
            ]}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

        </div>
      </main>
    </div>
  )
}

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount
}){

  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;
  return(
    <motion.div  
    onClick={()=>setSelectedPrice(amount)}
    whileHover={{ y: -6 }}
        className={`
          relative cursor-pointer
          rounded-2xl p-8 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl
          border shadow-lg transition-all duration-300
          ${isSelected
            ? "border-indigo-600 dark:border-indigo-400 shadow-indigo-500/20"
            : popular
            ? "border-indigo-400/50 dark:border-indigo-500/50"
            : "border-slate-200 dark:border-white/10"}
        `}>
         {popular && !isSelected && <span className='absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full bg-indigo-600 text-white shadow-md tracking-wider uppercase'>Popular</span>}

        {isSelected && <span className='absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md tracking-wider uppercase'>
          Selected
         </span>}

         <h2 className='text-2xl font-bold text-slate-800 dark:text-white'>{title}</h2>
         <p className='text-sm text-slate-500 dark:text-slate-400 mt-2'>{description}</p>

         <div className='mt-6 mb-6 pb-6 border-b border-slate-200 dark:border-white/10'>
          <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{price}</p>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-2">{credits}</p>
         </div>

          <ul className='space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8'>
            {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <LuCircleCheck className="text-green-500 dark:text-emerald-400 text-lg flex-shrink-0" />
              <span>{f}</span>
            </li>
          ))}
          </ul>

          <button 
          disabled={isPayingThisCard}
          onClick={(e)=>{
            e.stopPropagation();
            onBuy(amount)
          }}
          className={`
            w-full py-3 rounded-xl font-bold transition-all duration-300
            ${isPayingThisCard
              ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              : isSelected
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
              : "bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-md"}
          `}>
          {isPayingThisCard ? "Redirecting..." : "Buy Now"}
          </button>

    </motion.div>
  )
}

export default Pricing

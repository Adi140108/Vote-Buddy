"use client"

import { useState } from 'react'
import styles from './page.module.css'
import { MapPin, Search, Navigation } from 'lucide-react'

export default function Locator() {
  const [zipcode, setZipcode] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!zipcode) return
    
    setIsSearching(true)
    
    // Simulate API call to find booth
    setTimeout(() => {
      setResult({
        name: "Govt. Primary School, Sector 14",
        address: "Main Road, Near Community Center, Sector 14",
        distance: "1.2 km away",
        boothNo: "142",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184246!2d77.3458!3d28.6213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzE2LjciTiA3N8KwMjEnNDQuOSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
      })
      setIsSearching(false)
    }, 1200)
  }

  return (
    <div className={`container ${styles.locatorContainer}`}>
      <div className={styles.header}>
        <h1>Find Your Polling Booth</h1>
        <p>Enter your PIN code or locality to locate where you need to vote.</p>
      </div>

      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <MapPin className={styles.inputIcon} size={20} />
            <input 
              type="text" 
              placeholder="Enter PIN Code (e.g. 110001)"
              className={styles.input}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.searchBtn}`}
              disabled={isSearching || !zipcode}
            >
              {isSearching ? 'Searching...' : <><Search size={18} /> Search</>}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className={`card ${styles.resultCard}`}>
          <div className={styles.resultInfo}>
            <div className={styles.badge}>Booth No: {result.boothNo}</div>
            <h2>{result.name}</h2>
            <p className={styles.address}>{result.address}</p>
            <p className={styles.distance}>
              <Navigation size={16} className={styles.distIcon} />
              {result.distance}
            </p>
            
            <div className={styles.actions}>
              <button className="btn btn-primary">Get Directions</button>
              <button className="btn btn-outline">Save Booth</button>
            </div>
          </div>
          
          <div className={styles.mapContainer}>
            {/* Placeholder for actual Google Map iframe */}
            <div className={styles.mapPlaceholder}>
              <MapPin size={48} className={styles.mapPinLg} />
              <p>Map View Active</p>
            </div>
          </div>
        </div>
      )}
      
      {!result && !isSearching && (
        <div className={styles.emptyState}>
          <MapPin size={48} className={styles.emptyIcon} />
          <h3>No location entered</h3>
          <p>Enter your PIN code above to find your designated polling station.</p>
        </div>
      )}
    </div>
  )
}

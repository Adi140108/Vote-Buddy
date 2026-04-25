"use client"
import Link from 'next/link'
import styles from './Navbar.module.css'
import { Vote, Globe, Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'te', label: 'Telugu' },
  { code: 'mr', label: 'Marathi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'ur', label: 'Urdu' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'kn', label: 'Kannada' },
  { code: 'or', label: 'Odia' }
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentLangLabel = languages.find(l => l.code === lang)?.label || 'English'

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Vote className={styles.logoIcon} />
          <span>VoteBuddy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <Link href="/onboarding" className={styles.navLink}>{t('nav', 'getStarted')}</Link>
          <Link href="/dashboard" className={styles.navLink}>{t('nav', 'journey')}</Link>
          <Link href="/locator" className={styles.navLink}>{t('nav', 'locator')}</Link>
          <Link href="/chat" className={styles.navLink}>{t('nav', 'assistant')}</Link>
          
          <div className={styles.langSelector} ref={dropdownRef}>
            <button 
              className={styles.dropdownButton}
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Globe size={18} />
              {currentLangLabel}
              <ChevronDown size={14} style={{ transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
            </button>
            
            {isLangOpen && (
              <div className={styles.dropdownMenu}>
                {languages.map(l => (
                  <button 
                    key={l.code}
                    className={`${styles.dropdownItem} ${lang === l.code ? styles.activeItem : ''}`}
                    onClick={() => {
                      setLang(l.code)
                      setIsLangOpen(false)
                    }}
                  >
                    {l.label}
                    {lang === l.code && <div className={styles.activeDot}></div>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          <Link href="/onboarding" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>{t('nav', 'getStarted')}</Link>
          <Link href="/dashboard" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>{t('nav', 'journey')}</Link>
          <Link href="/locator" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>{t('nav', 'locator')}</Link>
          <Link href="/chat" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>{t('nav', 'assistant')}</Link>
          
          <div className={styles.mobileLangSelector}>
            <Globe size={18} />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className={styles.langDropdown}
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </nav>
      )}
    </header>
  )
}

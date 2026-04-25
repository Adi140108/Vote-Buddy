"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import { CheckCircle, Circle, MapPin, ChevronRight, AlertCircle } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Dashboard() {
  const { t } = useLanguage()
  const [profile, setProfile] = useState(null)
  
  useEffect(() => {
    const saved = localStorage.getItem('voterProfile')
    if (saved) {
      setProfile(JSON.parse(saved))
    }
  }, [])

  // Mock timeline dates
  const today = new Date()
  const electionDate = new Date(today.getFullYear(), today.getMonth() + 2, 15) // Approx 2 months away
  const regDeadline = new Date(electionDate)
  regDeadline.setDate(electionDate.getDate() - 30) // 30 days before election

  const getDaysDiff = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const generateRoadmap = () => {
    if (!profile) return []

    const isUnderage = profile.age === 'under18'
    const hasVoterId = profile.hasVoterId === 'yes'
    
    if (isUnderage) {
      return [
        {
          id: 1,
          title: t('roadmap', 'underageTitle'),
          desc: t('roadmap', 'underageDesc'),
          status: "pending",
          link: "/learn"
        }
      ]
    }

    const steps = []

    if (!hasVoterId || profile.hasVoterId === 'unsure') {
      steps.push({
        id: 1,
        title: t('roadmap', 'regTitle'),
        desc: `${t('roadmap', 'deadline')}: ${regDeadline.toLocaleDateString('en-IN')}`,
        status: "pending",
        link: "https://voters.eci.gov.in/",
        external: true
      })
    } else {
      steps.push({
        id: 1,
        title: t('roadmap', 'verifyTitle'),
        desc: t('roadmap', 'verifyDesc'),
        status: "completed",
        link: "https://electoralsearch.eci.gov.in/",
        external: true
      })
    }

    steps.push({
      id: 2,
      title: t('roadmap', 'boothTitle'),
      desc: t('roadmap', 'boothDesc'),
      status: "pending",
      link: "/locator"
    })

    steps.push({
      id: 3,
      title: t('roadmap', 'docsTitle'),
      desc: t('roadmap', 'docsDesc'),
      status: "pending",
      link: "/learn"
    })

    steps.push({
      id: 4,
      title: t('roadmap', 'voteTitle'),
      desc: `${t('roadmap', 'day')}: ${electionDate.toLocaleDateString('en-IN')}`,
      status: "locked",
      link: "#"
    })

    return steps
  }

  const roadmap = generateRoadmap()

  return (
    <div className={`container ${styles.dashboard}`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('dashboard', 'title')}</h1>
          {profile && (
            <p className={styles.subtitle}>
              {t('dashboard', 'personalized')} {profile.age} • {profile.state}
            </p>
          )}
        </div>
        
        <div className={styles.countdownCard}>
          <div className={styles.countdownValue}>{getDaysDiff(today, electionDate)}</div>
          <div className={styles.countdownLabel}>{t('dashboard', 'days')}</div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          <div className={`card ${styles.roadmapCard}`}>
            <h2>{t('dashboard', 'guide')}</h2>
            <div className={styles.timeline}>
              {roadmap.map((step, index) => (
                <div key={step.id} className={`${styles.timelineItem} ${styles[step.status]}`}>
                  <div className={styles.timelineIcon}>
                    {step.status === 'completed' ? (
                      <CheckCircle className={styles.iconCompleted} size={24} />
                    ) : (
                      <Circle className={styles.iconPending} size={24} />
                    )}
                    {index < roadmap.length - 1 && <div className={styles.timelineLine}></div>}
                  </div>
                  
                  <div className={styles.timelineContent}>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                    {step.link !== '#' && (
                      <Link 
                        href={step.link} 
                        target={step.external ? "_blank" : "_self"}
                        className={styles.stepAction}
                      >
                        {step.external ? t('dashboard', 'portal') : t('dashboard', 'action')} <ChevronRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideColumn}>
          <div className={`card ${styles.alertCard}`}>
            <div className={styles.alertHeader}>
              <AlertCircle className={styles.alertIcon} />
              <h3>{t('dashboard', 'deadline')}</h3>
            </div>
            <p>{t('dashboard', 'regClose')} {profile?.state || 'your state'} closes on <strong>{regDeadline.toLocaleDateString('en-IN')}</strong>.</p>
          </div>

          <div className={`card ${styles.quickActions}`}>
            <h3>{t('dashboard', 'quick')}</h3>
            <Link href="/locator" className={styles.actionBtn}>
              <MapPin size={20} /> {t('nav', 'locator')}
            </Link>
            <Link href="/chat" className={styles.actionBtn}>
              <CheckCircle size={20} /> {t('nav', 'assistant')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

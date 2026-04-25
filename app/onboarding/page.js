"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Onboarding() {
  const router = useRouter()
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    age: '',
    state: '',
    hasVoterId: ''
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
    else {
      // Save to localStorage so dashboard can read it
      localStorage.setItem('voterProfile', JSON.stringify(formData))
      router.push('/dashboard')
    }
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]

  return (
    <div className={`container ${styles.onboardingContainer}`}>
      <div className={`card ${styles.formCard}`}>
        <div className={styles.progressHeader}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <span className={styles.stepText}>{t('onboarding', 'step')} {step} {t('onboarding', 'of')} 3</span>
        </div>

        <div className={styles.formContent}>
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2>{t('onboarding', 'ageTitle')}</h2>
              <p className={styles.helperText}>{t('onboarding', 'ageSub')}</p>
              
              <div className={styles.optionsGrid}>
                <button 
                  className={`${styles.optionBtn} ${formData.age === 'under18' ? styles.selected : ''}`}
                  onClick={() => updateFormData('age', 'under18')}
                >
                  {t('onboarding', 'ageOption1')}
                </button>
                <button 
                  className={`${styles.optionBtn} ${formData.age === '18-21' ? styles.selected : ''}`}
                  onClick={() => updateFormData('age', '18-21')}
                >
                  {t('onboarding', 'ageOption2')}
                </button>
                <button 
                  className={`${styles.optionBtn} ${formData.age === 'over21' ? styles.selected : ''}`}
                  onClick={() => updateFormData('age', 'over21')}
                >
                  {t('onboarding', 'ageOption3')}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <h2>{t('onboarding', 'liveTitle')}</h2>
              <p className={styles.helperText}>{t('onboarding', 'liveSub')}</p>
              
              <div className={styles.inputGroup}>
                <label htmlFor="state">{t('onboarding', 'stateLabel')}</label>
                <select 
                  id="state"
                  className={styles.selectInput}
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                >
                  <option value="">{t('onboarding', 'stateChoose')}</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <h2>{t('onboarding', 'idTitle')}</h2>
              <p className={styles.helperText}>{t('onboarding', 'idSub')}</p>
              
              <div className={styles.optionsGrid}>
                <button 
                  className={`${styles.optionBtn} ${formData.hasVoterId === 'yes' ? styles.selected : ''}`}
                  onClick={() => updateFormData('hasVoterId', 'yes')}
                >
                  {t('onboarding', 'idYes')}
                </button>
                <button 
                  className={`${styles.optionBtn} ${formData.hasVoterId === 'no' ? styles.selected : ''}`}
                  onClick={() => updateFormData('hasVoterId', 'no')}
                >
                  {t('onboarding', 'idNo')}
                </button>
                <button 
                  className={`${styles.optionBtn} ${formData.hasVoterId === 'unsure' ? styles.selected : ''}`}
                  onClick={() => updateFormData('hasVoterId', 'unsure')}
                >
                  {t('onboarding', 'idUnsure')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button 
            className={`btn btn-outline ${step === 1 ? styles.invisible : ''}`} 
            onClick={prevStep}
          >
            <ArrowLeft size={18} className={styles.iconLeft} /> {t('onboarding', 'back')}
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={nextStep}
            disabled={
              (step === 1 && !formData.age) || 
              (step === 2 && !formData.state) || 
              (step === 3 && !formData.hasVoterId)
            }
          >
            {step === 3 ? t('onboarding', 'finish') : t('onboarding', 'continue')} 
            {step !== 3 && <ArrowRight size={18} className={styles.iconRight} />}
          </button>
        </div>
      </div>
    </div>
  )
}

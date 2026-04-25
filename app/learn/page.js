"use client"

import { useState } from 'react'
import styles from './page.module.css'
import { BookOpen, CheckCircle, ChevronRight, Check } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Learn() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('guide')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      q: t('quiz', 'q1'),
      options: [t('quiz', 'q1O1'), t('quiz', 'q1O2'), t('quiz', 'q1O3')],
      correct: 1
    },
    {
      q: t('quiz', 'q2'),
      options: [t('quiz', 'q2O1'), t('quiz', 'q2O2'), t('quiz', 'q2O3')],
      correct: 0
    },
    {
      q: t('quiz', 'q3'),
      options: [t('quiz', 'q3O1'), t('quiz', 'q3O2'), t('quiz', 'q3O3')],
      correct: 1
    }
  ]

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const restartQuiz = () => {
    setScore(0)
    setCurrentQuestion(0)
    setShowResults(false)
  }

  return (
    <div className={`container ${styles.learnContainer}`}>
      <div className={styles.header}>
        <h1>{t('learn', 'header')}</h1>
        <p>{t('learn', 'sub')}</p>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'guide' ? styles.active : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          <BookOpen size={18} /> {t('learn', 'tab1')}
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'quiz' ? styles.active : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <CheckCircle size={18} /> {t('learn', 'tab2')}
        </button>
      </div>

      {activeTab === 'guide' && (
        <div className={styles.guideSection}>
          <div className={styles.guideGrid}>
            <div className={`card ${styles.topicCard}`}>
              <h3>{t('learn', 'g1Title')}</h3>
              <p>{t('learn', 'g1Sub')}</p>
              <ul className={styles.list}>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g1L1')}</li>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g1L2')}</li>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g1L3')}</li>
              </ul>
            </div>

            <div className={`card ${styles.topicCard}`}>
              <h3>{t('learn', 'g2Title')}</h3>
              <p>{t('learn', 'g2Sub')}</p>
              <ul className={styles.list}>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g2L1')}</li>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g2L2')}</li>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g2L3')}</li>
              </ul>
            </div>

            <div className={`card ${styles.topicCard}`}>
              <h3>{t('learn', 'g3Title')}</h3>
              <p>{t('learn', 'g3Sub')}</p>
              <ul className={styles.list}>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g3L1')}</li>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g3L2')}</li>
                <li><Check size={16} className={styles.checkIcon}/> {t('learn', 'g3L3')}</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className={styles.quizSection}>
          {!quizStarted ? (
            <div className={`card ${styles.quizIntro}`}>
              <h2>{t('quiz', 'introTitle')}</h2>
              <p>{t('quiz', 'introSub')}</p>
              <button 
                className="btn btn-primary"
                onClick={() => setQuizStarted(true)}
              >
                {t('quiz', 'startBtn')}
              </button>
            </div>
          ) : showResults ? (
            <div className={`card ${styles.quizResults}`}>
              <h2>{t('quiz', 'resultTitle')}</h2>
              <div className={styles.scoreCircle}>
                {score} / {questions.length}
              </div>
              <p>
                {score === questions.length 
                  ? t('quiz', 'perfect') 
                  : t('quiz', 'keepLearning')}
              </p>
              <button className="btn btn-outline" onClick={restartQuiz}>
                {t('quiz', 'retake')}
              </button>
            </div>
          ) : (
            <div className={`card ${styles.questionCard}`}>
              <div className={styles.progressText}>{t('onboarding', 'step')} {currentQuestion + 1} {t('onboarding', 'of')} {questions.length}</div>
              <h2>{questions[currentQuestion].q}</h2>
              <div className={styles.optionsList}>
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button 
                    key={idx}
                    className={styles.quizOptionBtn}
                    onClick={() => handleAnswer(idx)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

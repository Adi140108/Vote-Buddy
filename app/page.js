"use client"
import Link from 'next/link'
import styles from './page.module.css'
import { ArrowRight, MapPin, MessageSquare, CheckCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import dynamic from 'next/dynamic'
const Scene3D = dynamic(() => import('../components/Scene3D'), { 
  ssr: false,
  loading: () => <p>Loading 3D Scene...</p>
})

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.badge}>{t('hero', 'badge')}</div>
              <h1 className={styles.title}>
                {t('hero', 'title1')} <span className={styles.highlight}>{t('hero', 'titleHighlight')}</span>
              </h1>
              <p className={styles.subtitle}>
                {t('hero', 'subtitle')}
              </p>
              <div className={styles.ctaGroup}>
                <Link href="/onboarding" className={`btn btn-primary ${styles.btnLg}`}>
                  {t('hero', 'btnStart')} <ArrowRight size={20} className={styles.iconRight} />
                </Link>
                <Link href="/learn" className={`btn btn-outline ${styles.btnLg}`}>
                  {t('hero', 'btnLearn')}
                </Link>
              </div>
            </div>
            
            <div className={styles.hero3d}>
              {/* Custom 3D Scene */}
              <div className={styles.splineWrapper}>
                <Scene3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{t('features', 'header')}</h2>
            <p>{t('features', 'sub')}</p>
          </div>
          
          <div className={styles.grid}>
            <div className={`card ${styles.featureCard}`}>
              <div className={`${styles.iconWrapper} ${styles.blue}`}>
                <CheckCircle size={28} />
              </div>
              <h3>{t('features', 'f1')}</h3>
              <p>{t('features', 'f1Sub')}</p>
            </div>
            
            <div className={`card ${styles.featureCard}`}>
              <div className={`${styles.iconWrapper} ${styles.saffron}`}>
                <MessageSquare size={28} />
              </div>
              <h3>{t('features', 'f2')}</h3>
              <p>{t('features', 'f2Sub')}</p>
            </div>
            
            <div className={`card ${styles.featureCard}`}>
              <div className={`${styles.iconWrapper} ${styles.green}`}>
                <MapPin size={28} />
              </div>
              <h3>{t('features', 'f3')}</h3>
              <p>{t('features', 'f3Sub')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howItWorks}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{t('how', 'header')}</h2>
          </div>
          
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>{t('how', 's1Title')}</h3>
              <p>{t('how', 's1Sub')}</p>
            </div>
            <div className={styles.stepDivider}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>{t('how', 's2Title')}</h3>
              <p>{t('how', 's2Sub')}</p>
            </div>
            <div className={styles.stepDivider}></div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>{t('how', 's3Title')}</h3>
              <p>{t('how', 's3Sub')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.bottomCta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>{t('cta', 'title')}</h2>
            <p>{t('cta', 'sub')}</p>
            <Link href="/onboarding" className={`btn btn-primary ${styles.btnLg} ${styles.btnWhite}`}>
              {t('cta', 'btn')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

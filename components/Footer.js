import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.textCenter}>
          <p className={styles.title}>VoteBuddy</p>
          <p className={styles.subtitle}>Your Personal Election Guide</p>
        </div>
        <div className={styles.links}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} VoteBuddy. Empowering voters.
        </p>
      </div>
    </footer>
  )
}

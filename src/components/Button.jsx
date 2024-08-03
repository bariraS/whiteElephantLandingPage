
import styles from './styles.module.css';

const Button = ({ text, link }) => {
  return (
    <button className={styles.buttonOs}>
      <a href={link} className={styles.buttonLink}>{text}</a>
    </button>
  );
}

export default Button;

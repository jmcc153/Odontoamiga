import styles from "./modal.module.css";

export const Modal = ({ icon, title, isSuccess = null, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <i className={isSuccess == 'approved' ? styles.successIcon : styles.failureIcon}>{icon}</i>
          <h2 className={`${isSuccess == 'approved' ? styles.success : styles.failure}`}>
            {title}
          </h2>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

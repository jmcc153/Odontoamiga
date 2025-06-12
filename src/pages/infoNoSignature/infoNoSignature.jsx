import { Link } from "react-router-dom";
import styles from "./infoNoSignature.module.css";
export const InfoNoSignature = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Proceso de entrega de documentos físicos</h1>
      <div className={styles.containerInfo}>
        <p className={styles.text}>
          Has elegido realizar tu proceso sin firma electrónica.
        </p>
        <p className={styles.text}>
          Para finalizar correctamente tu solicitud, es importante que tengas en
          cuenta los siguientes pasos:
        </p>
        <p className={styles.text}>
          <strong>I. Entrega presencial o por correo certificado</strong>
        </p>
        <p className={styles.text}>Dirección de nuestras oficinas:</p>
        <p className={styles.text}>
          Calle 64 No. 14 – 15, Piso 4 <br />
          Bogotá D.C., Colombia
        </p>
        <p className={styles.text}>
          <strong>II. Horario de atención para recepción de documentos:</strong>
        </p>
        <p className={styles.text}>
          Lunes a viernes <br />
          8:00 a.m. a 5:00 p.m. (jornada continua)
        </p>
        <p className={styles.text}>
          <strong>III. ¿No puedes venir personalmente?</strong>
        </p>
        <p className={styles.text}>
          Puedes enviar la documentación requerida por correo certificado a la
          misma dirección. Asegúrate de que todos los documentos estén completos
          y correctamente diligenciados.
        </p>
        <p className={styles.text}>
          <strong>IV. Documentos requeridos</strong>
        </p>
        <p className={styles.text}>
          Por favor asegúrate de incluir los siguientes documentos en tu envío:
        </p>
        <ol className={styles.list}>
          <li className={styles.listItem}>Copia de tu cédula de ciudadanía</li>
          <li className={styles.listItem}>
            Pagaré autenticado y diligenciado, con su respectiva carta de
            instrucciones <br/>
            <a
              href="https://example.com/download-pagare"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descarga aquí
            </a>
          </li>
        </ol>
        <p className={styles.text}>
          <strong>🔔 Importante:</strong> Solo podremos continuar con tu
          solicitud una vez recibamos y validemos toda la documentación en
          nuestras oficinas.
        </p>
        <p className={styles.text}>
          Si tienes dudas, no dudes en comunicarte con nosotros. ¡Estamos para
          ayudarte!
        </p>
      </div>
      <Link to={"/"} className={styles.link}>
        <button className={styles.button}>Finalizar</button>
      </Link>
    </div>
  );

  /* 📌 Proceso de entrega de documentos físicos
Has elegido realizar tu proceso sin firma electrónica.


Para finalizar correctamente tu solicitud, es importante que tengas en cuenta los siguientes pasos:

I. Entrega presencial o por correo certificado


Dirección de nuestras oficinas:
Calle 64 No. 14 – 15, Piso 4
Bogotá D.C., Colombia

II. Horario de atención para recepción de documentos:
Lunes a viernes
8:00 a.m. a 5:00 p.m. (jornada continua)

III. ¿No puedes venir personalmente?
Puedes enviar la documentación requerida por correo certificado a la misma dirección. Asegúrate de que todos los documentos estén completos y correctamente diligenciados.

IV. Documentos requeridos
Por favor asegúrate de incluir los siguientes documentos en tu envío:
1. Copia de tu cédula de ciudadanía
2. Pagaré autenticado y diligenciado, con su respectiva carta de instrucciones
Descarga aquí

🔔 Importante: Solo podremos continuar con tu solicitud una vez recibamos y validemos toda la documentación en nuestras oficinas.

Si tienes dudas, no dudes en comunicarte con nosotros.
¡Estamos para ayudarte! */
};

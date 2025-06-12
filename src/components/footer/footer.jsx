import styles from "./footer.module.css";
import logo from "../../assets/images/LogoValcreditNegro.png";

export const Footer = () => {
  const sectionsLegalesArray = [
    {
      name: "Política de tratamiento de datos",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/669fb0702f4ec3426d0f9a95_politica_tratamiento_de_datos_v2.pdf",
    },
    {
      name: "Política de abonos anticipados",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/681698a12752d2ab80a63f84_Poli%CC%81tica%20de%20Abonos%20anticipados%20a%20Capital.pdf",
    },
    {
      name: "Términos y condiciones Pg-web",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/669fb01d0e428f77b785ef3e_terminos-y-condiciones-valcredit.pdf",
    },
    {
      name: "Términos y condiciones (Edufast)",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/68175b4c8e6452dab9129e2a_TYC%20(EduFast).pdf",
    },
    {
      name: "Condiciones (Seguro vida deudores)",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/68176613ba19dd766d8188af_Condiciones%20de%20seguro%20vida%20deudores.pdf",
    },
    {
      name: "Tasas y tarifas",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/6816aa4e20e197dfdc95255d_Tasas%20y%20tarifas%20(May.2025).pdf",
    },
    {
      name: "Formato pagaré y carta de instrucciones",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/68176a25e56236e59c0428a9_Formato%20pagare%CC%81%20y%20carta%20de%20instrucciones.pdf",
    },
    {
      name: "Compromiso ley 2300",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/6816afbd7b15f38f993418f0_Compromiso%20Ley%202300.pdf",
    },
    {
      name: "Línea ética",
      link: "https://neptuno.valcredit.co/linea-etica/index.html",
    },
    {
      name: "Código de ética",
      link: "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/669fabe5a47872a091878dd7_%F0%9F%8C%88Co%CC%81digo%20de%20e%CC%81tica.pdf",
    },
    {
      name: "FPQR",
      link: "http://quantum.sincap.co:8080/quantum-war/faces/app-public/quejas/registraqueja.xhtml?idunidad_=4",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.containerLogo}>
        <img src={logo} className={styles.logoImg} />
        <p>Estamos reinventando el financiamiento</p>
      </div>
      <div className={styles.containerText}>
        <h4 className={styles.title}>Información</h4>
        <div className={styles.text}>
          <p>
            ValCredit SAS <br />
            NIT: 900.310.033-8
          </p>
        </div>
        <div className={styles.text}>
          <h4>Servicio al cliente</h4>
          <p>Teléfono: 018000 123 456</p>
        </div>
        <div className={styles.text}>
          <p>PBX: 300 911 1322</p>
        </div>
        <div className={styles.text}>
          <p>
            Dirección: Cl. 64 #14-15, piso 4 <br />
            Bogotá, Colombia
          </p>
        </div>
        <div className={styles.text}>
          <p>
            Horarios de atención: <br />
            Lun a Vier: 8:00 a.m. a 5:00 p.m.
            <br />
            Sab 8:00 a.m. a 12:00 p.m.
          </p>
        </div>
      </div>
      <div className={styles.containerText}>
        <h4 className={styles.title}>Legales</h4>
        <div className={styles.text}>
          {sectionsLegalesArray.map((item, index) => (
            <div key={index} className={styles.text}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
      <section class={styles.containerTerms}>
        <div className={styles.terms}>
          <h4>Términos y condiciones</h4>
          <p>
            Los términos que regulan la relación entre Valcredit y sus usuarios,
            colaboradores, proveedores u otros contratistas, accionistas,
            miembros de órganos de gobierno corporativo, acreedores y cualquier
            otro grupo de interés, están contenidos en los documentos o textos
            legales aplicables, incluyendo lo relevante con la información
            presentada en este sitio web y en las normas aplicables.El contenido
            vinculado a este sitio web tiene derechos reservados de propiedad
            intelectual de Valcredit o de terceros.Para cualquier consulta
            adicional, por favor póngase en contacto con nosotros a través de
            nuestros canales oficiales.
          </p>
          <p>Todos los derechos reservados - © ValCredit S.A.S</p>
        </div>
      </section>
      <div className={styles.containerVersion}>
        <small>
          © {new Date().getFullYear()} CrediXpress. All rights reserved.
        </small>
        <small>CrediXpress 1.0.0</small>
      </div>
    </div>
  );
};

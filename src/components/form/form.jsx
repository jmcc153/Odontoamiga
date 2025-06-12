import styles from "./form.module.css";
import documentoTerminos from "../../assets/documents/1_TÉRMINOS_Y_CONDICIONES_ODONTOAMIGA.pdf";
import firma from "../../assets/documents/firmaElectronica.pdf";
import { ModalAdress } from "../modalAddress/modalAdress";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Form = ({ inputs, form, onSubmit }) => {
  const politicaValcredit =
    "https://cdn.prod.website-files.com/66799e6ddf33619721f76391/66d0cd0a7f3b2c9098354ed0_Pol%C3%ADtica%20de%20Tratamiento%20de%20Datos%20Valcredit.pdf";
  const [isOpenAdress, setIsOpenAddress] = useState(false);
  const formAdress = useForm();

  return (
    <>
      <form
        id="creditForm"
        className={styles.inputsContainer}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputContainer}>
            <label className={styles.label}>{input.label}</label>
            {input.type == "select" ? (
              <select
                className={styles.select}
                {...form.register(input.name, {
                  required: input.required,
                })}
              >
                <option value="">Seleccionar</option>
                {input.options &&
                  input.options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : input.name == "telefono" ? (
              <input
                type={input.type}
                className={styles.input}
                {...form.register(input.name, {
                  required: input.required,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "El número debe tener 10 dígitos",
                  },
                })}
              />
            ) : input.name == "direccion" ? (
              <input
                type={input.type}
                className={styles.input}
                {...form.register(input.name, {
                  required: input.required,
                })}
                onClick={() => setIsOpenAddress(true)}
              />
            ) : (
              <input
                type={input.type}
                className={styles.input}
                {...form.register(input.name, {
                  required: input.required,
                })}
              />
            )}

            <span
              className={
                form.formState.errors[input.name] == undefined
                  ? styles.errorMessage
                  : `${styles.errorMessage} ${styles.show}`
              }
            >
              {form.formState.errors[input.name]?.message || "Campo requerido"}
            </span>
          </div>
        ))}
        <div className={styles.inputContainerColumn}>
          <input required type="checkbox" className={styles.checkbox} />
          <label className={styles.label}>
            <a href={documentoTerminos} target="_blank">
              <strong>
                Autorizo a ValCredit a consultar y reportar mi información a las
                centrales de riesgo
              </strong>
            </a>
          </label>
        </div>
        <div className={styles.inputContainerColumn}>
          <input required type="checkbox" className={styles.checkbox} />
          <label className={styles.label}>
            He leído, comprendido y acepto la{" "}
            <a href={politicaValcredit} target="_blank">
              <strong>Política de tratamiento de datos personales</strong>
            </a>
          </label>
        </div>
        <div className={styles.inputContainerColumn}>
          <input
            {...form.register("signature")}
            type="checkbox"
            className={styles.checkbox}
          />
          <label className={styles.label}>
            Autorizo{" "}
            <a href={firma} target="_blank">
              <strong>
                firmar electrónicamente y acepto las condiciones de contratación
                digital.
              </strong>
            </a>
          </label>
        </div>
      </form>
      <button
        form="creditForm"
        onClick={form.handleSubmit}
        type="submit"
        className={styles.button}
      >
        Enviar
      </button>
      {isOpenAdress && <ModalAdress setIsOpenAddress={setIsOpenAddress} formAdress={formAdress} formPrincipal={form} />}
    </>
  );
};

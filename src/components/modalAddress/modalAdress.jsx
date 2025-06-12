import { FaCross } from "react-icons/fa";
import styles from "./modalAdress.module.css";
import { IoMdClose } from "react-icons/io";

export const ModalAdress = ({
  setIsOpenAddress,
  formAdress,
  formPrincipal,
}) => {
  /*
Autopista
Avenida
Avenida calle
Avenida carrera
Calle
Carrera
Circular
Diagonal
Kilometro
Manzana
Transversal*/
  const inputs = [
    {
      placeholder: "Tipo de vía",
      name: "tipoVia",
      type: "select",
      options: [
        { label: "Autopista", value: "Autopista" },
        { label: "Avenida", value: "Avenida" },
        { label: "Avenida calle", value: "Avenida calle" },
        { label: "Avenida carrera", value: "Avenida carrera" },
        { label: "Calle", value: "Calle" },
        { label: "Carrera", value: "Carrera" },
        { label: "Circular", value: "Circular" },
        { label: "Diagonal", value: "Diagonal" },
        { label: "Kilometro", value: "Kilometro" },
        { label: "Manzana", value: "Manzana" },
        { label: "Transversal", value: "Transversal" },
      ]
    },
    {
      placeholder: "Número",
      name: "numeroVia",
      type: "number",
    },
    {
      placeholder: "Letra",
      name: "letraVia",
      type: "select",
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
        { label: "F", value: "F" },
        { label: "G", value: "G" },
        { label: "H", value: "H" },
        { label: "I", value: "I" },
        { label: "J", value: "J" },
        { label: "K", value: "K" },
        { label: "L", value: "L" },
        { label: "M", value: "M" },
        { label: "N", value: "N" },
        { label: "O", value: "O" },
        { label: "P", value: "P" },
        { label: "Q", value: "Q" },
        { label: "R", value: "R" },
        { label: "S", value: "S" },
        { label: "T", value: "T" },
        { label: "U", value: "U" },
        { label: "V", value: "V" },
        { label: "W", value: "W" },
        { label: "X", value: "X" },
        { label: "Y", value: "Y" },
        { label: "Z", value: "Z" },
      ]
    },
    {
      placeholder: "Cuadrante",
      name: "cuadrante",
      type: "select",
      options: [
        { label: "Bis", value: "Bis" },
        { label: "Este", value: "Este" },
        { label: "Norte", value: "Norte" },
        { label: "Occidente", value: "Occidente" },
        { label: "Oeste", value: "Oeste" },
        { label: "Oriente", value: "Oriente" },
        { label: "Sur", value: "Sur" },
      ]
    },
    {
      placeholder: "Número",
      name: "numero",
    },
    {
      placeholder: "Letra",
      name: "letra",
      type: "select",
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
        { label: "F", value: "F" },
        { label: "G", value: "G" },
        { label: "H", value: "H" },
        { label: "I", value: "I" },
        { label: "J", value: "J" },
        { label: "K", value: "K" },
        { label: "L", value: "L" },
        { label: "M", value: "M" },
        { label: "N", value: "N" },
        { label: "O", value: "O" },
        { label: "P", value: "P" },
        { label: "Q", value: "Q" },
        { label: "R", value: "R" },
        { label: "S", value: "S" },
        { label: "T", value: "T" },
        { label: "U", value: "U" },
        { label: "V", value: "V" },
        { label: "W", value: "W" },
        { label: "X", value: "X" },
        { label: "Y", value: "Y" },
        { label: "Z", value: "Z" },
      ]
    },
    {
      placeholder: "Cuadrante",
      name: "cuadrante2",
      type: "select",
      options: [
        { label: "Bis", value: "Bis" },
        { label: "Este", value: "Este" },
        { label: "Norte", value: "Norte" },
        { label: "Occidente", value: "Occidente" },
        { label: "Oeste", value: "Oeste" },
        { label: "Oriente", value: "Oriente" },
        { label: "Sur", value: "Sur" },
      ]
    },
    {
      placeholder: "Número",
      name: "numero2",
      type: "number",
    },
    {
      placeholder:
        "Información adicionar (Ej: Torre, apartamento, oficina, etc.)",
      name: "informacionAdicional",
      type: "text",
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    formAdress.setValue(name, value);
    const addressParts = inputs
      .map((input) => formAdress.getValues(input.name))
      .filter((part) => part);
    const fullAddress = addressParts.join(" ");
    formPrincipal.setValue("direccion", fullAddress);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Dirección</h2>
          <i
            className={styles.succesIcon}
            onClick={() => setIsOpenAddress(false)}
          >
            <IoMdClose />
          </i>
        </div>
        <div className={styles.modalBody}>
          {inputs.map((input, index) => (
            <div key={index} className={styles.inputContainer}>
              {input.type === "select" ? (
                <select
                  className={styles.input}
                  {...formAdress.register(input.name, {
                    onChange: handleChange,
                  })}
                >
                  <option value="" disabled>
                    {input.placeholder}
                  </option>
                  {input.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={input.type || "text"}
                  placeholder={input.placeholder}
                  className={styles.input}
                  {...formAdress.register(input.name, {
                    onChange: handleChange,
                  })}
                />
              )}
            </div>
          ))}
          <input
            type="text"
            placeholder="Dirección completa"
            disabled
            className={styles.input}
            {...formPrincipal.register("direccion", {})}
          />
        </div>
        <div className={styles.modalFooter}>
          <button
            className={styles.button}
            onClick={() => setIsOpenAddress(false)}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

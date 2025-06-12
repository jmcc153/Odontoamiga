import { useNavigate, useSearchParams } from "react-router-dom";
import { AddCodeudor } from "../../services/simulator.service";
import styles from "./formCodeudor.module.css";
import { useContext, useEffect, useState } from "react";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";
import { useForm } from "react-hook-form";
import { Form } from "../../components/form/form";
import { Modal } from "../../components/modal/modal";
import { FiAlertCircle } from "react-icons/fi";
import stylesModal from "../../components/modal/modal.module.css";
import { getCities } from "../../services/form.service";
import { LoadingContext } from "../../contexts/loadingContext";

export const FormCodeudor = () => {
  const form = useForm();
  const { setIsLoading } = useContext(LoadingContext);
  const { info } = useContext(InfoSimulationContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState([]);

  const idRequest = searchParams.get("idRequest");


    useEffect(() => {
      getCities()
        .then((res) => {
          const formattedCities = res
            .map((city) => ({
              label: city.name,
              value: city.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
          setCities(formattedCities);
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
        });
    }, []);

  const onSubmit = (data) => {


    const dataCodebtor = {
      id_client: "5",
      person_data: {
        id_request: idRequest,
        name: `${data.nombre} ${data.segundoNombre} ${data.primerApellido} ${data.segundoApellido}`,
        email: data.correo,
        document_type: data.tipoDocumento,
        document_number: data.numeroDocumento,
        cellular: data.telefono,
        birthdate: data.fechaNacimiento,
        expedition_date: data.fechaExpedicion,
        address: data.direccion,
        city: data.ciudad,
        gender: data.barrio,
      },
    };
    setIsLoading(true);
    AddCodeudor(dataCodebtor)
      .then((res) => {
        navigate(
          `/modal?idRequest=${idRequest}&idSignature=${res?.id_signature}&status=${res?.status}&isCodeudor=true`
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.status === "max_joint_debtors") {
          setIsOpen(true);
          return;
        }
        else{
          navigate(
            `/modal?idRequest=${idRequest}&idSignature=${err.response.data?.id_signature}&status=${err.response.data?.status}&isCodeudor=true`
          );
        }
      }).finally(() => {
        setIsLoading(false);
      });
  };
  const inputs = [
    {
      name: "nombre",
      label: "Primer Nombre *",
      type: "text",
      required: true,
    },
    {
      name: "segundoNombre",
      label: "Segundo Nombre",
      type: "text",
      required: true,
    },
    {
      name: "primerApellido",
      label: "Primer Apellido *",
      type: "text",
      required: true,
    },
    {
      name: "segundoApellido",
      label: "Segundo Apellido *",
      type: "text",
      required: true,
    },
    {
      name: "telefono",
      label: "Celular *",
      type: "number",
      required: true,
    },
    {
      name: "correo",
      label: "Correo *",
      type: "text",
      required: true,
    },
    {
      name: "tipoDocumento",
      label: "Tipo de documento *",
      type: "select",
      required: true,
      options: [
        { label: "Cédula de ciudadanía", value: "CC" },
        { label: "Cédula de extranjería", value: "CE" },
        { label: "Pasaporte", value: "PA" },
        { label: "Tarjeta de identidad", value: "TI" },
        { label: "Registro civil", value: "RC" },
      ],
    },
    {
      name: "numeroDocumento",
      label: "Número de documento *",
      type: "text",
      required: true,
    },
    {
      name: "fechaExpedicion",
      label: "Fecha de expedición *",
      type: "date",
      required: true,
    },
    {
      name: "fechaNacimiento",
      label: "Fecha de nacimiento *",
      type: "date",
      required: true,
    },
    {
      name: "ciudad",
      label: "Ciudad *",
      type: "select",
      required: true,
      options: cities,
    },
    {
      name: "direccion",
      label: "Dirección *",
      type: "text",
      required: true,
    },
    {
      name: "barrio",
      label: "Genero *",
      type: "select",
      required: true,
      options: [
        { label: "Masculino", value: "M" },
        { label: "Femenino", value: "F" },
      ],
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>¡Bienvenid@!</h1>
        <h3>Ingresa la información de tu deudor solidario</h3>
        <Form inputs={inputs} form={form} onSubmit={onSubmit} />
      </div>
      {isOpen && (
        <Modal
          icon={<FiAlertCircle />}
          title={"Solicitud rechazada"}
          isSuccess={false}
        >
          <>
            <p>
              <strong>
                ¡Se alcanzó el máximo de intentos permitidos con deudores
                solidarios!
              </strong>
            </p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={() => setIsOpen(false)}
              >
                Finalizar
              </button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

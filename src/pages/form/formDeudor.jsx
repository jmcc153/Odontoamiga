import { useContext, useEffect, useState } from "react";
import styles from "./formDeudor.module.css";
import stylesModal from "../../components/modal/modal.module.css";
import { Modal } from "../../components/modal/modal";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";
import { useForm } from "react-hook-form";
import { AddprincipalDebtor } from "../../services/simulator.service";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/form/form";
import { getCities } from "../../services/form.service";
import { TiInfoOutline } from "react-icons/ti";

export const FormDeudor = () => {
  const form = useForm();
  const { info, setInfo } = useContext(InfoSimulationContext);
  const [isOpenModal, setIsOpenModal] = useState({
    noSignature: false,
    pendingSignature: false,
  });
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

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

  const handleCheckSignature = (data) => {
    if (data.signature) {
      onSubmit(data);
    } else {
      setIsOpenModal({
        noSignature: true,
        pendingSignature: false,
      });
    }
  };

  const onSubmit = (data) => {
    const getBirthYear = new Date(data.fechaNacimiento).getFullYear();
    if (new Date().getFullYear() - getBirthYear < 18) {
      form.setError("fechaNacimiento", {
        type: "manual",
        message: "Debes ser mayor de edad para continuar",
      });
    }

    sessionStorage.setItem("documento", data.numeroDocumento);
    sessionStorage.setItem("cellphone", data.telefono);

    const dataDebtor = {
      id_client: "5",
      person_data: {
        name: `${data.nombre?.toLowerCase()} ${data.segundoNombre?.toLowerCase()}`,
        last_name: `${data.primerApellido?.toLowerCase()} ${data.segundoApellido?.toLowerCase()}`,
        type_person: "N",
        email: data.correo?.toLowerCase(),
        document_type: data.tipoDocumento,
        document_number: data.numeroDocumento,
        cellular: data.telefono,
        birthdate: data.fechaNacimiento,
        expedition_date: data.fechaExpedicion,
        address: data.direccion,
        city: data.ciudad?.toLowerCase(),
        gender: data.genero,
        requested_amount: info?.amount,
      },
      simulation_info: info?.simulation_info,
    };
    AddprincipalDebtor(dataDebtor)
      .then((res) => {
        navigate(
          `/modal?idRequest=${res.id_request}&idSignature=${res.id_signature}&status=${res.status}&isCodeudor=false`
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.status == "pending_signature") {
          setIsOpenModal({
            noSignature: false,
            pendingSignature: true,
          });
        }
        else if (err.response?.data?.status == "remediable") {
          setInfo({
            ...info,
            remedial_amount: err.response.data?.remedial_amount,
          })
          navigate(
            `/modal?idRequest=${err.response.data?.id_request}&idSignature=${err.response.data?.id_signature}&status=${err.response.data?.status}&isCodeudor=false`
          );
        }
        else {
          navigate(
            `/modal?idRequest=${err.response.data?.id_request}&idSignature=${err.response.data?.id_signature}&status=${err.response.data?.status}&isCodeudor=false`
          );
        }
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
      name: "tipoDocumento",
      label: "Tipo de documento *",
      type: "select",
      required: true,
      options: [
        { label: "Cédula de ciudadanía", value: "CC" },
        { label: "Cédula de extranjería", value: "CE" },
        { label: "Pasaporte", value: "PA" },
        { label: "PTT", value: "PTT" },
      ],
    },
    {
      name: "numeroDocumento",
      label: "Número de documento *",
      type: "number",
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
      type: "email",
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
      options: cities,
      required: true,
    },
    {
      name: "direccion",
      label: "Dirección *",
      type: "text",
      required: true,
    },
    {
      name: "genero",
      label: "Genero *",
      type: "select",
      required: true,
      options: [
        { label: "Masculino", value: "M" },
        { label: "Femenino", value: "F" },
        { label: "Otro", value: "O" },
      ],
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>¡Bienvenid@!</h1>
        <h3>Ingresa la información para dar inicio a tu solicitud</h3>
        <Form inputs={inputs} form={form} onSubmit={handleCheckSignature} />
        {isOpenModal.noSignature && (
          <Modal
            icon={<TiInfoOutline />}
            title="¿Estás seguro de que no deseas firmar electrónicamente?"
            isSuccess="approved"
          >
            <>
              <p>
                En CrediXpress queremos hacer tu proceso más fácil, por eso te
                recordamos los beneficios de la firma electrónica:
              </p>
              <div className={styles.modalList}>
                <p>
                  <strong>1.</strong> Sin costos adicionales
                </p>
                <p>
                  <strong>2.</strong> Sin necesidad de desplazamientos
                </p>
                <p>
                  <strong>3.</strong> Proceso rápido y sencillo
                </p>
                <p>
                  <strong>4.</strong> Seguridad y validez legal
                </p>
              </div>
              <p>
                Pero tranquilo, la decisión es totalmente tuya. Nuestro objetivo
                es hacerte la vida más fácil, sin presiones
              </p>
              <div className={stylesModal.modalFooter}>
                <button
                  className={`${stylesModal.button} ${stylesModal.success}`}
                  onClick={() =>
                    setIsOpenModal({
                      noSignature: false,
                      pendingSignature: false,
                    })
                  }
                >
                  Regresar
                </button>
                <button
                  className={`${stylesModal.button} ${stylesModal.cancel}`}
                  onClick={() => {
                    //onSubmit(form.getValues());
                    navigate("/infoNoSignature");
                  }}
                >
                  Continuar
                </button>
              </div>
            </>
          </Modal>
        )}
        {isOpenModal.pendingSignature && (
          <Modal
            icon={<TiInfoOutline />}
            title="Solicitud pendiente de firma"
            isSuccess="rejected"
          >
            <>
              <p>
                Estimado usuario, el documento ingresado ya tiene una solicitud
                activa asociada. Te recomendamos verificar el estado con la
                institución.
              </p>
              <div className={stylesModal.modalFooter}>
                <button
                  className={`${stylesModal.button} ${stylesModal.success}`}
                  onClick={() =>
                    setIsOpenModal({
                      noSignature: false,
                      pendingSignature: false,
                    })
                  }
                >
                  Aceptar
                </button>
              </div>
            </>
          </Modal>
        )}
      </div>
    </>
  );
};

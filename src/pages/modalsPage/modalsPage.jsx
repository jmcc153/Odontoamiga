import { FaRegCheckCircle } from "react-icons/fa";
import { Modal } from "../../components/modal/modal";
import stylesModal from "../../components/modal/modal.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";
import { FiAlertCircle } from "react-icons/fi";
import {
  approveRemediable,
  rejectRemediable,
  validationFaceId,
  validationOtp,
  validationSignature,
  validationSignatureOTP,
} from "../../services/form.service";
import { LoadingContext } from "../../contexts/loadingContext";

export const ModalsPage = () => {
  const [searchParams] = useSearchParams();
  const { info } = useContext(InfoSimulationContext);
  const { setIsLoading } = useContext(LoadingContext);

  const idRequest = searchParams.get("idRequest");
  const status = searchParams.get("status");
  const isCodeudor = searchParams.get("isCodeudor");
  const processId = searchParams.get("process_id");

  const documento = sessionStorage.getItem("documento");
  const cellphone = sessionStorage.getItem("cellphone");

  const validation = searchParams.get("validation");

  const [isSuccess, setIsSuccess] = useState(null);
  const [isSignatureSuccess, setIsSignatureSuccess] = useState(null);
  const [redirect_url, setRedirectUrl] = useState(null);
  const navigate = useNavigate();

  const handleSignatureProcess = () => {
    setIsLoading(true);
    if (validation == "fid") {
      validationFaceId({
        document_number: documento || "",
        cellphone_number: cellphone || "",
        id_request: idRequest,
        id_client: "5",
        redirect_url: `https://odontoamiga.vercel.app/modal?validation=${validation}`,
      })
        .then((res) => {
          if (res?.token_url) {
            //replace the current URL with the token_url
            window.location.replace(res.token_url);
          }
        })
        .catch((err) => {
          console.error("Error in validationFaceId:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (validation == "otp")
      validationOtp({
        document_number: documento || "",
        cellphone_number: cellphone || "",
        id_request: idRequest,
        id_client: "5",
        redirect_url: `https://odontoamiga.vercel.app/modal?validation=${validation}`,
      })
        .then((res) => {
          if (res?.token_url) {
            //replace the current URL with the token_url
            window.location.replace(res.token_url);
          }
        })
        .catch((err) => {
          console.error("Error in validationOtp:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  const handleAproveRemediable = () => {
    setIsLoading(true);
    approveRemediable({
      id_request: idRequest,
      document_number: documento,
    })
      .then((res) => {
        navigate(
          `/modal?idRequest=${idRequest}&idSignature=${res?.id_signature}&status=${res?.status}&isCodeudor=${isCodeudor}&validation=${validation}`
        );
      })
      .catch((err) => {
        console.error("Error in approveRemediable:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRejectRemediable = () => {
    setIsLoading(true);
    rejectRemediable({
      id_request: idRequest,
    })
      .then((res) => {
        navigate(`/?validation=${validation}`);
      })
      .catch((err) => {
        console.error("Error in rejectRemediable:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (processId && validation == "fid") {
      setIsLoading(true);
      validationSignature(processId)
        .then((res) => {
          console.log("Signature validation response:", res);
          setIsSignatureSuccess("approve");
        })
        .catch((err) => {
          setIsSuccess(err?.response.data.status || "rejected");
          setRedirectUrl(err?.response.data.redirect_url);
          console.error("Error in validationSignature:", err);
          setIsSignatureSuccess(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (processId && validation == "otp") {
      setIsLoading(true);
      validationSignatureOTP(processId)
        .then((res) => {
          console.log("OTP validation response:", res);
          setIsSignatureSuccess("approve");
        })
        .catch((err) => {
          setIsSuccess(err?.response.data.status || "rejected");
          setRedirectUrl(err?.response.data.redirect_url);
          console.error("Error in validationSignature:", err);
          setIsSignatureSuccess(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [processId]);

  useEffect(() => {
    setIsSuccess(status);
  }, [status]);

  return (
    <>
      {!processId ? (
        <Modal
          icon={status == "approved" ? <FaRegCheckCircle /> : <FiAlertCircle />}
          title={
            isSuccess == "approved"
              ? "Solicitud preaprobada"
              : "Solicitud rechazada"
          }
          isSuccess={isSuccess}
        >
          {isSuccess == "approved" && (
            <>
              <p>
                <strong>¡Estás a un paso de obtener tu crédito!</strong>
              </p>
              <p>
                Ahora procederemos con la validación de tu identidad. <br />
                Para Completar este proceso, asegúrate de contar con lo
                siguiente:
              </p>
              <p>
                Tu documento de identidad físico <br />
                Acceso a la cámara frontal de tu dispositivo móvil <br />
                Conexión estable a internet
              </p>
              <p>
                Una vez validemos tu identidad, podrás firmar los documentos de
                forma digital y habrás finalizado el proceso. <br /> ¡Así de
                fácil!
              </p>
              <div className={stylesModal.modalFooter}>
                <button
                  className={`${stylesModal.button} ${stylesModal.success}`}
                  onClick={handleSignatureProcess}
                >
                  Continuar
                </button>
              </div>
            </>
          )}
          {isSuccess == "remediable" && isCodeudor == "false" && (
            <>
              <p>
                <strong>
                  Tu solicitud no ha sido aprobada por el monto solicitado.
                </strong>
              </p>
              <p>
                <strong>
                  ¡Pero no es el final! podemos ofrecerte un crédito por{" "}
                  {info?.remedial_amount} <br />
                </strong>
              </p>
              <p>
                <strong>¿Quieres avanzar con esta nueva propuesta?</strong>
              </p>
              <div className={stylesModal.modalFooter}>
                <button
                  className={`${stylesModal.button} ${stylesModal.success}`}
                  onClick={handleAproveRemediable}
                >
                  Aceptar
                </button>
                <button
                  className={`${stylesModal.button} ${stylesModal.failure}`}
                  onClick={handleRejectRemediable}
                >
                  Rechazar
                </button>
              </div>
            </>
          )}
          {isSuccess == "rejected" && isCodeudor == "false" && (
            <>
              <p>
                <strong>Solicitud no aprobada</strong>
              </p>
              <p>
                <strong>¡Pero aún hay opciones para ti!</strong>
              </p>
              <p>
                <strong>
                  Aunque no fue posible aprobar el valor total solicitado,
                  podemos ofrecerte un crédito por {info?.amount}
                </strong>
              </p>
              <p>
                <strong>
                  Si deseas continuar con este nuevo valor, estamos listos para
                  seguir el proceso
                </strong>
              </p>
              <p>
                <strong>
                  ¿Prefieres mantener el monto inicial? <br />
                  Puedes hacerlo agregando un codeudor para continuar con el
                  estudio.
                </strong>
              </p>
              <p>
                <strong>
                  Indícanos cómo deseas proceder <br />
                  ¡Estamos aquí para ayudarte!
                </strong>
              </p>
              <div className={stylesModal.modalFooter}>
                <button
                  className={`${stylesModal.button} ${stylesModal.success}`}
                  onClick={() => navigate("/")}
                >
                  Simular nuevo monto
                </button>
                <button
                  className={`${stylesModal.button} ${stylesModal.failure}`}
                  onClick={() =>
                    navigate(
                      `/formularioCodeudor?idRequest=${idRequest}&validation=${validation}`
                    )
                  }
                >
                  Agregar codeudor
                </button>
              </div>
            </>
          )}
          {isSuccess == "rejected" && isCodeudor == "true" && (
            <>
              <p>
                <strong>Tu codeudor no cumple con los requisitos</strong>
              </p>
              <p>
                <strong>
                  Hemos evaluado la información de tu codeudor y,
                  lamentablemente, no cumple con los requisitos para respaldar
                  tu solicitud de crédito.
                </strong>
              </p>
              <p>
                <strong>
                  Puedes intentar nuevamente agregando un nuevo codeudor o
                  continuar con el monto preaprobado disponible para ti.
                </strong>
              </p>
              <div className={stylesModal.modalFooter}>
                <button
                  className={`${stylesModal.button} ${stylesModal.success}`}
                  onClick={() =>
                    navigate(
                      `/formularioCodeudor/?idRequest=${idRequest}&validation=${validation}`
                    )
                  }
                >
                  Ingresar nuevo codeudor
                </button>
              </div>
            </>
          )}
          {isSuccess == "max_joint_debtors" && (
            <>
              <p>
                <strong>
                  Has alcanzado el máximo de codeudores permitidos para tu
                  solicitud.
                </strong>
              </p>
              <div className={stylesModal.modalFooter}>
                <button
                  className={`${stylesModal.button} ${stylesModal.success}`}
                  onClick={() => navigate(`/`)}
                >
                  Finalizar
                </button>
              </div>
            </>
          )}
        </Modal>
      ) : isSignatureSuccess == "approve" ? (
        <Modal
          icon={<FaRegCheckCircle />}
          title="Validación de firma"
          isSuccess="approved"
        >
          <>
            <p>
              <strong>¡Tu firma ha sido validada exitosamente!</strong>
            </p>
            <p>Documento firmado y procesado correctamente</p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={() => navigate("/")}
              >
                Finalizar
              </button>
            </div>
          </>
        </Modal>
      ) : isSignatureSuccess == "rejected" ? (
        <Modal
          icon={<FiAlertCircle />}
          title="Validación de firma"
          isSuccess="rejected"
        >
          <>
            <p>
              <strong>¡Error al validar la firma!</strong>
            </p>
            <p>
              No se pudo completar el proceso de firma. Por favor, intenta
              nuevamente más tarde o contacta al soporte.
            </p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={() => navigate("/")}
              >
                Finalizar
              </button>
            </div>
          </>
        </Modal>
      ) : isSignatureSuccess == "restart_validation" ? (
        <Modal
          icon={<FiAlertCircle />}
          title="Reintentar firma"
          isSuccess="rejected"
        >
          <>
            <p>
              <strong>¡Error al validar la firma!</strong>
            </p>
            <p>
              El proceso de firma no se completó correctamente. Por favor,
              intenta nuevamente.
            </p>
            <div className={stylesModal.modalFooter}>
              <button
                className={`${stylesModal.button} ${stylesModal.success}`}
                onClick={() => {
                  window.location.replace(redirect_url || "/");
                }}
              >
                Reintentar
              </button>
            </div>
          </>
        </Modal>
      ) : isSignatureSuccess === null ? (
        <Modal
          icon={<FiAlertCircle />}
          title="Validación de firma"
          isSuccess="approved"
        >
          <>
            <p>
              <strong>Estamos validando tu firma...</strong>
            </p>
            <p>
              Por favor, espera mientras completamos el proceso de validación.
            </p>
          </>
        </Modal>
      ) : null}
    </>
  );
};

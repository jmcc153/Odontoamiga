import { useNavigate } from "react-router-dom";
import styles from "./simulator.module.css";
import { useForm } from "react-hook-form";
import { dateSimulator, functionToMoney, moneyToFunction } from "../../utils";
import { useContext, useEffect, useState } from "react";
import { getFinantialData } from "../../services/simulator.service";
import { InfoSimulationContext } from "../../contexts/infoSimulationContext";

export const Simulator = () => {
  const [resultSimulator, setResultSimulator] = useState({
    resultQuotaValue: "",
    resultDateStart: "",
    resultDateEnd: "",
    resultTasaEA: "",
    resultTasaMNV: "",
  });
  const [finantialData, setFinantialData] = useState([{}]);
  const [valueTable, setValueTable] = useState([]);
  const [isViewTable, setIsViewTable] = useState(false);
  const { setInfo } = useContext(InfoSimulationContext);
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  useEffect(() => {
    getFinantialData().then((response) => {
      setFinantialData(response);
    });
  }, []);

  const onSubmit = (data) => {
    let secureValue = 0;
    data.valueFinance = moneyToFunction(data.valueFinance);
    if (data.valueFinance < 1000000) {
      setError("valueFinance", {
        type: "manual",
        message: "El valor a financiar debe ser mayor a $1.000.000",
      });
      setResultSimulator({
        resultQuotaValue: "",
        resultDateStart: "",
        resultDateEnd: "",
        resultTasaEA: "",
        resultTasaMNV: "",
      });
      setIsViewTable(false);
      return;
    }
    if (data.valueFinance > 100000000) {
      setError("valueFinance", {
        type: "manual",
        message: "El valor a financiar debe ser menor a $100.000.000",
      });
      setResultSimulator({
        resultQuotaValue: "",
        resultDateStart: "",
        resultDateEnd: "",
        resultTasaEA: "",
        resultTasaMNV: "",
        resultDailyTasa: "",
      });
      setIsViewTable(false);
      return;
    }
    const newSimulator = {
      ...resultSimulator,
      resultQuotaValue: data.quotaValue,
      resultDateStart: dateSimulator(new Date(), data.dayPay),
      resultDateEnd: dateSimulator(
        new Date(),
        data.dayPay,
        data.quotaValue,
        true
      ),
    };
    const fechaActual = new Date();
    const fechaPrimerPago = dateSimulator(fechaActual, data.dayPay);
    const diasPrimerPago = Math.ceil((new Date(fechaPrimerPago).getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24));

    if (data?.quotaValue >= 1 && data?.quotaValue <= 12) {
      newSimulator.resultTasaEA = finantialData[0]?.cp_ea;
      newSimulator.resultTasaMNV = finantialData[0]?.cp_nmv;
      newSimulator.resultDailyTasa = finantialData[0]?.cp_diaria;
    } else if (data.quotaValue >= 13 && data.quotaValue <= 36) {
      newSimulator.resultTasaEA = finantialData[0]?.mp_ea;
      newSimulator.resultTasaMNV = finantialData[0]?.mp_nmv;
      newSimulator.resultDailyTasa = finantialData[0]?.mp_diaria;
    } else if (data.quotaValue >= 37 && data.quotaValue <= 60) {
      newSimulator.resultTasaEA = finantialData[0]?.lp_ea;
      newSimulator.resultTasaMNV = finantialData[0]?.lp_nmv;
      newSimulator.resultDailyTasa = finantialData[0]?.lp_diaria;
    }

    if (data.valueFinance >= 1000000 && data.valueFinance <= 5000000) {
      secureValue = 8000;
    } else if (data.valueFinance > 5000000 && data.valueFinance <= 10000000) {
      secureValue = 15000;
    } else if (data.valueFinance > 10000000 && data.valueFinance <= 15000000) {
      secureValue = 18000;
    } else if (data.valueFinance > 15000000 && data.valueFinance <= 25000000) {
      secureValue = 20000;
    } else if (data.valueFinance > 25000000 && data.valueFinance <= 30000000) {
      secureValue = 23000;
    } else if (data.valueFinance > 30000000 && data.valueFinance <= 50000000) {
      secureValue = 30000;
    } else if (data.valueFinance > 50000000 && data.valueFinance <= 75000000) {
      secureValue = 40000;
    } else if (data.valueFinance > 75000000 && data.valueFinance <= 100000000) {
      secureValue = 50000;
    }

    setResultSimulator(newSimulator);

    const tasaMensual = newSimulator.resultTasaMNV / 100;
    const n = data.quotaValue;
    const P = data.valueFinance;
    
    const cuota = (P * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));
    
    let saldo = P;
    const tasaDiaria = newSimulator.resultDailyTasa / 100;

    const interesExtra = diasPrimerPago > 0 ? saldo * tasaDiaria * diasPrimerPago : 0;

    const cuotas = Array.from({ length: n }, (_, i) => {
      const interes = saldo * tasaMensual;
      const abonoCapital = cuota - interes;
      const fecha = dateSimulator(new Date(), data.dayPay, i, true);
      const cuotaTotal = cuota + secureValue;

      const interesTotal = i == 0 ? interes + interesExtra : interes;
      const abonoTotalCapital = i == 0 ? abonoCapital + interesExtra : abonoCapital;
      const cuotaTotalConInteres = i == 0 ? cuotaTotal + interesExtra : cuotaTotal;

      const cuotaObj = {
        quote_number: (i + 1).toString(),
        quote_date: fecha,
        quote_amount: functionToMoney(cuotaTotalConInteres),
        capital: functionToMoney(abonoTotalCapital),
        secureValue: functionToMoney(secureValue),
        interest: functionToMoney(interesTotal),
        balance: functionToMoney(saldo - abonoCapital),
      };

      saldo -= abonoCapital;
      return cuotaObj;
    });

    const cuotasList = cuotas.map((item) => {
      return {
        quote_number: Number(item.quote_number),
        quote_date: item.quote_date,
        quote_amount: moneyToFunction(item.quote_amount).toString(),
        capital: moneyToFunction(item.capital).toString(),
        interest: moneyToFunction(item.interest).toString(),
        balance: moneyToFunction(item.balance).toString(),
      };
    });

    setInfo({
      amount: data.valueFinance.toString(),
      simulation_info: {
        AER: newSimulator.resultTasaEA,
        EMNR: newSimulator.resultTasaMNV,
        total_quotes: data.quotaValue,
        insurance_value: secureValue.toString(),
        start_date: newSimulator.resultDateStart,
        end_date: newSimulator.resultDateEnd,
        quotes_simulation: cuotasList,
      },
    });

    setValueTable(cuotas);
    setIsViewTable(true);
  };

  const inputs = [
    {
      name: "valueFinance",
      label: "Valor a financiar *",
      type: "text",
    },
    {
      name: "quotaValue",
      label: "Número de cuotas *",
      type: "select",
      options: Array.from({ length: 60 }, (_, i) => (i + 1).toString()),
    },
    {
      name: "dayPay",
      label: "Selecciona día de pago *",
      type: "select",
      options: ["5", "10", "15", "20", "25", "30"],
    },
  ];

  const results = [
    {
      label: "Número de cuotas",
      value: resultSimulator.resultQuotaValue,
    },
    {
      label: "Fecha inicio",
      value: resultSimulator.resultDateStart,
    },
    {
      label: "Fecha fin",
      value: resultSimulator.resultDateEnd,
    },
    {
      label: "Tasa EA",
      value: resultSimulator.resultTasaEA,
    },
    {
      label: "Tasa MNV",
      value: resultSimulator.resultTasaMNV,
    },
  ];

  const headerTable = [
    {
      label: "No.Cuota",
    },
    {
      label: "Fecha",
    },
    {
      label: "Monto Cuota",
    },
    {
      label: "Capital",
    },
    {
      label: "Valor de Seguro",
    },
    {
      label: "Interés",
    },
    {
      label: "Saldo",
    },
  ];

  const handleRequestCredit = () => {
    navigate("/formulario");
  };

  const handlePrint = () => {
    print();
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1 className={styles.title}>Simulador</h1>
        <h4>
          Simulá tu crédito con <strong>OdontoAmiga</strong>
        </h4>
        <h4>Ingresa la información para dar inicio.</h4>
      </div>
      <form
        className={styles.inputsContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs.map((input, index) => (
          <div key={index} className={styles.inputContainer}>
            <label className={styles.label}>{input.label}</label>
            {input.type === "text" ? (
              <input
                className={styles.input}
                {...register(input.name, {
                  required: true,
                  onChange: (e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    const formattedValue = functionToMoney(value);
                    e.target.value = formattedValue;
                  },
                })}
              />
            ) : input.type == "date" ? (
              <input
                type="date"
                className={styles.input}
                {...register(input.name, {
                  required: true,
                })}
              />
            ) : input.type == "select" ? (
              <select
                className={styles.select}
                {...register(input.name, {
                  required: true,
                })}
              >
                <option value="">Seleccionar</option>
                {input.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
            <span
              className={
                errors[input.name] == undefined
                  ? styles.errorMessage
                  : `${styles.errorMessage} ${styles.show}`
              }
            >
              {errors[input.name]?.message || "Este campo es requerido"}
            </span>
          </div>
        ))}
        <button type="submit" className={styles.button}>
          Simular
        </button>
      </form>
      {isViewTable && (
        <div className={styles.resultContainer}>
          <div className={styles.inputsResults}>
            {results.map((result, index) => (
              <div key={index} className={styles.resultItem}>
                <span className={styles.resultLabel}>{result.label}</span>
                <input
                  type="text"
                  className={styles.resultInput}
                  value={result.value}
                  readOnly
                />
              </div>
            ))}
          </div>
          <hr />
          <div className={styles.tableResult}>
            <div className={styles.headerTitle}>
              <div className={styles.headerTitleItem}></div>
              <div className={styles.headerTitleItem}>
                <h2>Plan de pago</h2>
              </div>
              <div className={styles.containerButton}>
                <button onClick={handlePrint} className={styles.button}>
                  Imprimir
                </button>
              </div>
            </div>
            <div className={styles.tableHeader}>
              {headerTable.map((item, index) => (
                <div key={index} className={styles.tableHeaderItem}>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            {valueTable.map((item, index) => (
              <div key={index} className={styles.tableBody}>
                {Object.values(item).map((value, index) => (
                  <div key={index} className={styles.tableBodyItem}>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.containerButton}>
            <button onClick={handleRequestCredit} className={styles.button}>
              Solicitar crédito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

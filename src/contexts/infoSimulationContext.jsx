import { createContext, useState } from 'react';

export const InfoSimulationContext = createContext();

export const InfoSimulationProvider = ({ children }) => {
  const [info, setInfo] = useState(null);

  return (
	<InfoSimulationContext.Provider value={{ info, setInfo }}>
	  {children}
	</InfoSimulationContext.Provider>
  );
};


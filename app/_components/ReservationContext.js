"use client"
const { createContext, useState, useContext } = require("react");

const ReservationContext = createContext();

function ReservationProvider({children}) {
    const initialState = {from: undefined, to: undefined};
    const [range, setRange] = useState(initialState);
    const resetRange = () => setRange(initialState)

    return (<ReservationContext.Provider value={{range, setRange, resetRange}}>
        {children}
    </ReservationContext.Provider>)
}

function useReservation(){
    const context = useContext(ReservationContext);
    if (context === undefined) {
        throw new Error("Context is used outside of the boundaries of the provider!")
    }
    return context;
}

export {ReservationProvider, useReservation}
import { createContext } from 'react';
export const FilterContext = createContext({
    filter: "TRACK_ASC",
    setFilter: () => { },
})
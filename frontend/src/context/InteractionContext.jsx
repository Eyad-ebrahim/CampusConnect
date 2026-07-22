import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const InteractionContext = createContext();

export function InteractionProvider({ children }) {

    const [interactions, setInteractions] = useState(() => {

        const saved = localStorage.getItem("interactions");

        return saved
            ? JSON.parse(saved)
            : [];

    });

    useEffect(() => {

        localStorage.setItem(
            "interactions",
            JSON.stringify(interactions)
        );

    }, [interactions]);

    function addInteraction(interaction) {

        setInteractions(prev => [

            ...prev,

            {
                id: Date.now(),

                timestamp: Date.now(),

                ...interaction,
            },

        ]);

    }

    return (

        <InteractionContext.Provider
            value={{
                interactions,
                addInteraction,
            }}
        >

            {children}

        </InteractionContext.Provider>

    );

}

export function useInteractions() {

    return useContext(InteractionContext);

}
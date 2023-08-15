import { Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import { useContext, useEffect, useState } from "react";
import { getAllLocalStorage } from "../services/storage";

const ContaInfo = () => { 
    const [user, setUser] = useState<any>()
    const {isLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {

        if(!isLoggedIn) {
            navigate('/')
        }

        const item = getAllLocalStorage()
        if(item) {
            const obj = JSON.parse(item);
            setUser(obj.user);
        }

    }, [])
    
    return (
        <>
            <Text fontSize='3xl' fontWeight='bold'>
                Informações da conta
            </Text>
            <Text fontSize="2xl">
                {user?.name}
            </Text>
            <Text fontSize="2xl">
                {user?.email}
            </Text>
        </>
    )
}

export default ContaInfo

import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage, getAllLocalStorage } from "../services/storage";

const Home = () => {
    const [ email, setEmail ] = useState<string>('')
    const [senha, setSenha ] = useState<string>('')
    const { setIsLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    const validateUser = async (email: string, senha: string) => {
        const loggedIn = await login(email, senha)

        if(!loggedIn.status){
            return alert('Email inválido ou Senha inválida')
        }

        setIsLoggedIn(true)
        changeLocalStorage({ login: true, user: loggedIn.data })
        navigate('/conta/1')
    }

    useEffect(() => {
        const item = getAllLocalStorage()
        if(item) {
            const obj = JSON.parse(item);
            obj.login && navigate("/conta/1")
        }
        
    }, [])
  
    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input type="password" placeholder="password" value={senha} onChange={(e) => setSenha(e.target.value) }/>
                <Center>
                    <DButton
                        onClick={() => validateUser(email, senha)}
                    />
                </Center>
            </Card>
        </Box>
    );
}

export default Home;

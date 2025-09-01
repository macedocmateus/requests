import React from "react"
import useUser from "../hooks/use-user"
import type { User } from "../models/user"

export default function UserNewForm() {
    const formRef = React.useRef<HTMLFormElement>(null)
    const {createUser, userRequestStatus} = useUser()
    
    async function handleSubmit(e: React.FormEvent) {
        if (!formRef.current) {
            return
        }

        e.preventDefault()

        const data = new FormData(formRef.current)

        const payload = {
            id: data.get('id'),
            name: data.get('name')
        }

        await createUser(payload as User)
    }
    
    return (
    
        <form ref={formRef} onSubmit={handleSubmit}>
            <div>
                <input type="username" name="id" required placeholder="Username" />
            </div>
        
            <div>
                <input type="name" name="name" required placeholder="Name" />
            </div>

            <div>
                <button type="submit">
                    {userRequestStatus === 'saving' ? 'Criando...' : 'Criar usuário'}
                </button>
            </div>
        </form>
    )
}

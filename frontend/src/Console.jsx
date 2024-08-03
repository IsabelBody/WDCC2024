import { useState } from 'react';

const Console = ({ cb }) => {
    const [input, setInput] = useState("")

    const command = (input) => {
        const args = input.split(" ")
        switch (args[0]) {
            case "info":
                console.log(args[1])
                cb("/info/" + args[1])
                break
            default:
                console.log("Unknown command")
        }
    }

    return (
        <div className="console">
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => command(input)}>Log</button>
        </div>
    )
}

export default Console;
import { useState } from 'react';

const Console = ({ cb, path, travel, exclude }) => {
    const [input, setInput] = useState("")

    const command = (input) => {
        const args = input.split(" ")
        switch (args[0]) {
            case "info":
                console.log(args[1])
                cb(`/info/${args[1]}`)
                break
            case "map":
                console.log(args[1])
                cb("/")
                break
            case "path":
                console.log(args[1])
                path(args[1])
                break
            case "travel":
                travel()
                break
            case "exclude":
                console.log(args[1])
                exclude(args[1])
                break
            default:
                console.log("Unknown command")
        }
    }

    return (
        <div className="console">
            <div className='inputWrapper'>
                <span>{">"}</span>
                <input value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
            <button type="button" onClick={() => command(input)}>Enter</button>
        </div>
    )
}

export default Console;
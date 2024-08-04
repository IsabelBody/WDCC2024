import { useState } from 'react';

const Console = ({ cb, path, travel, exclude, include, search }) => {
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
                cb("/map")
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
            case "include":
                console.log(args[1])
                include(args[1])
                break
            case "start":
                console.log("Going back to start")
                cb("/") // Navigates back to the start page
                break
            case "search":
                console.log("Searching for", args.slice(1))
                search(args.slice(1))
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

import React, { useEffect } from 'react'



const Test = () => {
    useEffect(() => {
        console.log("we are in TEST.jsx");
    }, [])
    return (
        <div>
            Test
        </div>
    )
}

export default Test

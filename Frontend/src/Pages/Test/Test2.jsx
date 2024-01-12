import React, { useEffect } from 'react'


const Test2 = () => {
    useEffect(() => {
        console.log("we are in TEST2.jsx");
    }, [])
    return (
        <div>
            Test2
        </div>
    )
}

export default Test2

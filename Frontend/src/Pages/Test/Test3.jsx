import React, { useEffect } from 'react'


const Test3 = () => {
    useEffect(() => {
        console.log("we are in TEST3.jsx");
    }, [])

    return (
        <div>
            Test3
        </div>
    )
}

export default Test3

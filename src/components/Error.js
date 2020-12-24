import React from 'react';
import { StatusCode } from "react-http-status-code";

const Error = () => {
    return (
        <StatusCode code={404}>
        <div>
            <h1>404 not found</h1>
        </div>
        </StatusCode>
    )
}

export default Error;
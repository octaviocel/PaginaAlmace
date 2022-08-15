import React from "react";
import { Box } from "@mui/system";
export default function InicioAmigable() {

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Box

                component="img"
                sx={{
                    height: '40%',
                    width: '80%'
                }}
                alt="Se el mejor en el trabajo."
                src="haveniceday.png"
            />
        </div>
    )
}
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { typography } from '@mui/system';

export function Loading () {
    return(
        <Box sx={{ 
            display: 'flex', 
            width: '100vw', 
            height: 'calc(100vh - 64px)', 
            justifyContent: 'center', 
            alignItems:'center', 
            flexDirection:'column'}}>
            <CircularProgress />
            <typography>
                Cargando...
            </typography>
        </Box>
    ) 
}
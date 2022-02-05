export function FormValidator (campos = []) {
    return new Promise((resolve) => {
    let errores = [];

    campos.map(({ value, name, err }) => {
        
        if (err.empty && value.replace(/\s+/g, '') === "") errores.push({ llave: name, 'mensaje': `Este campo es obligatorio` });
    });
    
    resolve(errores);
    });
}
/* 
   Esta es una clase base abstracta para definir errores personalizados en la aplicación.  
   - Extiende de `Error`, permitiendo el uso de `message` y el manejo de excepciones en Express.  
   - Cada error que herede de esta clase debe definir `statusCode` (código HTTP) y  
     sobrescribir el método `serialize()` para estructurar la respuesta del error.  
*/

export abstract class CustomError extends Error {
    constructor(public message: string) {
        super(message);
    }

    public abstract statusCode: number;
    public abstract serialize(): { message: string };
}

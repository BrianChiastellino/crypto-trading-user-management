import app from "./app";
import { AppDataSource } from "./database/database";


async function main () {
    try {
        const PORT = process.env.APP_PORT ?? 8080;

        await AppDataSource.initialize();

        console.log(`Database connected sucessful`);

        app.listen( PORT, () => {
            console.log(`App is running on port ${ PORT }`);
        })

    } catch ( error ) {
        if ( error instanceof Error )
            console.error( error.message );            
    };
}

main();

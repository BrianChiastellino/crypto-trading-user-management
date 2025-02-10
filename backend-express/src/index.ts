import app from "./app";

import { AppDataSource } from "./database/database";


async function main () {
    try {
        const { APP_PORT : port } = process.env ?? 8080;

        await AppDataSource.initialize();

        console.log(`Database connected sucessful`);

        app.listen( port, () => {
            console.log(`App is running on port ${ port }`);
        })

    } catch ( error ) {
        if ( error instanceof Error )
            console.error( error.message );            
    };
}

main();

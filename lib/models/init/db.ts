import sequelize from './sequelize';

export async function dbInit() {
    try {
        await sequelize.sync({ alter: true });
    } catch (error: any) {
        console.log('DB Connection Error: ' + error.message);
    }
}
export async function healthCheck(dbPool) {
    const client = await dbPool.connect();
    try {
        await client.query('SELECT 1 as healtcheck');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
    finally {
        client.release()
    }
}
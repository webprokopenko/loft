const getData = async url =>{
    try {
        const body = 'test body';
        await console.log(body);
        console.log('after body');
        await console.log(url);
    } catch (error) {
        console.log(error);
    }
}
getData('test url');
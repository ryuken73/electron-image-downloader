const number = {
    group1000(number){
        return new Intl.NumberFormat().format(number)
    },
    toByteUnit({number, unit='KB', point=0}){
        if(unit === 'KB') return (number/1024).toFixed(point);
        if(unit === 'MB') return (toByteUnit({number, unit:'KB',point})/1024).toFixed(point);
        if(unit === 'GB') return (toByteUnit({number, unit:'MB',point})/1024).toFixed(point);
        if(unit === 'TB') return (toByteUnit({number, unit:'GB',point})/1024).toFixed(point);
        return number;
    }
}


module.exports = {
    number
}
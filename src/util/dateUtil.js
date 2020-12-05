//Converter datas para o formato padrão do Date()
dateConvert = (date) =>{ 
    var array = date.split("-")
    var data = new Date(array[2], array[1] - 1, array[0])
    return data
}

getDaysArray = (start, end) => {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

module.exports ={dateConvert, getDaysArray}
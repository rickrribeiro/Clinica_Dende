//Converter datas para o formato padrão do Date()
dateConvert = (date) =>{ 
    var array = date.split("-")
    var data = new Date(array[2], array[1] - 1, array[0])
    return data
}

module.exports ={dateConvert}
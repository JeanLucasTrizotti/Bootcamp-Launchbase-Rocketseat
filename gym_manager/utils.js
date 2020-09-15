//Exportando
module.exports = {
  // Calculandoa Idade do instructor
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    today.getDate();
    birthDate.getDate();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }
    return age;
  },
  date: function (timestamp) {
    const date = new Date(timestamp);

    // yyyy - Ano
    const year = date.getUTCFullYear();

    // mm - Mês
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    // dd - Dia
    const day = `0${date.getUTCDate()}`.slice(-2);

    // yyyy-mm-dd - Formato de data
    return `${year}-${month}-${day}`;
  },
};


// 숫자 통화 표시 단위 당 , 붙여줌
const handleNumberToPrice = (number) => { return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };


export { handleNumberToPrice };
